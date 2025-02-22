## GasMan
## Jan. 12,2025


import os
import google.generativeai as genai
import streamlit as st
import re

# Set up the generative AI API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

# Teacher data with courses and hours taught
teacher_data = {
    "name": "Jane Doe",
    "hours_taught": 120,
    "courses_taught": ["Math 101", "Science 202", "History 303"],
    "papers_graded": 200,
    "semester_data": {
        "Math 101": {
            "fall_2024": {
                "weeks_taught": 12,
                "hours_per_week": 6  # 2 hours per day, 3 days per week
            }
        },
        "Science 202": {
            "spring_2024": {
                "weeks_taught": 15,
                "hours_per_week": 6  # Example for another course
            }
        },
        "History 303": {
            "fall_2024": {
                "weeks_taught": 14,
                "hours_per_week": 6
            }
        }
    }
}

# Function to calculate hours taught based on the course name
def get_hours_taught(course_name, semester="fall_2024"):
    semester_data = teacher_data['semester_data'].get(course_name, {}).get(semester, {})
    if semester_data:
        weeks_taught = semester_data.get("weeks_taught", 0)
        hours_per_week = semester_data.get("hours_per_week", 0)
        total_hours = weeks_taught * hours_per_week
        return total_hours
    return None

# Function to handle chatbot response
def chatbot_response(prompt):
    # Normalize the input (case-insensitive and remove extra spaces)
    prompt = prompt.lower().strip()

    # Define possible variations
    if re.search(r'how.*hours.*taught.*math 101', prompt):
        total_hours = get_hours_taught("Math 101")
        return f"Math 101 was taught for {total_hours} hours in Fall 2024."

    elif re.search(r'how.*hours.*math 101.*week', prompt):
        # Assume 2 hours per week, 3 days, for simplicity
        return "Math 101 is taught for 6 hours per week (2 hours per day, 3 days per week) in Fall 2024."

    elif re.search(r'how.*many.*hours.*taught.*in.*math 101.*this week', prompt):
        # Add logic to handle weekly teaching hours
        return "This week, Math 101 has been taught for 6 hours."

    else:
        return "Sorry, I don't have enough information to answer that."

# Streamlit UI setup
st.set_page_config(page_title="Teacher Chatbot", layout="wide")
st.title("📚 Teacher Management Chatbot")
st.write("Ask the chatbot about your teaching stats, schedule, or anything related to your work!")

st.sidebar.header("📊 Teacher Data Overview")
st.sidebar.write(f"**Name:** {teacher_data['name']}")
st.sidebar.write(f"**Hours Taught:** {teacher_data['hours_taught']} hours")
st.sidebar.write(f"**Courses Taught:** {', '.join(teacher_data['courses_taught'])}")
st.sidebar.write(f"**Papers Graded:** {teacher_data['papers_graded']}")

st.sidebar.subheader("📅 Weekly Schedule")
for day, schedule in teacher_data['current_schedule'].items():
    st.sidebar.write(f"**{day}:** {schedule}")

st.subheader("💬 Chat with the Assistant")
user_input = st.text_input("Enter your question:", placeholder="E.g., How many hours have I taught this week?")
submit_button = st.button("Send")

if submit_button and user_input:
    with st.spinner("Thinking..."):
        full_prompt = f"""
        You are assisting a teacher with the following data:
        - Name: {teacher_data['name']}
        - Hours Taught: {teacher_data['hours_taught']}
        - Courses Taught: {', '.join(teacher_data['courses_taught'])}
        - Papers Graded: {teacher_data['papers_graded']}
        - Schedule: {teacher_data['current_schedule']}
        
        Question: {user_input}
        """
        response = chatbot_response(full_prompt)
        st.success("Response:")
        st.write(response)

st.subheader("🌟 Feedback")
feedback = st.text_area("Share your feedback about the chatbot!")
if st.button("Submit Feedback"):
    st.success("Thank you for your feedback!")


