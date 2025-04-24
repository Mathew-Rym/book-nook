// FeaturedBookCard.jsx
import { useState } from 'react';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const FeaturedBookCard = ({
  book,
  isInReadingList,
  isInFavorites,
  addToReadingList,
  removeFromReadingList,
  addToFavorites,
  removeFromFavorites
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="book-card">
      <div className="book-cover">
        {book.coverId ? (
          <img 
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
            alt={`Cover of ${book.title}`}
          />
        ) : (
          <div className="no-cover">No cover available</div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author_name?.join(', ') || 'Unknown author'}</p>
        {book.first_publish_year && (
          <p className="book-year">Published: {book.first_publish_year}</p>
        )}
        {(book.description || book.first_sentence?.[0]) && (
          <div className="description-container">
            <div
              className={`book-description ${expanded ? 'expanded' : ''}`}
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(
                  book.description?.value || 
                  book.description || 
                  book.first_sentence?.[0] || 
                  ''
                ) 
              }}
            />
            <button 
              className="read-more-toggle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Read less ▲' : 'Read more ▾'}
            </button>
          </div>
        )}
        <div className="book-actions">
          <button 
            className={`favorite-button ${isInFavorites ? 'active' : ''}`}
            onClick={() => isInFavorites ? 
              removeFromFavorites(book.key) : 
              addToFavorites(book)}
          >
            {isInFavorites ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button 
            className={`bookmark-button ${isInReadingList ? 'active' : ''}`}
            onClick={() => isInReadingList ? 
              removeFromReadingList(book.key) : 
              addToReadingList(book)}
          >
            {isInReadingList ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBookCard;
