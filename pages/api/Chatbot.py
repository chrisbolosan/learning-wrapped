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
        # Improved extraction using regular expressions
        match = re.search(r"hours taught in\s*([a-zA-Z0-9\s]+)(?:\s*by\s*[a-zA-Z\s]+)?(?:\s*in the\s*([a-zA-Z0-9\s]+)\s*semester)?", prompt.lower())
        if match:
            course_name = match.group(1).strip()
            semester_name = match.group(2).strip() if match.group(2) else None

            # If there's a semester grab the data.
            if semester_name:
            # Get the semester data for the specific course
                semester_data = teacher_data['semester_data'].get(course_name, {}).get(semester_name, {})

                if semester_data:
                    weeks_taught = semester_data.get("weeks_taught", 0)
                    hours_per_week = semester_data.get("hours_per_week", 0)
                    total_hours = weeks_taught * hours_per_week
                    return f"In the {semester_name} semester, {teacher_data['name']} taught {course_name} for {total_hours} hours."
                else:
                    return f"No data available for {course_name} in the {semester_name} semester."
            else:
                #If there's no semester, calculate the total hours taught from available semesters
                total_hours = 0
                course_semesters = teacher_data['semester_data'].get(course_name, {}) # Get all the semesters for the course
                print(f"[DEBUG] semesters: {course_semesters}")

                for semester_name, semester_data in course_semesters.items():
                    print(f"[DEBUG] Semester Name: {semester_name}, Semester Data: {semester_data}")
                    weeks_taught = semester_data.get("weeks_taught", 0)
                    hours_per_week = semester_data.get("hours_per_week", 0)
                    total_hours += weeks_taught * hours_per_week

                if total_hours > 0:
                    return f"{teacher_data['name']} taught {course_name} for a total of {total_hours} hours across all semesters."
                else:
                    return f"No data available for {course_name}."
        else:
            # Use the LLM as a fallback
            try:
                response = model.generate_content(f"Answer the following question about Jane Doe. {prompt}")
                return response.text
            except Exception as e:
                return f"Could not answer from internal data or using the LLM.  Error: {e}"

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