## GasMan
## Jan. 12,2025


import google.generativeai as genai
import streamlit as st

import os
import google.generativeai as genai
import streamlit as st


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-pro")


teacher_data = {
    "name": "Jane Doe",
    "hours_taught": 120,
    "courses_taught": ["Math 101", "Science 202", "History 303"],
    "papers_graded": 200,
    "semester_data": {
        "Math 101": {
            "fall_2024": {
                "weeks_taught": 12,  # Number of weeks the course is taught
                "hours_per_week": 2  # Number of hours per week for Math 101
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


def chatbot_response(prompt):
    try:
        # Check if the prompt asks about hours for a specific course and semester
        if "hours taught in Math 101 in the fall semester" in prompt.lower():
            # Retrieve semester-specific data for Math 101 in Fall 2024
            fall_data = teacher_data['semester_data'].get("Math 101", {}).get("fall_2024", {})
            
            if fall_data:
                weeks_taught = fall_data.get("weeks_taught", 0)
                hours_per_week = fall_data.get("hours_per_week", 0)
                total_hours = weeks_taught * hours_per_week
                return f"In the Fall semester of 2024, {teacher_data['name']} taught Math 101 for {total_hours} hours."
            else:
                return "No data available for Math 101 in the Fall semester."

        # General case for any other course
        elif "hours taught in" in prompt.lower():
            course_name = prompt.split("in")[1].strip().split("semester")[0].strip()
            semester_name = prompt.split("semester")[-1].strip()
            
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
            return "The provided data does not contain the specific information you're asking for."

    except Exception as e:
        return f"Error: {e}"


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