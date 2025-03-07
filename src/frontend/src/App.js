import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Analytics from './components/Analytics';

function App() {
  const [topics, setTopics] = useState([
    "Health", "Environment", "Technology", "Economy",
    "Entertainment", "Sports", "Politics", "Education",
    "Travel", "Food"
  ]);

  const [selectedTopics, setSelectedTopics] = useState([]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Information Retrieval Chatbot</h1>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Filter Topics: </label>
        <select multiple={true} 
                style={{ width: '200px', height: '100px' }} 
                value={selectedTopics}
                onChange={(e) => {
                  const options = e.target.options;
                  const selected = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) selected.push(options[i].value);
                  }
                  setSelectedTopics(selected);
                }}>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <ChatWindow selectedTopics={selectedTopics} />
      <Analytics />
    </div>
  );
}

export default App;
