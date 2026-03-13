import mysql.connector

try:
    conn = mysql.connector.connect(host='localhost', user='root', password='', database='goallink')
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE Users ADD COLUMN gender VARCHAR(20) DEFAULT 'male'")
    conn.commit()
    print("Database altered successfully")
except mysql.connector.Error as err:
    if err.errno == 1060:
        print("Column 'gender' already exists.")
    else:
        print(f"Error: {err}")
finally:
    if 'conn' in locals() and conn.is_connected():
        conn.close()
