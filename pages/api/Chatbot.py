## GasMan
## Jan. 12,2025

import google.generativeai as genai
import streamlit as st
import os
import re  # Import the regular expression module

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

# Define teacher data
teacher_data = {
    "name": "Jane Doe",
    "hours_taught": 120,
    "courses_taught": ["Math 101", "Science 202", "History 303"],
    "papers_graded": 200,
    "semester_data": {
        "Math 101": {
            "fall_2024": {
                "weeks_taught": 12,  # Number of weeks the course is taught
                "hours_per_week": 6  # Number of hours per week for Math 101
            }
        },
        "Science 202": {
            "spring_2024": {
                "weeks_taught": 15,
                "hours_per_week": 3  # Example for another course
            }
        }
    },
    "current_schedule": {
        "Monday": "Math 101 (9:00-11:00 AM)",
        "Wednesday": "Science 202 (10:00-12:00 PM)",
        "Friday": "History 303 (1:00-3:00 PM)"
    }
}

# Function to generate chatbot response
def chatbot_response(prompt):
    try:
        # Normalize the prompt
        prompt_lower = prompt.lower()

        # Extract course name using regex (more robust)
        match = re.search(r"hours taught in\s*([a-zA-Z0-9\s]+)", prompt_lower)
        if match:
            course_name = match.group(1).strip()

            # Calculate total hours across all semesters for the course
            total_hours = 0
            for course, semesters in teacher_data['semester_data'].items(): # iterate through the main `semester_data` structure
              if course.lower() == course_name: #If the right course is found, iterate through semesters
                for semester, data in semesters.items(): #Iterate through semester
                  weeks_taught = data.get("weeks_taught", 0)
                  hours_per_week = data.get("hours_per_week", 0)
                  total_hours += weeks_taught * hours_per_week

            if total_hours > 0:
                return f"{teacher_data['name']} taught {course_name} for a total of {total_hours} hours."
            else:
                return f"No hours data available for {course_name}."

        else:
            # Fallback to LLM if the regex doesn't match
            try:
                response = model.generate_content(f"Answer the following question about Jane Doe. {prompt}")
                return response.text
            except Exception as e:
                return f"Could not answer from internal data or using the LLM. Error: {e}"

    except Exception as e:
        return f"Error: {e}"

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
        response = chatbot_response(user_input) # Directly pass the user's input
        st.success("Response:")
        st.write(response)

# Feedback section
st.subheader("🌟 Feedback")
feedback = st.text_area("Share your feedback about the chatbot!")
if st.button("Submit Feedback"):
    st.success("Thank you for your feedback!")