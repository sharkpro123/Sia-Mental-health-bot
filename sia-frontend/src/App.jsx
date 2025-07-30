import React, { useState } from "react";
import "./App.css"; // make sure your CSS is linked

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "sia", text: "Hi! I’m SIA 👋 How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simple reply (you can improve later with AI)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "sia", text: "I hear you. Tell me more…" },
      ]);
    }, 700);
  };

  const handleJournalPrompt = () => {
    const prompts = [
      "📝 What’s been on your mind lately?",
      "☁️ What’s something you want to let go of?",
      "🌟 What made you smile today?",
      "💡 What’s one thing you’re grateful for?"
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setMessages([...messages, { sender: "sia", text: randomPrompt }]);
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        {/* 🏷️ Title */}
        <h2 className="chat-header">💭 Chat with SIA</h2>

        {/* 💬 Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`bubble ${
                msg.sender === "sia" ? "sia-bubble" : "user-bubble"
              }`}
            >
              <strong>{msg.sender === "sia" ? "SIA: " : "You: "}</strong>
              {msg.text}
            </div>
          ))}
        </div>

        {/* ✍️ Input Area */}
        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>

        {/* ✨ Journal Prompt Button */}
        <button className="journal-btn" onClick={handleJournalPrompt}>
          ✨ Journal Prompt
        </button>
      </div>
    </div>
  );
}
