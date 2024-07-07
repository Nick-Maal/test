import React, { useState } from 'react';
import './Articles.css';

function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleLikes, setArticleLikes] = useState({});
  const [articleComments, setArticleComments] = useState({
    1: [
      { name: 'GamerGirl123', comment: 'Amazing article! This game is a must-play.' },
      { name: null, comment: 'I disagree with some points, but overall, it was informative.' }
    ],
    2: [{ name: 'ProGamer', comment: 'eSports are definitely taking over!' }],
    3: [{ name: null, comment: 'Great list! I haven\'t heard of some of these.' }],
    4: [],
    5: [{ name: 'MentalHealthAdvocate', comment: 'Important topic, thanks for raising awareness.' }],
    6: [],
    7: [],
    8: [],
    9: [],
  });

  const [newComment, setNewComment] = useState('');
  const [newCommentName, setNewCommentName] = useState('');

  const articles = [
    { 
      id: 1, 
      title: 'New Game Release Shatters Records', 
      image: 'article1.jpg', 
      content: 'The highly anticipated game "Cyberpunk 2077" has finally been released, and it has already smashed sales records, exceeding all expectations. With its immersive open-world environment, captivating storyline, and stunning visuals, "Cyberpunk 2077" is poised to become a landmark title in the gaming industry.', 
      author: 'John Doe', 
      date: 'July 1, 2024' 
    },
    { id: 2, title: 'The Rise of eSports: A Global Phenomenon', image: 'article2.jpg', content: 'Competitive gaming, or eSports, has experienced explosive growth in recent years. Millions of viewers tune in to watch professional players compete in tournaments with massive prize pools. This article explores the factors behind the rise of eSports and its impact on the gaming landscape.', author: 'Jane Smith', date: 'June 28, 2024' },
    { id: 3, title: 'Top 10 Indie Games You Must Play', image: 'article3.jpg', content: 'The indie game scene is thriving, offering a wealth of creative and innovative experiences. This article highlights ten must-play indie titles that you might have missed, covering various genres and gameplay styles.', author: 'Alex Johnson', date: 'June 25, 2024' },
    { id: 4, title: 'Virtual Reality: The Future of Gaming?', image: 'article4.jpg', content: 'Virtual reality (VR) technology has the potential to revolutionize gaming, offering unparalleled immersion and interactivity. This article delves into the current state of VR gaming, its challenges, and its exciting possibilities for the future.', author: 'Emily Davis', date: 'June 20, 2024' },
    { id: 5, title: 'The Impact of Gaming on Mental Health', image: 'article5.jpg', content: 'Video games can have both positive and negative effects on mental health. This article examines the research on gaming and mental well-being, discussing its potential benefits for cognitive skills and social connection, as well as its risks for addiction and isolation.', author: 'Michael Brown', date: 'June 15, 2024' },
    { id: 6, title: 'Mobile Gaming: The Next Frontier', image: 'article6.jpg', content: 'Mobile gaming has become a dominant force in the industry, with millions of players enjoying games on their smartphones and tablets. This article explores the trends, innovations, and challenges in the world of mobile gaming.', author: 'Olivia Wilson', date: 'June 10, 2024' },
    { id: 7, title: 'The Evolution of Gaming Consoles', image: 'article7.jpg', content: 'From the early days of Atari to the latest PlayStation and Xbox consoles, gaming hardware has evolved dramatically. This article traces the history of gaming consoles, highlighting key innovations and their impact on the gaming experience.', author: 'Daniel Lee', date: 'June 5, 2024' },
    { id: 8, title: 'The Art of Game Design: An Interview', image: 'article8.jpg', content: 'In this exclusive interview, we sit down with a renowned game designer to discuss their creative process, inspirations, and insights into the world of game development.', author: 'Sophia Taylor', date: 'May 30, 2024' },
    { id: 9, title: 'Gaming Community Spotlight: Meet the Players', image: 'article9.jpg', content: 'Gaming is more than just playing; it\'s about connecting with others who share your passion. This article shines a spotlight on members of our vibrant gaming community, sharing their stories, experiences, and favorite games.', author: 'David Clark', date: 'May 25, 2024' },
  ];

  const openArticle = (article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const handleLike = (articleId) => {
    setArticleLikes(prevLikes => ({
      ...prevLikes,
      [articleId]: (prevLikes[articleId] || 0) + 1,
    }));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      const comment = {
        name: newCommentName.trim() !== '' ? newCommentName : null,
        comment: newComment
      };

      setArticleComments(prevComments => ({
        ...prevComments,
        [selectedArticle.id]: [...(prevComments[selectedArticle.id] || []), comment]
      }));

      setNewComment('');
      setNewCommentName('');
    }
  };

  return (
    <main className="articles-page">
      <h1>Articles</h1>
      <div className="article-grid">
        {articles.map(article => (
          <div className="article-card" key={article.id} onClick={() => openArticle(article)}>
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>

      {selectedArticle && ( // Only show the modal if an article is selected
        <div className="article-modal">
          <div className="article-modal-content">
            <button className="close-button" onClick={closeArticle}>&times;</button>
            <img src={selectedArticle.image} alt={selectedArticle.title} className="article-image" />
            <h2>{selectedArticle.title}</h2>
            <p className="article-details">By {selectedArticle.author} | {selectedArticle.date}</p>
            <p className="article-content">{selectedArticle.content}</p>

            {/* Like and Comment Section */}
            <div className="like-section">
              <button onClick={() => handleLike(selectedArticle.id)}>Like</button>
              <span>{articleLikes[selectedArticle.id] || 0} Likes</span>
            </div>
            <div className="comments-section">
              <h3>Comments</h3>
              <ul>
                {articleComments[selectedArticle.id].map((comment, index) => (
                  <li key={index}>
                    <b>{comment.name}:</b> {comment.comment}
                  </li>
                ))}
              </ul>

              {/* Comment form */}
              <div className="comment-form">
                <input 
                  type="text" 
                  placeholder="Your name (optional)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)} 
                />
                <textarea 
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Submit Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Articles;
