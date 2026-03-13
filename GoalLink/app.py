from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# IMPORTANT: In a real app, use a secure, random secret key securely stored in env vars
app.secret_key = 'super_secret_hackathon_key_123' 

# --- Database Connection Function ---
def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='goallink'
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e} ❌")
        return None

# Basic Matching Logic
def get_all_users_except_current(current_user_id):
    conn = create_db_connection()
    if conn is None: return []
    cursor = conn.cursor(dictionary=True)
    
    # Fetch all other users with their MBTI and interests
    query = """
    SELECT u.id, u.username, pr.mbti_type
    FROM Users u
    LEFT JOIN Personality_Results pr ON u.id = pr.user_id
    WHERE u.id != %s AND pr.mbti_type IS NOT NULL
    """
    cursor.execute(query, (current_user_id,))
    users = cursor.fetchall()
    
    for u in users:
        cursor.execute("SELECT interest_name FROM Interests WHERE user_id = %s", (u['id'],))
        u['interests'] = [row['interest_name'] for row in cursor.fetchall()]
        
    conn.close()
    return users

def calculate_compatibility(user1_mbti, user1_interests, user2_mbti, user2_interests):
    score = 50 # Base score

    # simplistic MBTI matching (can be expanded)
    # Give bonus if introverts match with extroverts of same type, or same type
    if user1_mbti == user2_mbti:
        score += 20
    elif user1_mbti[1:] == user2_mbti[1:]: # e.g. INTJ and ENTJ
        score += 30
        
    # Points for shared interests
    shared_interests = set(user1_interests).intersection(set(user2_interests))
    score += len(shared_interests) * 15 
    
    return min(score, 100), list(shared_interests)

# --- Application Routes ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/personalities')
def personalities():
    return render_template('personalities.html')

@app.route('/result/<mbti>')
def result(mbti):
    """Detailed page for a specific MBTI result, accessible from dashboard."""
    valid_types = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                   'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
    
    mbti = mbti.upper()
    if mbti not in valid_types:
        flash("Invalid personality type.", "error")
        return redirect(url_for('dashboard'))
        
    gender = 'male' # default
    if 'user_id' in session:
        conn = create_db_connection()
        if conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT gender FROM Users WHERE id = %s", (session['user_id'],))
            user = cursor.fetchone()
            if user and user.get('gender'):
                gender = user['gender'].lower()
            conn.close()
            
    return render_template('result.html', mbti=mbti, gender=gender)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        gender = request.form.get('gender', 'male')
        interests_raw = request.form.get('interests')
        
        hashed_password = generate_password_hash(password)
        
        conn = create_db_connection()
        if not conn:
            flash("Database connection error.", "error")
            return redirect(url_for('signup'))
            
        cursor = conn.cursor()
        
        try:
            # Insert User
            cursor.execute("INSERT INTO Users (username, email, password_hash, gender) VALUES (%s, %s, %s, %s)", 
                           (username, email, hashed_password, gender))
            user_id = cursor.lastrowid
            
            # Insert Interests
            if interests_raw:
                # Split by comma, trim whitespace, remove empties
                interests = [i.strip() for i in interests_raw.split(',') if i.strip()]
                for interest in interests:
                    cursor.execute("INSERT INTO Interests (user_id, interest_name) VALUES (%s, %s)", 
                                   (user_id, interest))
                    
            conn.commit()
            
            # Auto-login after signup
            session['user_id'] = user_id
            session['username'] = username
            
            # Redirect to test after signup to get MBTI profile
            return redirect(url_for('personality_test'))
            
        except mysql.connector.IntegrityError:
            conn.rollback()
            flash("Username or Email already exists.", "error")
        finally:
            conn.close()
            
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        conn = create_db_connection()
        if conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT id, username, password_hash FROM Users WHERE email = %s", (email,))
            user = cursor.fetchone()
            conn.close()
            
            if user and check_password_hash(user['password_hash'], password):
                session['user_id'] = user['id']
                session['username'] = user['username']
                return redirect(url_for('dashboard'))
            else:
                flash("Invalid email or password.", "error")
        else:
            flash("Database connection error.", "error")
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/test', methods=['GET', 'POST'])
def personality_test():
    if 'user_id' not in session:
        return redirect(url_for('login'))
        
    if request.method == 'POST':
        # Calculate MBTI based on 60 form answers
        scores = {'E': 0, 'I': 0, 'S': 0, 'N': 0, 'T': 0, 'F': 0, 'J': 0, 'P': 0}
        for i in range(1, 61):
            ans = request.form.get(f'question_{i}')
            if ans and '_' in ans:
                parts = ans.split('_')
                if len(parts) == 2:
                    dim, score = parts[0], int(parts[1])
                    if dim in scores:
                        scores[dim] += score
        
        calculated_mbti = ""
        calculated_mbti += "E" if scores['E'] > scores['I'] else ("I" if scores['I'] > scores['E'] else "I")
        calculated_mbti += "S" if scores['S'] > scores['N'] else ("N" if scores['N'] > scores['S'] else "N")
        calculated_mbti += "T" if scores['T'] > scores['F'] else ("F" if scores['F'] > scores['T'] else "T")
        calculated_mbti += "J" if scores['J'] > scores['P'] else ("P" if scores['P'] > scores['J'] else "J")
        
        conn = create_db_connection()
        if conn:
            cursor = conn.cursor()
            user_id = session['user_id']
            # Delete old result if retaking
            cursor.execute("DELETE FROM Personality_Results WHERE user_id = %s", (user_id,))
            
            cursor.execute("""
                INSERT INTO Personality_Results (user_id, mbti_type) 
                VALUES (%s, %s)
            """, (user_id, calculated_mbti))
            conn.commit()
            conn.close()
            
        return redirect(url_for('dashboard'))
        
    return render_template('test.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
        
    user_id = session['user_id']
    
    conn = create_db_connection()
    if not conn:
        return "Database Error"
        
    cursor = conn.cursor(dictionary=True)
    
    # 1. Fetch User Data
    cursor.execute("SELECT username FROM Users WHERE id = %s", (user_id,))
    user_row = cursor.fetchone()
    
    # 2. Fetch User Interests
    cursor.execute("SELECT interest_name FROM Interests WHERE user_id = %s", (user_id,))
    user_interests = [row['interest_name'] for row in cursor.fetchall()]
    
    # 3. Fetch MBTI Result
    cursor.execute("SELECT mbti_type FROM Personality_Results WHERE user_id = %s", (user_id,))
    mbti_row = cursor.fetchone()
    user_mbti = mbti_row['mbti_type'] if mbti_row else 'Pending'
    
    conn.close()
    
    user_data = {
        'username': user_row['username'] if user_row else 'Unknown',
        'mbti': user_mbti,
        'interests': user_interests
    }
    
    # 4. Calculate Matches if user has taken test
    matches = []
    if user_mbti != 'Pending':
        other_users = get_all_users_except_current(user_id)
        for other in other_users:
            score, shared = calculate_compatibility(
                user_mbti, user_interests, 
                other['mbti_type'], other['interests']
            )
            
            matches.append({
                'username': other['username'],
                'mbti': other['mbti_type'],
                'shared_interests': shared,
                'compatibility': score
            })
            
        # Sort by compatibility desc
        matches.sort(key=lambda x: x['compatibility'], reverse=True)
    
    return render_template('dashboard.html', user=user_data, matches=matches[:5]) # Top 5

if __name__ == '__main__':
    app.run(debug=True, port=5000)
