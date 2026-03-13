document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_QUESTIONS = 60;
    let currentQuestionIndex = 0;
    const answers = new Array(TOTAL_QUESTIONS).fill(null);

    const questionsWrapper = document.getElementById('questionsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // Generate 60 Placeholder Questions for the UI mockup
    // In a real app, these would be fetched from the backend or a JSON file mapped to MBTI spectrums
    const questions = [
        {
            "id": 1,
            "text": "Question 1: How do you recharge after a long session?",
            "options": [
                {
                    "value": "E_2",
                    "text": "Surrounding myself with people"
                },
                {
                    "value": "E_1",
                    "text": "Chatting with a friend"
                },
                {
                    "value": "I_1",
                    "text": "Enjoying some quiet time"
                },
                {
                    "value": "I_2",
                    "text": "Being completely alone"
                }
            ]
        },
        {
            "id": 2,
            "text": "Question 2: In a group setting, you usually:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Take the lead in the conversation"
                },
                {
                    "value": "E_1",
                    "text": "Join in comfortably"
                },
                {
                    "value": "I_1",
                    "text": "Listen and speak occasionally"
                },
                {
                    "value": "I_2",
                    "text": "Observe and let others talk"
                }
            ]
        },
        {
            "id": 3,
            "text": "Question 3: When meeting new people, you:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Instantly feel energized"
                },
                {
                    "value": "E_1",
                    "text": "Are glad to make connections"
                },
                {
                    "value": "I_1",
                    "text": "Take time to warm up"
                },
                {
                    "value": "I_2",
                    "text": "Feel quite drained"
                }
            ]
        },
        {
            "id": 4,
            "text": "Question 4: Your ideal weekend involves:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Going to a big party or event"
                },
                {
                    "value": "E_1",
                    "text": "Hanging out with a group of friends"
                },
                {
                    "value": "I_1",
                    "text": "Relaxing with one or two close friends"
                },
                {
                    "value": "I_2",
                    "text": "Staying home and enjoying solitude"
                }
            ]
        },
        {
            "id": 5,
            "text": "Question 5: When you have a problem to solve, you:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Talk it out with anyone available"
                },
                {
                    "value": "E_1",
                    "text": "Discuss it with a few people"
                },
                {
                    "value": "I_1",
                    "text": "Think it through beforehand"
                },
                {
                    "value": "I_2",
                    "text": "Keep it to yourself entirely"
                }
            ]
        },
        {
            "id": 6,
            "text": "Question 6: At networking events, you:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Talk to as many people as possible"
                },
                {
                    "value": "E_1",
                    "text": "Focus on a few meaningful conversations"
                },
                {
                    "value": "I_1",
                    "text": "Stick with people you already know"
                },
                {
                    "value": "I_2",
                    "text": "Try to leave as soon as it's polite"
                }
            ]
        },
        {
            "id": 7,
            "text": "Question 7: Your communication style is usually:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Expressive and animated"
                },
                {
                    "value": "E_1",
                    "text": "Open and approachable"
                },
                {
                    "value": "I_1",
                    "text": "Reserved and thoughtful"
                },
                {
                    "value": "I_2",
                    "text": "Quiet and concise"
                }
            ]
        },
        {
            "id": 8,
            "text": "Question 8: Working in an open-plan office makes you feel:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Energized and productive"
                },
                {
                    "value": "E_1",
                    "text": "Okay, as long as I have headphones"
                },
                {
                    "value": "I_1",
                    "text": "Slightly distracted"
                },
                {
                    "value": "I_2",
                    "text": "Overwhelmed and drained"
                }
            ]
        },
        {
            "id": 9,
            "text": "Question 9: When you experience something exciting, you:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Share it with everyone immediately"
                },
                {
                    "value": "E_1",
                    "text": "Tell your close friends"
                },
                {
                    "value": "I_1",
                    "text": "Enjoy the moment internally first"
                },
                {
                    "value": "I_2",
                    "text": "Keep it entirely to yourself"
                }
            ]
        },
        {
            "id": 10,
            "text": "Question 10: Your social calendar is usually:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Packed with different groups and events"
                },
                {
                    "value": "E_1",
                    "text": "Balanced with social and alone time"
                },
                {
                    "value": "I_1",
                    "text": "Light, with occasional meetups"
                },
                {
                    "value": "I_2",
                    "text": "Mostly empty, by choice"
                }
            ]
        },
        {
            "id": 11,
            "text": "Question 11: In meetings, you prefer to:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Speak up and think out loud"
                },
                {
                    "value": "E_1",
                    "text": "Listen first, then offer opinions"
                },
                {
                    "value": "I_1",
                    "text": "Only speak when directly asked"
                },
                {
                    "value": "I_2",
                    "text": "Summarize your thoughts in an email later"
                }
            ]
        },
        {
            "id": 12,
            "text": "Question 12: After a busy day of interactions, you want to:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Go out and do something fun"
                },
                {
                    "value": "E_1",
                    "text": "Call a friend to debrief"
                },
                {
                    "value": "I_1",
                    "text": "Watch a movie alone"
                },
                {
                    "value": "I_2",
                    "text": "Retreat to absolute silence"
                }
            ]
        },
        {
            "id": 13,
            "text": "Question 13: When a friend unexpectedly drops by, you:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Are thrilled and welcome them in"
                },
                {
                    "value": "E_1",
                    "text": "Are happy but slightly caught off guard"
                },
                {
                    "value": "I_1",
                    "text": "Wish they had texted first"
                },
                {
                    "value": "I_2",
                    "text": "Pretend you aren't home"
                }
            ]
        },
        {
            "id": 14,
            "text": "Question 14: Your energy levels are highest when:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Collaborating with a big team"
                },
                {
                    "value": "E_1",
                    "text": "Working with a partner"
                },
                {
                    "value": "I_1",
                    "text": "Working independently alongside others"
                },
                {
                    "value": "I_2",
                    "text": "Working completely alone"
                }
            ]
        },
        {
            "id": 15,
            "text": "Question 15: At a restaurant with a large group, you:",
            "options": [
                {
                    "value": "E_2",
                    "text": "Talk across the table to everyone"
                },
                {
                    "value": "E_1",
                    "text": "Converse with the people immediately next to you"
                },
                {
                    "value": "I_1",
                    "text": "Listen to the various conversations"
                },
                {
                    "value": "I_2",
                    "text": "Feel exhausted by the noise"
                }
            ]
        },
        {
            "id": 16,
            "text": "Question 16: When learning something new, you prefer:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Clear facts and practical examples"
                },
                {
                    "value": "S_1",
                    "text": "Step-by-step instructions"
                },
                {
                    "value": "N_1",
                    "text": "General ideas and theories"
                },
                {
                    "value": "N_2",
                    "text": "Exploring abstract concepts"
                }
            ]
        },
        {
            "id": 17,
            "text": "Question 17: You pay more attention to:",
            "options": [
                {
                    "value": "S_2",
                    "text": "What is present and actual"
                },
                {
                    "value": "S_1",
                    "text": "Specific details of a situation"
                },
                {
                    "value": "N_1",
                    "text": "The big picture"
                },
                {
                    "value": "N_2",
                    "text": "What could be possible"
                }
            ]
        },
        {
            "id": 18,
            "text": "Question 18: People often describe you as:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Grounded and realistic"
                },
                {
                    "value": "S_1",
                    "text": "Practical and observant"
                },
                {
                    "value": "N_1",
                    "text": "Imaginative and creative"
                },
                {
                    "value": "N_2",
                    "text": "Visionary and unconventional"
                }
            ]
        },
        {
            "id": 19,
            "text": "Question 19: When reading a book, you focus on:",
            "options": [
                {
                    "value": "S_2",
                    "text": "The actual events happening"
                },
                {
                    "value": "S_1",
                    "text": "The details of the description"
                },
                {
                    "value": "N_1",
                    "text": "The underlying themes"
                },
                {
                    "value": "N_2",
                    "text": "The hidden meanings and symbolism"
                }
            ]
        },
        {
            "id": 20,
            "text": "Question 20: You trust:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Your direct experience"
                },
                {
                    "value": "S_1",
                    "text": "Proven facts and figures"
                },
                {
                    "value": "N_1",
                    "text": "Your gut feelings"
                },
                {
                    "value": "N_2",
                    "text": "Your intuition and instincts"
                }
            ]
        },
        {
            "id": 21,
            "text": "Question 21: In your work, you value:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Standard procedures that work"
                },
                {
                    "value": "S_1",
                    "text": "Efficiency and accuracy"
                },
                {
                    "value": "N_1",
                    "text": "Innovation and new approaches"
                },
                {
                    "value": "N_2",
                    "text": "Disruptive and original ideas"
                }
            ]
        },
        {
            "id": 22,
            "text": "Question 22: When describing a past event, you:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Provide an exact chronological account"
                },
                {
                    "value": "S_1",
                    "text": "Highlight the key factual points"
                },
                {
                    "value": "N_1",
                    "text": "Summarize the general vibe"
                },
                {
                    "value": "N_2",
                    "text": "Focus on the meaning of what happened"
                }
            ]
        },
        {
            "id": 23,
            "text": "Question 23: You are more interested in:",
            "options": [
                {
                    "value": "S_2",
                    "text": "What is real and concrete"
                },
                {
                    "value": "S_1",
                    "text": "How things currently operate"
                },
                {
                    "value": "N_1",
                    "text": "What things could become"
                },
                {
                    "value": "N_2",
                    "text": "The underlying patterns of the universe"
                }
            ]
        },
        {
            "id": 24,
            "text": "Question 24: When assembling furniture, you:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Follow the instructions exactly"
                },
                {
                    "value": "S_1",
                    "text": "Sort the pieces first, then follow along"
                },
                {
                    "value": "N_1",
                    "text": "Glance at the picture and figure it out"
                },
                {
                    "value": "N_2",
                    "text": "Ignore instructions and build intuitively"
                }
            ]
        },
        {
            "id": 25,
            "text": "Question 25: Your ideal workspace involves:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Practical tools and clear organization"
                },
                {
                    "value": "S_1",
                    "text": "A reliable setup that rarely changes"
                },
                {
                    "value": "N_1",
                    "text": "Inspiring quotes and colorful design"
                },
                {
                    "value": "N_2",
                    "text": "A chaotic but mentally stimulating environment"
                }
            ]
        },
        {
            "id": 26,
            "text": "Question 26: You admire people who are:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Reliable and precise"
                },
                {
                    "value": "S_1",
                    "text": "Hardworking and detail-oriented"
                },
                {
                    "value": "N_1",
                    "text": "Creative and insightful"
                },
                {
                    "value": "N_2",
                    "text": "Deeply visionary and philosophical"
                }
            ]
        },
        {
            "id": 27,
            "text": "Question 27: When planning a project, you start with:",
            "options": [
                {
                    "value": "S_2",
                    "text": "The available resources and constraints"
                },
                {
                    "value": "S_1",
                    "text": "The immediate next steps"
                },
                {
                    "value": "N_1",
                    "text": "The ultimate goal and vision"
                },
                {
                    "value": "N_2",
                    "text": "Multiple brain-storming possibilities"
                }
            ]
        },
        {
            "id": 28,
            "text": "Question 28: You consider yourself to be more of a:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Realist"
                },
                {
                    "value": "S_1",
                    "text": "Pragmatist"
                },
                {
                    "value": "N_1",
                    "text": "Idealist"
                },
                {
                    "value": "N_2",
                    "text": "Dreamer"
                }
            ]
        },
        {
            "id": 29,
            "text": "Question 29: When faced with a complex issue, you:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Look at the concrete data"
                },
                {
                    "value": "S_1",
                    "text": "Examine previous similar cases"
                },
                {
                    "value": "N_1",
                    "text": "Look for hidden connections"
                },
                {
                    "value": "N_2",
                    "text": "Try to find a completely novel approach"
                }
            ]
        },
        {
            "id": 30,
            "text": "Question 30: You prefer metaphors that are:",
            "options": [
                {
                    "value": "S_2",
                    "text": "Simple and grounded in reality"
                },
                {
                    "value": "S_1",
                    "text": "Easy to understand quickly"
                },
                {
                    "value": "N_1",
                    "text": "Complex and thought-provoking"
                },
                {
                    "value": "N_2",
                    "text": "Abstract and poetic"
                }
            ]
        },
        {
            "id": 31,
            "text": "Question 31: When making a decision, you rely more on:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Pure logic and analysis"
                },
                {
                    "value": "T_1",
                    "text": "Objective facts that make sense"
                },
                {
                    "value": "F_1",
                    "text": "How it will affect people involved"
                },
                {
                    "value": "F_2",
                    "text": "Your personal values and feelings"
                }
            ]
        },
        {
            "id": 32,
            "text": "Question 32: You consider yourself more:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Tough-minded and analytical"
                },
                {
                    "value": "T_1",
                    "text": "Rational and fair"
                },
                {
                    "value": "F_1",
                    "text": "Compassionate and warm"
                },
                {
                    "value": "F_2",
                    "text": "Empathetic and caring"
                }
            ]
        },
        {
            "id": 33,
            "text": "Question 33: In an argument, you prioritize:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Finding the most logical truth"
                },
                {
                    "value": "T_1",
                    "text": "Making sure the facts are right"
                },
                {
                    "value": "F_1",
                    "text": "Keeping peace and harmony"
                },
                {
                    "value": "F_2",
                    "text": "Making sure nobody's feelings get hurt"
                }
            ]
        },
        {
            "id": 34,
            "text": "Question 34: You believe it is worse to be:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Illogical or unreasonable"
                },
                {
                    "value": "T_1",
                    "text": "Too emotional"
                },
                {
                    "value": "F_1",
                    "text": "Too cold or indifferent"
                },
                {
                    "value": "F_2",
                    "text": "Unsympathetic to others"
                }
            ]
        },
        {
            "id": 35,
            "text": "Question 35: When critiquing others, you:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Are completely straightforward and honest"
                },
                {
                    "value": "T_1",
                    "text": "Focus on what needs to be fixed"
                },
                {
                    "value": "F_1",
                    "text": "Try to cushion the blow"
                },
                {
                    "value": "F_2",
                    "text": "Worry heavily about upsetting them"
                }
            ]
        },
        {
            "id": 36,
            "text": "Question 36: You admire people who are:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Objective and detached"
                },
                {
                    "value": "T_1",
                    "text": "Fair and consistent"
                },
                {
                    "value": "F_1",
                    "text": "Warm and accommodating"
                },
                {
                    "value": "F_2",
                    "text": "Deeply caring and loyal"
                }
            ]
        },
        {
            "id": 37,
            "text": "Question 37: When a friend is upset, you:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Offer practical solutions immediately"
                },
                {
                    "value": "T_1",
                    "text": "Analyze why the problem occurred"
                },
                {
                    "value": "F_1",
                    "text": "Offer a listening ear and sympathy"
                },
                {
                    "value": "F_2",
                    "text": "Provide emotional support and validate their feelings"
                }
            ]
        },
        {
            "id": 38,
            "text": "Question 38: In a team project, you value:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Competence and efficiency"
                },
                {
                    "value": "T_1",
                    "text": "Clear roles and logical structure"
                },
                {
                    "value": "F_1",
                    "text": "Cooperation and team spirit"
                },
                {
                    "value": "F_2",
                    "text": "A supportive and friendly atmosphere"
                }
            ]
        },
        {
            "id": 39,
            "text": "Question 39: When evaluating a movie, you focus on:",
            "options": [
                {
                    "value": "T_2",
                    "text": "The plot holes and inconsistencies"
                },
                {
                    "value": "T_1",
                    "text": "The structure and pacing"
                },
                {
                    "value": "F_1",
                    "text": "How the characters relate to each other"
                },
                {
                    "value": "F_2",
                    "text": "The emotional impact it had on you"
                }
            ]
        },
        {
            "id": 40,
            "text": "Question 40: You make choices based on:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Cost-benefit analysis"
                },
                {
                    "value": "T_1",
                    "text": "What makes the most logical sense"
                },
                {
                    "value": "F_1",
                    "text": "What aligns with your moral compass"
                },
                {
                    "value": "F_2",
                    "text": "What feels right in your heart"
                }
            ]
        },
        {
            "id": 41,
            "text": "Question 41: In leadership, you believe it's more important to be:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Respected for your competence"
                },
                {
                    "value": "T_1",
                    "text": "Fair and just"
                },
                {
                    "value": "F_1",
                    "text": "Liked by your team"
                },
                {
                    "value": "F_2",
                    "text": "An empathetic mentor"
                }
            ]
        },
        {
            "id": 42,
            "text": "Question 42: You are more easily swayed by:",
            "options": [
                {
                    "value": "T_2",
                    "text": "A well-reasoned argument"
                },
                {
                    "value": "T_1",
                    "text": "Statistical evidence"
                },
                {
                    "value": "F_1",
                    "text": "A poignant personal story"
                },
                {
                    "value": "F_2",
                    "text": "An appeal to shared values"
                }
            ]
        },
        {
            "id": 43,
            "text": "Question 43: When someone makes a mistake, you:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Point it out directly so they can fix it"
                },
                {
                    "value": "T_1",
                    "text": "Explain the logical error"
                },
                {
                    "value": "F_1",
                    "text": "Gently suggest a different way"
                },
                {
                    "value": "F_2",
                    "text": "Avoid mentioning it to save their feelings"
                }
            ]
        },
        {
            "id": 44,
            "text": "Question 44: Your communication style is:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Direct and to the point"
                },
                {
                    "value": "T_1",
                    "text": "Clear and objective"
                },
                {
                    "value": "F_1",
                    "text": "Tactful and polite"
                },
                {
                    "value": "F_2",
                    "text": "Warm and affirming"
                }
            ]
        },
        {
            "id": 45,
            "text": "Question 45: You evaluate success by:",
            "options": [
                {
                    "value": "T_2",
                    "text": "Measurable outcomes and metrics"
                },
                {
                    "value": "T_1",
                    "text": "Meeting logical objectives"
                },
                {
                    "value": "F_1",
                    "text": "The positive impact on others"
                },
                {
                    "value": "F_2",
                    "text": "Personal fulfillment and happiness"
                }
            ]
        },
        {
            "id": 46,
            "text": "Question 46: Your approach to tasks is usually:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Plugging away systematically until done"
                },
                {
                    "value": "J_1",
                    "text": "Following a scheduled plan"
                },
                {
                    "value": "P_1",
                    "text": "Working in varied bursts of energy"
                },
                {
                    "value": "P_2",
                    "text": "Spontaneous and at the last minute"
                }
            ]
        },
        {
            "id": 47,
            "text": "Question 47: Regarding deadlines, you prefer to:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Finish far ahead of time"
                },
                {
                    "value": "J_1",
                    "text": "Complete it right on schedule"
                },
                {
                    "value": "P_1",
                    "text": "Push it closer to the deadline"
                },
                {
                    "value": "P_2",
                    "text": "Do it at the final hour"
                }
            ]
        },
        {
            "id": 48,
            "text": "Question 48: You like your workspace to be:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Extremely organized and tidy"
                },
                {
                    "value": "J_1",
                    "text": "Reasonably neat"
                },
                {
                    "value": "P_1",
                    "text": "A bit cluttered but I know where things are"
                },
                {
                    "value": "P_2",
                    "text": "Messy and chaotic, it sparks ideas"
                }
            ]
        },
        {
            "id": 49,
            "text": "Question 49: When traveling, you prefer to:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Have a detailed hour-by-hour itinerary"
                },
                {
                    "value": "J_1",
                    "text": "Have a general outline of plans"
                },
                {
                    "value": "P_1",
                    "text": "Decide what to do on the day"
                },
                {
                    "value": "P_2",
                    "text": "Just go with the flow entirely"
                }
            ]
        },
        {
            "id": 50,
            "text": "Question 50: You consider yourself to be:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Highly structured and decisive"
                },
                {
                    "value": "J_1",
                    "text": "Methodical"
                },
                {
                    "value": "P_1",
                    "text": "Adaptable and flexible"
                },
                {
                    "value": "P_2",
                    "text": "Spontaneous and open-ended"
                }
            ]
        },
        {
            "id": 51,
            "text": "Question 51: When your plans change suddenly, you are:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Highly stressed and frustrated"
                },
                {
                    "value": "J_1",
                    "text": "Annoyed but can adjust"
                },
                {
                    "value": "P_1",
                    "text": "Okay, it happens"
                },
                {
                    "value": "P_2",
                    "text": "Excited by the new possibilities"
                }
            ]
        },
        {
            "id": 52,
            "text": "Question 52: You prefer to work in environments that are:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Predictable and orderly"
                },
                {
                    "value": "J_1",
                    "text": "Structured but with some leeway"
                },
                {
                    "value": "P_1",
                    "text": "Dynamic and changing"
                },
                {
                    "value": "P_2",
                    "text": "Completely unstructured and free"
                }
            ]
        },
        {
            "id": 53,
            "text": "Question 53: When shopping, you:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Make a detailed list and stick to it"
                },
                {
                    "value": "J_1",
                    "text": "Have a mental plan of what to buy"
                },
                {
                    "value": "P_1",
                    "text": "Browse and see what catches your eye"
                },
                {
                    "value": "P_2",
                    "text": "Buy whatever feels right in the moment"
                }
            ]
        },
        {
            "id": 54,
            "text": "Question 54: Your daily routine is:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Rigid and strictly followed"
                },
                {
                    "value": "J_1",
                    "text": "Consistent on most days"
                },
                {
                    "value": "P_1",
                    "text": "Variable depending on my mood"
                },
                {
                    "value": "P_2",
                    "text": "Non-existent"
                }
            ]
        },
        {
            "id": 55,
            "text": "Question 55: You prefer to have:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Matters settled and decided upon"
                },
                {
                    "value": "J_1",
                    "text": "A clear direction forward"
                },
                {
                    "value": "P_1",
                    "text": "Options kept open"
                },
                {
                    "value": "P_2",
                    "text": "The freedom to change your mind constantly"
                }
            ]
        },
        {
            "id": 56,
            "text": "Question 56: When working on a long-term project, you:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Create distinct milestones and stick to them"
                },
                {
                    "value": "J_1",
                    "text": "Keep a general timeline in mind"
                },
                {
                    "value": "P_1",
                    "text": "Work when inspiration strikes"
                },
                {
                    "value": "P_2",
                    "text": "Procrastinate until the pressure motivates you"
                }
            ]
        },
        {
            "id": 57,
            "text": "Question 57: You are more comfortable with:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Rules and guidelines"
                },
                {
                    "value": "J_1",
                    "text": "Clear expectations"
                },
                {
                    "value": "P_1",
                    "text": "General suggestions"
                },
                {
                    "value": "P_2",
                    "text": "Complete freedom and autonomy"
                }
            ]
        },
        {
            "id": 58,
            "text": "Question 58: To relax, you prefer to:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Complete all your chores first"
                },
                {
                    "value": "J_1",
                    "text": "Have a set 'relaxation time'"
                },
                {
                    "value": "P_1",
                    "text": "Drop whatever you're doing when you feel like it"
                },
                {
                    "value": "P_2",
                    "text": "Avoid chores entirely to relax first"
                }
            ]
        },
        {
            "id": 59,
            "text": "Question 59: Your friends would describe you as:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Organized and reliable"
                },
                {
                    "value": "J_1",
                    "text": "Punctual and responsible"
                },
                {
                    "value": "P_1",
                    "text": "Easy-going and adaptable"
                },
                {
                    "value": "P_2",
                    "text": "Unpredictable and spontaneous"
                }
            ]
        },
        {
            "id": 60,
            "text": "Question 60: You feel most satisfied when you:",
            "options": [
                {
                    "value": "J_2",
                    "text": "Cross the last item off a to-do list"
                },
                {
                    "value": "J_1",
                    "text": "Make a definitive choice"
                },
                {
                    "value": "P_1",
                    "text": "Discover a new option"
                },
                {
                    "value": "P_2",
                    "text": "Can explore multiple paths without committing"
                }
            ]
        }
    ];

    // Function to render the questions
    function renderQuestions() {
        questions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = `question-card ${index === 0 ? 'active' : ''}`;
            card.id = `question-${index}`;

            const qText = document.createElement('h3');
            qText.className = 'question-text';
            qText.textContent = q.text;
            card.appendChild(qText);

            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';

            q.options.forEach((opt, optIndex) => {
                const inputId = `q${index}_opt${optIndex}`;
                
                const wrapper = document.createElement('div');
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question_${q.id}`;
                input.value = opt.value;
                input.id = inputId;
                input.className = 'option-input';
                
                // Event listener to auto-advance if it's not the last question
                input.addEventListener('change', () => {
                    answers[index] = opt.value;
                    setTimeout(() => {
                        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
                            navigate(1);
                        } else {
                            updateUI(); // Just update buttons if last question
                        }
                    }, 400); // Small delay so user sees the selection animation
                });

                const label = document.createElement('label');
                label.htmlFor = inputId;
                label.className = 'option-label';
                
                const customRadio = document.createElement('div');
                customRadio.className = 'custom-radio';
                
                const spanText = document.createElement('span');
                spanText.textContent = opt.text;

                label.appendChild(customRadio);
                label.appendChild(spanText);
                
                wrapper.appendChild(input);
                wrapper.appendChild(label);
                
                optionsGrid.appendChild(wrapper);
            });

            card.appendChild(optionsGrid);
            questionsWrapper.appendChild(card);
        });
    }

    // Function to handle navigation
    function navigate(direction) {
        const currentCard = document.getElementById(`question-${currentQuestionIndex}`);
        currentCard.classList.remove('active');

        currentQuestionIndex += direction;

        const newCard = document.getElementById(`question-${currentQuestionIndex}`);
        newCard.classList.add('active');

        updateUI();
    }

    // Function to update Progress Bar, Text, and Buttons
    function updateUI() {
        // Update Progress
        const progressPercentage = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${TOTAL_QUESTIONS}`;

        // Update Buttons
        prevBtn.disabled = currentQuestionIndex === 0;

        if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
            nextBtn.style.display = 'none';
            // Only show submit if an answer for the last question is selected
            if(answers[TOTAL_QUESTIONS - 1]) {
                 submitBtn.style.display = 'block';
            } else {
                 submitBtn.style.display = 'none';
                 // Keep a disabled next padding if we want
            }
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
            
            // Disable next if current question isn't answered yet (optional strict mode)
            // nextBtn.disabled = !answers[currentQuestionIndex]; 
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) navigate(-1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
            // Optional: Prevent advancing if no answer selected
            if (!answers[currentQuestionIndex]) {
                alert('Please select an option before continuing.');
                return;
            }
            navigate(1);
        }
    });

    // Initialize
    renderQuestions();
    updateUI();
});