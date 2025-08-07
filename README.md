📈 Market Pulse – AI-Powered Stock Analysis


A full-stack AI-driven stock analysis web app using React and Django. Enter a stock ticker to fetch real-time price momentum and news, and get a summarized “pulse” (bullish / neutral / bearish) with a concise LLM-generated explanation.

🚀 Features
💡 Enter a stock ticker to get momentum + news-based AI analysis.

🧠 Uses an LLM (e.g. Gemini) to generate the stock’s "pulse" and a natural language summary.

📈 Sparkline chart shows recent 5-day momentum visually.

🌐 Backend API built with Django & Django REST Framework.

💬 Chat-style React UI with JSON preview and styled summary card.

🎨 Clean and responsive frontend with React.

🛠 Tech Stack
Frontend:

React

Axios

Chart.js / Recharts

(Optional: Tailwind CSS)

Backend:

Django

Django REST Framework

SQLite (for local dev) / PostgreSQL (optional)

External APIs: Alpha Vantage (price), NewsAPI (news)

Gemini / other LLM APIs (for explanation generation)

Design and Trade-offs:
1. Frontend (ReactJS):
ReactJS was chosen for its component-based architecture and efficient rendering. It enables fast development of interactive UIs.
Trade-off: React doesn’t include built-in state management or routing, so we had to integrate other tools manually.

2. Backend (Django REST Framework):
DRF was selected for its robust and scalable REST API support, and integration with Django’s ORM.
Trade-off: Slightly heavier and more configuration than lightweight frameworks like Flask.

3. Database (SQLite):
SQLite was used for simplicity during development, with easy setup and zero configuration.
Trade-off: Not ideal for concurrent writes or large-scale production applications.

4. API Integration:
Simple REST endpoints allow frontend to fetch or update event data via Axios.
Trade-off: Need to handle CORS and ensure proper data validation between systems.

5. User Experience:
Used Tailwind CSS for quick and responsive UI development with minimal custom CSS.
Trade-off: Requires initial learning of utility-first class system.

6. Authentication (Optional):
Custom user auth not yet implemented to keep MVP simple.
Trade-off: No login restricts personalization and data security for users.

7. Hosting & Deployment:
Currently running locally. Future deployment planned using Render or Vercel.
Trade-off: Local setup is fast for development but lacks real-world reliability testing.
