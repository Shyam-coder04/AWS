import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { sender: "bot", text: "Hello 👋 How can I help you today?" }
  ]);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat(prev => [...prev, userMsg]);

    // Fake bot typing
    const typingMsg = { sender: "bot", text: "Typing..." };
    setChat(prev => [...prev, userMsg, typingMsg]);

    setMessage("");

    // Simulate API delay
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: "This is a sample AI response 🤖 (connect backend later)"
      };

      setChat(prev => [
        ...prev.filter(msg => msg.text !== "Typing..."),
        botReply
      ]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h2>AI Chatbot</h2>

        <div className="chat-box">
          {chat.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;