import os
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv
import json
import re

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / "config" / ".env")

# Use a consistent model for all AI tasks
DEFAULT_MODEL = 'gemini-flash-lite-latest'
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_financial_advice(user_data, transactions):
    """
    Generates personalized financial advice for a student in Kenya.
    """
    prompt = f"""
    You are a professional Financial Advisor specialized in students and youth in Kenya.
    User Profile: {user_data.get('name')} at {user_data.get('university')}, studying {user_data.get('course')} (Year {user_data.get('year')}).
    Current Financials: Income KSh {user_data.get('total_income')}, Expenses KSh {user_data.get('total_expenses')}.
    Recent transactions: {transactions}
    
    TASK: Provide exactly 3 high-impact advice points based on their spending. 
    Be specific (e.g., if they spend on 'Food', suggest cheap campus alternatives).
    FORMAT rules:
    - Separate each point with a pipe symbol '|'.
    - DO NOT use markdown symbols like '**', '##', or '#'.
    - Use clean, professional text only.
    - Example: Tip One | Tip Two | Tip Three
    """
    
    try:
        model = genai.GenerativeModel(DEFAULT_MODEL)
        response = model.generate_content(prompt)
        return response.text.replace("*", "").replace("#", "").strip()
    except Exception as e:
        print(f"AI Advice Error: {e}")
        return "Budget wisely this week. | Track your small expenses. | Save for your top goal."

def parse_financial_text(raw_text):
    """
    Parses raw text (SMS, Statement snippet, etc.) into structured transaction data.
    Returns a list of dictionaries.
    """
    prompt = f"""
    You are a professional financial data extractor specialized in Kenya (M-Pesa, Bank, Equitel). 
    I will provide you with raw text. 
    
    RAW TEXT:
    {raw_text}
    
    TASK: Extract all transactions found in the text.
    For each transaction, determine:
    1. Type: 'INCOME' or 'EXPENSE'
    2. Amount: Numeric value only (e.g. 500)
    3. Category: Choose EXACTLY one from this list:
       [Food & Dining, Transport, Academic / Tuition, Rent & Utilities, Wifi & Data Bundles, Personal Care & Health, Shopping & Clothing, M-Pesa & Bank Charges, Entertainment, Savings Deposit, Income / Allowance, Others]
    4. Description: A short summary (e.g. "Sent to John", "Salary", "M-Pesa Fee")
    5. Date: YYYY-MM-DD format. If no date is found, use today's date placeholder 'TODAY'.
    
    STRICT RULES:
    - If a transaction is an M-Pesa fee or bank charge, use 'M-Pesa & Bank Charges'.
    - If it's for 'Data', 'Bundles', or 'Wifi', use 'Wifi & Data Bundles'.
    - If it's for food, drinks, or restaurants, use 'Food & Dining'.
    - If it doesn't clearly fit others, use 'Others'.
    
    FORMAT: Output ONLY a valid JSON array of objects. 
    Example: [{{"type": "EXPENSE", "amount": 150, "category": "Food & Dining", "description": "Lunch", "date": "2024-03-31"}}]
    """
    
    try:
        model = genai.GenerativeModel(DEFAULT_MODEL)
        response = model.generate_content(prompt)
        
        # Improved JSON extraction to handle markdown or extra text
        content = response.text.strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
            
        json_str = re.search(r'\[.*\]', content, re.DOTALL)
        if json_str:
            return json.loads(json_str.group())
        return []
    except Exception as e:
        print(f"AI Parsing Error: {e}")
        return []

from decimal import Decimal
from datetime import timedelta

def get_financial_score_breakdown(metrics):
    wealth_ratio = float(metrics.get('wealth_ratio', 0))
    savings_ratio = float(metrics.get('savings_ratio', 0))
    budget_discipline = float(metrics.get('budget_discipline', 0))
    
    score = (wealth_ratio * 40) + (savings_ratio * 30) + (budget_discipline * 30)
    return round(min(max(score, 0), 100), 1)

def forecast_expenses(daily_avg, days=30):
    return round(float(daily_avg * days), 2)
