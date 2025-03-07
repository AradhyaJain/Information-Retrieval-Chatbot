import React, { useState } from 'react';
import axios from 'axios';

function ChatWindow({ selectedTopics }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000', {
        input: userMessage,
        topics: selectedTopics
      });
      const { data, topic, analytics } = response.data;
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data, topic: topic }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', width: '600px' }}>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '20px', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            {msg.sender === 'user' ? (
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-block', background: '#d1ecf1', color: '#0c5460', padding: '10px', borderRadius: '5px' }}>
                  {msg.text}
                </span>
              </div>
            ) : (
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'inline-block', background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px' }}>
                  <strong>{msg.topic ? `[${msg.topic}] ` : ''}</strong>
                  {msg.text}
                </span>
              </div>
            )}
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="text"
          value={input}
          placeholder="Type your query..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
