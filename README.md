# 📈 Market Pulse – AI-Powered Stock Analysis

AI-powered platform to analyze stock data, get real-time insights, and make informed decisions using LLMs and APIs.

---

## 🔧 Tech Stack

- **Frontend**: ReactJS (Next.js), TailwindCSS, ShadCN UI  
- **Backend**: Python (Django REST Framework)  
- **AI Integration**: Genkit + Gemini Pro  
- **External APIs**: Alpha Vantage, Financial News API

---

## 📁 Project Structure

📦 market-pulse/
├── frontend/ # React App
│ └── src/
│ ├── components/
│ ├── App.js
│ └── ...
├── backend/ # Django App
│ ├── stocks/ # App with Stock model & views
│ ├── stock_project/
│ └── manage.py
└── README.md


---

## 🚀 Features

- Real-time stock price visualization
- News sentiment analysis for selected stocks
- LLM-powered summary of current stock trends
- Interactive dashboard with search & filter
- Secure backend with Django REST APIs

---

## ✅ Functional Requirements

- Users can input stock symbols and get visualized data
- Users can view latest news and sentiment
- AI provides analysis based on stock trends
- Data fetched securely and updated dynamically

---

## 🧠 AI Usage

| Feature | Approach | Trade-offs |
|--------|----------|------------|
| Sentiment Analysis | Use Gemini Pro via Genkit to summarize and classify news as positive, negative, or neutral | **Pros**: Fast, contextual, scalable<br>**Cons**: May hallucinate, API limits |
| Trend Summary | Use GenAI for natural language trend insights | **Pros**: Human-like explanation<br>**Cons**: Not 100% accurate without strong prompt tuning |

---

## 📌 Trade-Offs Summary

- **GenAI for summarization**: Easy to integrate but may produce hallucinations.  
- **Alpha Vantage API**: Free tier is limited – suitable for prototypes, not high-frequency use.  
- **Frontend in React**: Fast dev with ShadCN + Tailwind, but might over-render without memoization.  
- **Django REST**: Robust and secure, but slightly heavier than Flask for simple APIs.

---

## 🖥️ Tech Stack

### Backend (Django) and Frontend
```bash
###Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

###Frontend
cd frontend
npm install
npm start



🚀 Future Scope / Next Steps
Add User Accounts for saving preferences and analysis history.

Add Charts using libraries like Chart.js or Recharts for better visualizations.

Use Redis/Memcached for caching repeated API responses.

Add CI/CD & Deployment on platforms like Render, Vercel, or Railway.

Use Celery for background tasks like scheduled analysis or email reports.

Improve Security using OAuth or API key rate limits.

Add more robust logging and monitoring for backend services.
