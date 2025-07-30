import { useState } from "react";
import "./ChatWindow.css"; // ✅ Import our plain CSS file

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "SIA", text: "Hi! I’m SIA 👋 How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [breathing, setBreathing] = useState(false);

  // ✅ Simple fake responses
  const getSiaReply = (userText) => {
    if (userText.toLowerCase().includes("sad")) {
      return "I'm here for you 💙. Want to try a 1-minute breathing exercise?";
    } else if (userText.toLowerCase().includes("happy")) {
      return "Yay! 🎉 What’s making you feel so good today?";
    } else if (userText.toLowerCase().includes("stressed")) {
      return "It's okay to feel stressed. Can I suggest a short journaling prompt?";
    } else {
      return "I hear you. Tell me more…";
    }
  };

  const handleSend = () => {
    if (!input) return;

    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    const reply = getSiaReply(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "SIA", text: reply }]);
    }, 800);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>💬 Chat with SIA</h2>

      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === "SIA" ? "sia-bubble" : "user-bubble"
            }`}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>

      {/* Breathing Button */}
      <div className="breathing-section">
        <button onClick={() => setBreathing(!breathing)}>
          🌿 {breathing ? "Stop Breathing" : "Start Breathing"}
        </button>

        {breathing && <div className="breathing-circle"></div>}
      </div>
    </div>
  );
}

export default ChatWindow;
