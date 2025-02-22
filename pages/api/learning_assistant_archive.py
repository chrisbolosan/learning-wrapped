from datetime import datetime
import google.generativeai as genai
import os

# Configure Google API
try:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY environment variable not set.")
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro') # Access the Gemini Pro model
except ValueError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Error initializing the Gemini model: {e}")

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