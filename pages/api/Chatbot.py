## GasMan
## Jan. 12,2025

import google.generativeai as genai
import streamlit as st
import os
import re

# Configure Google API
try:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY environment variable not set.")
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro') # Access the Gemini Pro model
except ValueError as e:
    st.error(f"Error: {e}")
    st.stop()  # Stop execution if the API key is missing
except Exception as e:
    st.error(f"Error initializing the Gemini model: {e}")
    st.stop()

# Teacher data with courses, weeks taught, and hours per session
teacher_data = {
    "name": "Jane Doe",
    "hours_taught": 120,
    "courses_taught": ["Math 101", "Science 202", "History 303"],
    "papers_graded": 200,
    "semester_data": {
        "Math 101": {
            "fall_2024": {
                "weeks_taught": 12,  # Total weeks taught in Fall 2024
                "hours_per_week": 6,  # Number of hours per week for Math 101
                "days": ["Monday", "Wednesday", "Friday"]  # Taught on these days
            },
            "spring_2024": {
                "weeks_taught": 10,
                "hours_per_week": 4,
                "days": ["Tuesday", "Thursday"]
            }
        },
        "Science 202": {
            "fall_2024": {
                "weeks_taught": 12,
                "hours_per_week": 6,
                "days": ["Monday", "Wednesday", "Friday"]
            }
        },
        "History 303": {
            "fall_2024": {
                "weeks_taught": 12,
                "hours_per_week": 6,
                "days": ["Monday", "Wednesday", "Friday"]
            }
        }
    },
    "current_schedule": {
        "Monday": "Math 101 (9:00-11:00 AM)",
        "Wednesday": "Science 202 (10:00-12:00 PM)",
        "Friday": "History 303 (1:00-3:00 PM)"
    }
}

# Function to handle chatbot response
def chatbot_response(prompt):
    prompt_lower = prompt.lower()
    print(f"[DEBUG] Received prompt: {prompt_lower}")  # Debugging statement

    try:
        # Use LLM to answer all questions
        response = model.generate_content(f"You are a chatbot providing information about Jane Doe, a teacher.  Here is Jane Doe's data: Name: Jane Doe, Hours Taught: 120, Courses Taught: Math 101, Science 202, History 303, Papers Graded: 200.  Her schedule is:  Monday: Math 101 (9:00-11:00 AM), Wednesday: Science 202 (10:00-12:00 PM), Friday: History 303 (1:00-3:00 PM). If the question is about Jane Doe's schedule, please format in day with parenthesis time. For example, Monday (9:00-11:00 AM). If the question is about the list of courses please separate the course by commas. Answer the question to the best of your ability: {prompt}")
        return response.text
    except Exception as e:
        return f"Could not answer from internal data or using the LLM.  Error: {e}"

# Streamlit setup
st.set_page_config(page_title="Teacher Chatbot", layout="wide")
st.title("📚 Teacher Management Chatbot")
st.write("Ask the chatbot about your teaching stats, schedule, or anything related to your work!")

# Display teacher data in the sidebar
st.sidebar.header("📊 Teacher Data Overview")
st.sidebar.write(f"**Name:** {teacher_data['name']}")
st.sidebar.write(f"**Hours Taught:** {teacher_data['hours_taught']} hours")
st.sidebar.write(f"**Courses Taught:** {', '.join(teacher_data['courses_taught'])}")
st.sidebar.write(f"**Papers Graded:** {teacher_data['papers_graded']}")

# Check and display current schedule
st.sidebar.subheader("📅 Weekly Schedule")
if 'current_schedule' in teacher_data and isinstance(teacher_data['current_schedule'], dict):
    for day, schedule in teacher_data['current_schedule'].items():
        st.sidebar.write(f"**{day}:** {schedule}")
else:
    st.sidebar.write("Current schedule data is missing or incorrectly formatted.")

# Chatbot interaction
st.subheader("💬 Chat with the Assistant")
user_input = st.text_input("Enter your question:", placeholder="E.g., How many hours have I taught this week?")
submit_button = st.button("Send")

if submit_button and user_input:
    with st.spinner("Thinking..."):
        response = chatbot_response(user_input)
        st.success("Response:")
        st.write(response)

# Feedback section
st.subheader("🌟 Feedback")
feedback = st.text_area("Share your feedback about the chatbot!")
if st.button("Submit Feedback"):
    st.success("Thank you for your feedback!")