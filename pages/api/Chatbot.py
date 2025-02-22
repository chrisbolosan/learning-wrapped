## GasMan
## Jan. 12,2025


from openai import OpenAI

client = OpenAI(api_key="your_openai_api_key_here")
import streamlit as st

# Set up OpenAI API key

# Simulated teacher data for demo purposes
teacher_data = {
    "name": "Jane Doe",
    "hours_taught": 120,
    "courses_taught": ["Math 101", "Science 202", "History 303"],
    "papers_graded": 200,
    "current_schedule": {
        "Monday": "Math 101 (9:00-11:00 AM)",
        "Wednesday": "Science 202 (10:00-12:00 PM)",
        "Friday": "History 303 (1:00-3:00 PM)"
    }
}

# Chatbot function to query OpenAI
def chatbot_response(prompt):
    try:
        response = client.chat.completions.create(model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant for managing teacher tasks."},
            {"role": "user", "content": prompt}
        ])
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}"

# Streamlit UI
st.set_page_config(page_title="Teacher Chatbot", layout="wide")

st.title("📚 Teacher Management Chatbot")
st.write("Ask the chatbot about your teaching stats, schedule, or anything related to your work!")

# Display Teacher Data Summary
st.sidebar.header("📊 Teacher Data Overview")
st.sidebar.write(f"**Name:** {teacher_data['name']}")
st.sidebar.write(f"**Hours Taught:** {teacher_data['hours_taught']} hours")
st.sidebar.write(f"**Courses Taught:** {', '.join(teacher_data['courses_taught'])}")
st.sidebar.write(f"**Papers Graded:** {teacher_data['papers_graded']}")

st.sidebar.subheader("📅 Weekly Schedule")
for day, schedule in teacher_data['current_schedule'].items():
    st.sidebar.write(f"**{day}:** {schedule}")

# Chat Interface
st.subheader("💬 Chat with the Assistant")
user_input = st.text_input("Enter your question:", placeholder="E.g., How many hours have I taught this week?")
submit_button = st.button("Send")

if submit_button and user_input:
    with st.spinner("Thinking..."):
        # Include teacher data in the prompt for context
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

# Feedback Section
st.subheader("🌟 Feedback")
feedback = st.text_area("Share your feedback about the chatbot!")
if st.button("Submit Feedback"):
    st.success("Thank you for your feedback!")