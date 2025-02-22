## GasMan
## Jan. 12,2025


import os
import google.generativeai as genai
import streamlit as st

# Configure Gemini API Key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

# Teacher data with semester-specific details
teacher_data = {
    "name": "Jane Doe",
    "courses_taught": {
        "Math 101": {"fall_2024": {"weeks_taught": 12, "hours_per_week": 6}},
        "Science 202": {"fall_2024": {"weeks_taught": 12, "hours_per_week": 6}},
        "History 303": {"fall_2024": {"weeks_taught": 12, "hours_per_week": 6}},
    },
    "current_schedule": {
        "Monday": "Math 101 (9:00-11:00 AM)",
        "Wednesday": "Science 202 (10:00-12:00 PM)",
        "Friday": "History 303 (1:00-3:00 PM)",
    }
}

def get_hours_taught(course_name, semester):
    """Calculate total hours taught for a given course and semester."""
    semester_data = teacher_data["courses_taught"].get(course_name, {}).get(semester, {})
    
    if semester_data:
        total_hours = semester_data["weeks_taught"] * semester_data["hours_per_week"]
        return f"In {semester}, {teacher_data['name']} taught {course_name} for {total_hours} hours."
    
    return f"No data available for {course_name} in {semester}."

def chatbot_response(prompt):
    """Process user queries and return appropriate responses."""
    prompt_lower = prompt.lower()

    if "hours taught" in prompt_lower:
        for course in teacher_data["courses_taught"]:
            if course.lower() in prompt_lower:
                semester = "fall_2024"  # Default semester assumption
                return get_hours_taught(course, semester)

    return "The provided data does not contain the specific information you're asking for."

# Streamlit UI
st.set_page_config(page_title="Teacher Chatbot", layout="wide")
st.title("📚 Teacher Management Chatbot")
st.write("Ask about your teaching schedule and course details!")

st.sidebar.header("📊 Teacher Overview")
st.sidebar.write(f"**Name:** {teacher_data['name']}")
st.sidebar.write("**Courses Taught:** " + ", ".join(teacher_data["courses_taught"].keys()))

st.sidebar.subheader("📅 Weekly Schedule")
for day, schedule in teacher_data["current_schedule"].items():
    st.sidebar.write(f"**{day}:** {schedule}")

st.subheader("💬 Chat with the Assistant")
user_input = st.text_input("Enter your question:", placeholder="E.g., How many hours have I taught this week?")
submit_button = st.button("Send")

if submit_button and user_input:
    with st.spinner("Thinking..."):
        response = chatbot_response(user_input)
        st.success("Response:")
        st.write(response)

st.subheader("🌟 Feedback")
feedback = st.text_area("Share your feedback about the chatbot!")
if st.button("Submit Feedback"):
    st.success("Thank you for your feedback!")