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

# Function to get hours taught this week
def get_hours_taught_this_week(course_name):
    current_week = datetime.now().isocalendar()[1]  # Get current week of the year
    fall_semester_weeks = 12  # Defined semester duration for Fall 2024

    course_data = teacher_data['courses_taught'].get(course_name)

    if course_data:
        semester_data = course_data.get('semester_data', {}).get('fall_2024', {})
        weeks_taught = semester_data.get('weeks_taught', 0)
        hours_per_week = semester_data.get('hours_per_week', 0)

        # Check if the current week falls within the teaching period
        if 1 <= current_week <= fall_semester_weeks:
            return f"{hours_per_week} hours were taught this week in {course_name}."
        else:
            return f"{course_name} is not being taught this week."
    
    return "Course not found."

# Function to handle chatbot response
def chatbot_response(prompt):
    prompt_lower = prompt.lower()

    if "math 101" in prompt_lower and "this week" in prompt_lower:
        return get_hours_taught_this_week("Math 101")
    elif "science 202" in prompt_lower and "this week" in prompt_lower:
        return get_hours_taught_this_week("Science 202")
    elif "history 303" in prompt_lower and "this week" in prompt_lower:
        return get_hours_taught_this_week("History 303")
    else:
        return "Sorry, I don't have enough information to answer that."

# Example usage
if __name__ == "__main__":
    question = "How many hours were taught this week in Math 101?"
    response = chatbot_response(question)
    print(response)