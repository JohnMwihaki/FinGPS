import os
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / "config" / ".env")

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_financial_advice(user_data, transactions):
    """
    Generates personalized financial advice for a student in Kenya.
    Uses fallbacks if the specific model happens to be unavailable.
    """
     
    models_to_try = ['gemini-flash-lite-latest', 'gemini-1.5-flash', 'gemini-pro']
    
    prompt = f"""
    You are a professional Financial Advisor specialized in students and youth in Kenya.
    User Profile: {user_data.get('name')} at {user_data.get('university')}, studying {user_data.get('course')} (Year {user_data.get('year')}).
    Current Financials: Income KSh {user_data.get('total_income')}, Expenses KSh {user_data.get('total_expenses')}.
    Recent transactions: {transactions}
    
    TASK: Provide exactly 3 high-impact advice points.
    FORMAT rules:
    - Separate each point with a pipe symbol '|'.
    - DO NOT use markdown symbols like '**', '##', or '#'.
    - Use clean, professional text only.
    - Example: Tip One | Tip Two | Tip Three
    """
    
    if not os.getenv("GEMINI_API_KEY"):
        # Local Brain Fallback (Must match the new pipe format)
        income = user_data.get('total_income', 0)
        expenses = user_data.get('total_expenses', 0)
        balance = income - expenses
        tips = []
        if balance < 0:
            tips.append(f"Immediate Alert: Your expenses of KSh {expenses:,.0f} exceed your income. You are in a deficit.")
        else:
            tips.append(f"Good Standing: Your balance is healthy at KSh {balance:,.0f}.")
            
        if expenses > (income * 0.7):
            tips.append("Saving Priority: You are spending over 70% of your allowance. Consider cutting non-essentials.")
        else:
            tips.append("Goal Growth: You have room to increase your savings goal contributions this week.")
            
        tips.append("Trend Insight: Check your 'Others' category for hidden subscription leaks.")
        return " | ".join(tips)

    last_error = ""
    for model_name in models_to_try:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            # Remove any stray markdown
            clean_text = response.text.replace("*", "").replace("#", "").strip()
            return clean_text
        except Exception as e:
            last_error = str(e)
            continue
            
    # Heuristic fallback if AI fails (Must match the pipe format)
    return "Analyzing your trends... | Your balance is updated. | Start saving for your top goal today."

from decimal import Decimal
from datetime import timedelta

def get_financial_score_breakdown(metrics):
    """
    Calculates a score from 0-100 based on the provided metrics.
    - Wealth Ratio (40%): (Income - Expenses) / Income
    - Saving Consistency (30%): (Current Savings / Target Savings)
    - Budget Discipline (30%): (1 - Expenses Over Budget / Total Budget)
    """
    savings_ratio = float(metrics.get('savings_ratio', 0))
    budget_discipline = float(metrics.get('budget_discipline', 0))
    wealth_ratio = float(metrics.get('wealth_ratio', 0))
    
    score = (wealth_ratio * 40) + (savings_ratio * 30) + (budget_discipline * 30)
    return round(min(max(score, 0), 100), 1)

def forecast_expenses(daily_avg, days=30):
    """
    Predicts future expenses based on daily averages of the last 30 days.
    """
    prediction = daily_avg * days
    return round(float(prediction), 2)
