## GasMan
## Jan. 12,2025

from datetime import datetime
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
    "courses_taught": {
        "Math 101": {
            "semester_data": {
                "fall_2024": {
                    "weeks_taught": 12,  # Total weeks taught in Fall 2024
                    "hours_per_week": 6,  # 2 hours per day, 3 days per week
                    "days": ["Monday", "Wednesday", "Friday"]  # Taught on these days
                },
                "spring_2024": {
                    "weeks_taught": 10,
                    "hours_per_week": 4,
                    "days": ["Tuesday", "Thursday"]
                }
            }
        },
        "Science 202": {
            "semester_data": {
                "fall_2024": {
                    "weeks_taught": 12,
                    "hours_per_week": 6,
                    "days": ["Monday", "Wednesday", "Friday"]
                }
            }
        },
        "History 303": {
            "semester_data": {
                "fall_2024": {
                    "weeks_taught": 12,
                    "hours_per_week": 6,
                    "days": ["Monday", "Wednesday", "Friday"]
                }
            }
        }
    },
    "current_schedule": {
        "Monday": "Math 101 (9:00-11:00 AM)",
        "Wednesday": "Science 202 (10:00-12:00 PM)",
        "Friday": "History 303 (1:00-3:00 PM)"
    }
}

def get_hours_taught_this_week(course_name, semester="fall_2024", current_date=None):
    """
    Calculates hours taught this week for a given course and semester.

    Args:
        course_name (str): Name of the course.
        semester (str):  The semester to look up. Defaults to "fall_2024"
        current_date (datetime, optional):  Date to use for calculating the current week.
                                           Defaults to datetime.now() for testing purposes

    Returns:
        str: A string indicating the hours taught this week, or an error message.
    """
    if current_date is None:
        current_date = datetime.now()

    current_week = current_date.isocalendar()[1]  # Get current week of the year

    week_data = teacher_data['courses_taught'].get(course_name, {})
    if not week_data:
        return f"Course {course_name} not found."

    semester_data = week_data.get('semester_data', {}).get(semester, {})
    if not semester_data:
        return f"No data for {course_name} in {semester}."

    weeks_taught = semester_data.get('weeks_taught', 0)
    hours_per_week = semester_data.get('hours_per_week', 0)

    # Check if the course is being taught this week
    if current_week <= weeks_taught:
        return f"{hours_per_week} hours were taught this week in {course_name}."
    else:
        return "No data for this week."



# Function to handle chatbot response
def chatbot_response(prompt):
    prompt_lower = prompt.lower()
    print(f"[DEBUG] Received prompt: {prompt_lower}")  # Debugging statement

    if "math 101" in prompt_lower and "this week" in prompt_lower:
        return get_hours_taught_this_week("Math 101")
    elif "science 202" in prompt_lower and "this week" in prompt_lower:
        return get_hours_taught_this_week("Science 202")
    elif "history 303" in prompt_lower and "this week" in prompt_lower:
        return get_hours_taught_this_week("History 303")
    else:
        try: #LLM for non-definitive prompts
            response = model.generate_content(f"Answer the following question about Jane Doe. {prompt}")
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