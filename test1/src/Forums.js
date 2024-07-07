import React, { useState } from 'react';
import './Forums.css';

function Forums() {
  const [selectedForum, setSelectedForum] = useState(null);
  const [creatingNewForum, setCreatingNewForum] = useState(false);
  const [forums, setForums] = useState([
    {
      id: 1,
      topic: 'Call of Duty Strategies and Tips',
      author: 'CaptainPrice',
      messages: [
        { name: 'SoapMacTavish', message: 'Anyone got any tips for mastering long-range sniping in Warzone?' },
        { name: 'Ghost', message: 'Try focusing on your positioning and using cover effectively.' },
      ],
    },
    {
      id: 2,
      topic: 'Best Gaming Setups for Under $1000',
      author: 'PCBuilder',
      messages: [
        { name: 'TechWizard', message: 'I recently built a great PC for under $800. Here are the specs...' },
      ],
    },
    // Add more forums here
  ]);

  const [newForumTopic, setNewForumTopic] = useState('');
  const [newForumAuthor, setNewForumAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newMessageName, setNewMessageName] = useState('');

  const openForum = (forum) => {
    setSelectedForum(forum);
    setCreatingNewForum(false);
  };

  const closeForum = () => {
    setSelectedForum(null);
    setCreatingNewForum(false); 
  };

  const openCreateForumModal = () => {
    setCreatingNewForum(true);
    setSelectedForum(null);
  };

  const handleCreateForum = () => {
    if (newForumTopic.trim() !== '' && newForumAuthor.trim() !== '') {
      const newForum = {
        id: forums.length + 1, 
        topic: newForumTopic,
        author: newForumAuthor,
        messages: [],
      };

      setForums([...forums, newForum]);
      setNewForumTopic('');
      setNewForumAuthor('');
      setCreatingNewForum(false);
    }
  };

  const handlePostMessage = () => {
    if (newMessage.trim() !== '' && selectedForum) {
      const message = {
        name: newMessageName.trim() !== '' ? newMessageName : 'Anonymous',
        message: newMessage,
      };

      setForums(prevForums =>
        prevForums.map(forum =>
          forum.id === selectedForum.id ? { ...forum, messages: [...forum.messages, message] } : forum
        )
      );
      setNewMessage('');
      setNewMessageName('');
    }
  };

  return (
    <main className="forums-page">
      <h1>Forums</h1>

      <button className="create-forum-btn" onClick={openCreateForumModal}>Create New Forum</button>

      <div className="forum-grid">
        {forums.map(forum => (
          <div className="forum-card" key={forum.id} onClick={() => openForum(forum)}>
            <h3>{forum.topic}</h3>
            <p className="forum-author">Started by: {forum.author}</p>
          </div>
        ))}
      </div>

      {creatingNewForum && ( 
        <div className="forum-modal">
          <div className="forum-modal-content">
            <button className="close-button" onClick={() => setCreatingNewForum(false)}>&times;</button>
            <h2>Create New Forum</h2>
            <div className="forum-form">
              <input 
                type="text" 
                placeholder="Forum Topic"
                value={newForumTopic}
                onChange={(e) => setNewForumTopic(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Your Name"
                value={newForumAuthor}
                onChange={(e) => setNewForumAuthor(e.target.value)} 
              />
              <button onClick={handleCreateForum}>Create Forum</button>
            </div>
          </div>
        </div>
      )}

      {selectedForum && (
        <div className="forum-modal">
          <div className="forum-modal-content">
            <button className="close-button" onClick={closeForum}>&times;</button>
            <h2>{selectedForum.topic}</h2>
            <p className="forum-author">Started by: {selectedForum.author}</p>
            <ul className="message-list">
              {selectedForum.messages.map((msg, index) => (
                <li key={index}>
                  <b>{msg.name}:</b> {msg.message}
                </li>
              ))}
            </ul>
            
            <div className="message-form">
              <input 
                type="text" 
                placeholder="Your Name (optional)"
                value={newMessageName}
                onChange={(e) => setNewMessageName(e.target.value)} 
              />
              <textarea 
                placeholder="Write your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handlePostMessage}>Post Message</button>
            </div>
          </div>
        </div>
      )}

      <button className="create-forum-btn" onClick={openCreateForumModal}>
        + Create New Forum
      </button>
    </main>
  );
}

export default Forums;
