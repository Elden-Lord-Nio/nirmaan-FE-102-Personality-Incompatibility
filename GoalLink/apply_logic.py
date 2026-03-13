import re
import os

app_py_path = r"c:\Users\omkar pawar\Hackathon\GoalLink\app.py"
test_js_path = r"c:\Users\omkar pawar\Hackathon\GoalLink\static\js\test.js"

with open(app_py_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

target = """        # In a real app we'd calculate MBTI based on form answers.
        # For this hackathon MVP, we'll assign a random MBTI for demonstration
        # or capture it from a hidden field if implemented in JS.
        import random
        mbti_types = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                      'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
        calculated_mbti = random.choice(mbti_types)"""

replacement = """        # Calculate MBTI based on 60 form answers
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
        calculated_mbti += "J" if scores['J'] > scores['P'] else ("P" if scores['P'] > scores['J'] else "J")"""

app_content = app_content.replace(target, replacement)

with open(app_py_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

# Now generate 60 questions for test.js
# E/I (1-15), S/N (16-30), T/F (31-45), J/P (46-60)

questions = []

ei_templates = [
    ("How do you recharge after a long session?", "Surrounding myself with people", "E_2", "Chatting with a friend", "E_1", "Enjoying some quiet time", "I_1", "Being completely alone", "I_2"),
    ("In a group setting, you usually:", "Take the lead in the conversation", "E_2", "Join in comfortably", "E_1", "Listen and speak occasionally", "I_1", "Observe and let others talk", "I_2"),
    ("When meeting new people, you:", "Instantly feel energized", "E_2", "Are glad to make connections", "E_1", "Take time to warm up", "I_1", "Feel quite drained", "I_2"),
    ("Your ideal weekend involves:", "Going to a big party or event", "E_2", "Hanging out with a group of friends", "E_1", "Relaxing with one or two close friends", "I_1", "Staying home and enjoying solitude", "I_2"),
    ("When you have a problem to solve, you:", "Talk it out with anyone available", "E_2", "Discuss it with a few people", "E_1", "Think it through beforehand", "I_1", "Keep it to yourself entirely", "I_2")
]
# Expand E/I
for i in range(15):
    q = ei_templates[i % len(ei_templates)]
    questions.append({
        "id": i + 1,
        "text": f"Question {i + 1}: {q[0]}",
        "options": [
            {"value": q[2], "text": q[1]},
            {"value": q[4], "text": q[3]},
            {"value": q[6], "text": q[5]},
            {"value": q[8], "text": q[7]}
        ]
    })

sn_templates = [
    ("When learning something new, you prefer:", "Clear facts and practical examples", "S_2", "Step-by-step instructions", "S_1", "General ideas and theories", "N_1", "Exploring abstract concepts", "N_2"),
    ("You pay more attention to:", "What is present and actual", "S_2", "Specific details of a situation", "S_1", "The big picture", "N_1", "What could be possible", "N_2"),
    ("People often describe you as:", "Grounded and realistic", "S_2", "Practical and observant", "S_1", "Imaginative and creative", "N_1", "Visionary and unconventional", "N_2"),
    ("When reading a book, you focus on:", "The actual events happening", "S_2", "The details of the description", "S_1", "The underlying themes", "N_1", "The hidden meanings and symbolism", "N_2"),
    ("You trust:", "Your direct experience", "S_2", "Proven facts and figures", "S_1", "Your gut feelings", "N_1", "Your intuition and instincts", "N_2")
]
# Expand S/N
for i in range(15):
    q = sn_templates[i % len(sn_templates)]
    idx = 15 + i
    questions.append({
        "id": idx + 1,
        "text": f"Question {idx + 1}: {q[0]}",
        "options": [
            {"value": q[2], "text": q[1]},
            {"value": q[4], "text": q[3]},
            {"value": q[6], "text": q[5]},
            {"value": q[8], "text": q[7]}
        ]
    })

tf_templates = [
    ("When making a decision, you rely more on:", "Pure logic and analysis", "T_2", "Objective facts that make sense", "T_1", "How it will affect people involved", "F_1", "Your personal values and feelings", "F_2"),
    ("You consider yourself more:", "Tough-minded and analytical", "T_2", "Rational and fair", "T_1", "Compassionate and warm", "F_1", "Empathetic and caring", "F_2"),
    ("In an argument, you prioritize:", "Finding the most logical truth", "T_2", "Making sure the facts are right", "T_1", "Keeping peace and harmony", "F_1", "Making sure nobody's feelings get hurt", "F_2"),
    ("You believe it is worse to be:", "Illogical or unreasonable", "T_2", "Too emotional", "T_1", "Too cold or indifferent", "F_1", "Unsympathetic to others", "F_2"),
    ("When critiquing others, you:", "Are completely straightforward and honest", "T_2", "Focus on what needs to be fixed", "T_1", "Try to cushion the blow", "F_1", "Worry heavily about upsetting them", "F_2")
]
# Expand T/F
for i in range(15):
    q = tf_templates[i % len(tf_templates)]
    idx = 30 + i
    questions.append({
        "id": idx + 1,
        "text": f"Question {idx + 1}: {q[0]}",
        "options": [
            {"value": q[2], "text": q[1]},
            {"value": q[4], "text": q[3]},
            {"value": q[6], "text": q[5]},
            {"value": q[8], "text": q[7]}
        ]
    })

jp_templates = [
    ("Your approach to tasks is usually:", "Plugging away systematically until done", "J_2", "Following a scheduled plan", "J_1", "Working in varied bursts of energy", "P_1", "Spontaneous and at the last minute", "P_2"),
    ("Regarding deadlines, you prefer to:", "Finish far ahead of time", "J_2", "Complete it right on schedule", "J_1", "Push it closer to the deadline", "P_1", "Do it at the final hour", "P_2"),
    ("You like your workspace to be:", "Extremely organized and tidy", "J_2", "Reasonably neat", "J_1", "A bit cluttered but I know where things are", "P_1", "Messy and chaotic, it sparks ideas", "P_2"),
    ("When traveling, you prefer to:", "Have a detailed hour-by-hour itinerary", "J_2", "Have a general outline of plans", "J_1", "Decide what to do on the day", "P_1", "Just go with the flow entirely", "P_2"),
    ("You consider yourself to be:", "Highly structured and decisive", "J_2", "Methodical", "J_1", "Adaptable and flexible", "P_1", "Spontaneous and open-ended", "P_2")
]
# Expand J/P
for i in range(15):
    q = jp_templates[i % len(jp_templates)]
    idx = 45 + i
    questions.append({
        "id": idx + 1,
        "text": f"Question {idx + 1}: {q[0]}",
        "options": [
            {"value": q[2], "text": q[1]},
            {"value": q[4], "text": q[3]},
            {"value": q[6], "text": q[5]},
            {"value": q[8], "text": q[7]}
        ]
    })

import json

questions_json = json.dumps(questions, indent=4)

with open(test_js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace the questions generation part in test.js
# Searching for:
#     const questions = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
#         ...
#     }));

target_js_pattern = re.compile(
    r"const questions = Array\.from\(\{ length: TOTAL_QUESTIONS \}, \(_, i\) => \(\{\n.*?\n    \}\)\);", 
    re.DOTALL
)

replacement_js = f"const questions = {questions_json};"

new_js_content = target_js_pattern.sub(replacement_js, js_content)

with open(test_js_path, 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("Updated app.py and test.js successfully!")
