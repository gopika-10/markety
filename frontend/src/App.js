import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const darkTheme = {
  background: "#121212",
  text: "#eee",
  cardBg: "#1e1e1e",
  buttonBg: "#333",
  inputBg: "#222",
};
const lightTheme = {
  background: "#fff",
  text: "#222",
  cardBg: "#f9f9f9",
  buttonBg: "#ddd",
  inputBg: "#fff",
};

function App() {
  const [ticker, setTicker] = useState("");
  const [momentum, setMomentum] = useState(null);
  const [news, setNews] = useState([]);
  const [llmOutput, setLlmOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async () => {
    if (!ticker) return;
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/api/stocks/");
      const allData = response.data;

      // Filter for current ticker
      const result = allData.find(
        (entry) => entry.ticker.toUpperCase() === ticker.toUpperCase()
      );

      if (!result) {
        alert("No data found for this ticker.");
        setMomentum(null);
        setNews([]);
        setLlmOutput(null);
        return;
      }

      // Format momentum for sparkline
      const formattedMomentum = {
        returns: [result.momentum_returns], // Replace with actual array if available
        score: result.momentum_score,
      };

      // Format news
      const formattedNews = [
        {
          title: result.news_title,
          description: result.news_description,
          url: result.news_url,
        },
      ];

      // Format LLM output
      const formattedLLM = {
        pulse: result.pulse,
        explanation: result.llm_explanation,
      };

      setMomentum(formattedMomentum);
      setNews(formattedNews);
      setLlmOutput(formattedLLM);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch market pulse data.");
    }

    setLoading(false);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: "100vh",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>📊 Market Pulse Microservice</h2>

      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Enter Ticker (e.g. AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          style={{
            padding: 8,
            width: "200px",
            marginRight: 10,
            backgroundColor: theme.inputBg,
            color: theme.text,
            border: `1px solid ${theme.text}`,
            borderRadius: 4,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!ticker || loading}
          style={{
            padding: "8px 12px",
            backgroundColor: theme.buttonBg,
            border: "none",
            borderRadius: 4,
            color: theme.text,
            cursor: !ticker || loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Get Pulse"}
        </button>
        <button
          onClick={() => setDarkMode((d) => !d)}
          style={{
            marginLeft: 12,
            padding: "8px 12px",
            backgroundColor: theme.buttonBg,
            border: "none",
            borderRadius: 4,
            color: theme.text,
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div
        style={{
          backgroundColor: theme.cardBg,
          padding: 16,
          borderRadius: 8,
          minHeight: 300,
          maxWidth: 600,
          boxShadow: darkMode
            ? "0 0 10px rgba(255,255,255,0.1)"
            : "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {!momentum && !loading && <p>Enter a ticker symbol and click "Get Pulse" to start.</p>}

        {momentum && (
          <>
            <h3>📈 Momentum Signal</h3>
            <p>Momentum Score: {momentum.score}</p>
            <p>Daily Returns: {momentum.returns.join(", ")}</p>

            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={momentum.returns.map((r, i) => ({ day: i + 1, return: r }))}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="return"
                  stroke={darkMode ? "#4ade80" : "#1f8e2d"}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {news.length > 0 && (
          <>
            <h3>📰 News Feed</h3>
            <ul>
              {news.map((n, i) => (
                <li key={i}>
                  <strong>{n.title}</strong>: {n.description}{" "}
                  {n.url && (
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#4a90e2" }}
                    >
                      [Read]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {llmOutput && (
          <div
            style={{
              marginTop: 20,
              padding: 10,
              border: `1px solid ${theme.text}`,
              borderRadius: 8,
              backgroundColor: darkMode ? "#272727" : "#f0f0f0",
            }}
          >
            <h3>🧠 LLM Decision</h3>
            <p>
              <strong>Pulse:</strong> {llmOutput.pulse}
            </p>
            <p>
              <strong>Why:</strong> {llmOutput.explanation}
            </p>
          </div>
        )}

        {(momentum || news.length > 0 || llmOutput) && (
          <>
            <h4 style={{ marginTop: 30 }}>Raw JSON Output:</h4>
            <pre
              style={{
                backgroundColor: darkMode ? "#111" : "#eee",
                padding: 12,
                borderRadius: 6,
                overflowX: "auto",
                fontSize: 12,
                maxHeight: 200,
              }}
            >
              {JSON.stringify({ momentum, news, llmOutput }, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
