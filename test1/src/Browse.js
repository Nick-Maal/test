import React, { useState } from 'react';
import './Browse.css';

function Browse() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [filterGenres, setFilterGenres] = useState([]);
  const [filterPrices, setFilterPrices] = useState([]);
  const [commentFilter, setCommentFilter] = useState('newest');

  const [gameComments, setGameComments] = useState({
    1: [
      { id: 1, author: 'DutchVanDerLinde', content: 'Remember, honor amongst thieves!', date: '2024-06-25', rating: 5 },
      { id: 2, author: 'John Marston', content: 'This game is a masterpiece!', date: '2024-06-28', rating: 5 },
    ],
    2: [
      { id: 3, author: 'GeraltOfRivia', content: 'Gwent is the best mini-game ever!', date: '2024-07-01', rating: 4 },
      { id: 4, author: 'Yennefer', content: 'Agreed, Geralt. The storyline is amazing too!', date: '2024-07-02', rating: 5 },
    ],
    3: [
      { id: 5, author: 'IndieFanatic', content: 'Celeste is such a beautiful and challenging platformer!', date: '2024-06-20', rating: 4 },
    ],
    4: [
      { id: 6, author: 'VR Enthusiast', content: 'Half-Life: Alyx is a must-play for VR fans!', date: '2024-06-18', rating: 5 },
    ],
    5: [
      { id: 7, author: 'MentalHealthAdvocate', content: 'This game helped me through a tough time.', date: '2024-06-12', rating: 5 },
    ],
    6: [
      { id: 8, author: 'MobileGamer', content: 'Genshin Impact is stunning on my phone!', date: '2024-06-05', rating: 4 },
    ],
    7: [],
    8: [],
    9: [],
  });

  const [newComment, setNewComment] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(0);

  const games = [
    {
      id: 1,
      title: 'Red Dead Redemption 2',
      genre: 'Action-Adventure',
      price: '$39.99',
      rating: 4.8,
      image: 'rdr2.jpeg',
      description: 'America, 1899. The end of the wild west era has begun. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.',
    },
    {
      id: 2,
      title: 'The Witcher 3: Wild Hunt',
      genre: 'Action RPG',
      price: '$24.99',
      rating: 4.9,
      image: 'witcher3.jpeg',
      description: 'The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as Geralt of Rivia, a monster hunter tasked with finding a child from an ancient prophecy. You’ll journey through war-torn kingdoms and slay legendary creatures, explore towns rife with political intrigue, and interact with a diverse cast of characters.',
    },
    {
      id: 3,
      title: 'Celeste',
      genre: 'Platformer',
      price: '$19.99',
      rating: 4.7,
      image: 'celeste.jpeg',
      description: 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain, in this super-tight platformer from the creators of TowerFall. Brave hundreds of hand-crafted challenges, uncover devious secrets, and piece together the mystery of the mountain.',
    },
    {
      id: 5,
      title: 'Stardew Valley',
      genre: 'Simulation RPG',
      price: '$14.99',
      rating: 4.6,
      image: 'stardew_valley.jpeg',
      description: 'Stardew Valley is an open-ended country-life RPG! You’ve inherited your grandfather’s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? It won’t be easy. Ever since Joja Corporation came to town, the old ways of life have all but disappeared. The community center, once the town’s most vibrant hub of activity, now lies in shambles.',
    },
    // Add more game data here... (up to 9 games)
  ];

  const openGameDetails = (game) => {
    setSelectedGame(game);
  };

  const closeGameDetails = () => {
    setSelectedGame(null);
  };

  const toggleGenreFilter = (genre) => {
    setFilterGenres((prevFilters) =>
      prevFilters.includes(genre)
        ? prevFilters.filter((g) => g !== genre)
        : [...prevFilters, genre]
    );
  };

  const togglePriceFilter = (price) => {
    setFilterPrices((prevFilters) =>
      prevFilters.includes(price)
        ? prevFilters.filter((p) => p !== price)
        : [...prevFilters, price]
    );
  };

  const filteredGames = games.filter((game) => {
    const genreMatch = filterGenres.length === 0 || filterGenres.includes(game.genre);
    const priceMatch = filterPrices.length === 0 || filterPrices.includes(game.price);
    return genreMatch && priceMatch;
  });

  const sortedComments = (gameId) => {
    const comments = gameComments[gameId] || [];
    if (commentFilter === 'newest') {
      return comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (commentFilter === 'oldest') {
      return comments.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return comments;
  };

  const handleCommentSubmit = (gameId) => {
    if (newComment && newCommentAuthor && newCommentRating) {
      const updatedComments = [
        ...gameComments[gameId],
        {
          id: gameComments[gameId].length + 1,
          author: newCommentAuthor,
          content: newComment,
          date: new Date().toISOString().split('T')[0],
          rating: newCommentRating,
        },
      ];
      setGameComments({ ...gameComments, [gameId]: updatedComments });
      setNewComment('');
      setNewCommentAuthor('');
      setNewCommentRating(0);
    }
  };

  return (
    <main className="browse-page">
      <div className="filters">
        <h2>Filters</h2>
        <div className="filter-group">
          <h3>Genre</h3>
          {['Action-Adventure', 'Action RPG', 'Platformer', 'FPS (VR)', 'Simulation RPG'].map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                id={`genre-${genre}`}
                value={genre}
                onChange={() => toggleGenreFilter(genre)}
                checked={filterGenres.includes(genre)}
              />
              <label htmlFor={`genre-${genre}`}>{genre}</label>
            </div>
          ))}
        </div>

        <div className="filter-group">
          <h3>Price</h3>
          {['$39.99', '$24.99', '$19.99', '$59.99', '$14.99', 'Free-to-Play'].map((price) => (
            <div key={price}>
              <input
                type="checkbox"
                id={`price-${price}`}
                value={price}
                onChange={() => togglePriceFilter(price)}
                checked={filterPrices.includes(price)}
              />
              <label htmlFor={`price-${price}`}>{price}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <div className="game-card" key={game.id} onClick={() => openGameDetails(game)}>
            <img src={require(`./images/${game.image}`).default} alt={game.title} />
            <h3>{game.title}</h3>
            <p>Rating: {game.rating} stars</p>
            <p>Price: {game.price}</p>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div className="game-details-container">
          <div className="game-details">
            <button className="close-details" onClick={closeGameDetails}>
              &times;
            </button>
            <h2>{selectedGame.title}</h2>
            <div className="scrollable-content">
              <p>{selectedGame.description}</p>
            </div>

            <h3>Comments</h3>
            <div className="comment-filter">
              <label>Filter by:</label>
              <select value={commentFilter} onChange={(e) => setCommentFilter(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="comments">
              {sortedComments(selectedGame.id).map((comment) => (
                <div className="comment" key={comment.id}>
                  <p>
                    <strong>{comment.author}</strong> - {comment.date}
                  </p>
                  <p>{comment.content}</p>
                  <p>Rating: {comment.rating} stars</p>
                </div>
              ))}
            </div>

            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit(selectedGame.id);
              }}
            >
              <label>Add a Comment:</label>
              <textarea
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Your comment..."
                required
              ></textarea>
              <input
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="Your name"
                required
              />
              <div className="rating">
                <label>Your Rating:</label>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <span
                      key={ratingValue}
                      className={ratingValue <= newCommentRating ? 'star filled' : 'star'}
                      onClick={() => setNewCommentRating(ratingValue)}
                    >
                      &#9733;
                    </span>
                  );
                })}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Browse;
