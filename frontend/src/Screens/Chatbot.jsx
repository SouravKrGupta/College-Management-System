import React, { useState, useEffect } from 'react';
import axiosWrapper from '../utils/AxiosWrapper';



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userType, setUserType] = useState(localStorage.getItem('userType')?.toLowerCase() || 'student');
  const [isListening, setIsListening] = useState(false);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    setIsListening(false);
  };

  recognition.onerror = () => {
    setIsListening(false);
  };

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to messages array
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axiosWrapper.post('/chatbot/chat', { message: input, userType }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const aiReply = response.data.reply;
      setMessages(prevMessages => [...prevMessages, { text: aiReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMsg = error.response?.data?.error || 'Error: Unable to get response from the bot.';
      setMessages(prevMessages => [...prevMessages, { text: errorMsg, sender: 'bot' }]);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat
    const chatArea = document.getElementById('chat-area');
    chatArea.scrollTop = chatArea.scrollHeight;
  }, [messages]);

  return (
    <div>
  
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">AI Assistant</h1>
          <div id="chat-area" className="h-96 overflow-y-auto border p-4 mb-4 bg-gray-50">
            {messages.length === 0 && <p className="text-gray-500">Ask me anything about the college!</p>}
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 border rounded-lg"
              placeholder="Type your message..."
            />
            <button onClick={handleSend} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Send
            </button>
            <button onClick={startListening} disabled={isListening} className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50">
              {isListening ? 'Listening...' : '🎤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;