from datetime import datetime

# Teacher data with courses, weeks taught, and hours per session
teacher_data = {
    "name": "Jane Doe",
    "courses_taught": {
        "Math 101": {
            "semester_data": {
                "fall_2024": {
                    "weeks_taught": 12,  # Total weeks taught in Fall 2024
                    "hours_per_week": 6,  # 2 hours per day, 3 days per week
                    "days": ["Monday", "Wednesday", "Friday"]  # Taught on these days
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
    }
}

def get_hours_taught_this_week(course_name):
    current_week = datetime.now().isocalendar()[1]  # Get current week of the year

    week_data = teacher_data['courses_taught'].get(course_name)

    if week_data:
        semester_data = week_data.get('semester_data', {}).get('fall_2024', {})
        weeks_taught = semester_data.get('weeks_taught', 0)
        hours_per_week = semester_data.get('hours_per_week', 0)

        # Check if the course is being taught this week
        if current_week <= weeks_taught:
            return f"{hours_per_week} hours were taught this week in {course_name}."
        else:
            return "No data for this week."
    return "Course not found."


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
        return "[DEBUG] Sorry, I don't have enough information to answer that."

# Example usage 
if __name__ == "__main__":
    question = "How many hours were taught for Math 101 this week?"
    response = chatbot_response(question)
    print(response)