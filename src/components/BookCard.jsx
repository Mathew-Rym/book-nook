import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useReadingList } from '../context/ReadingListContext';
import { useFavorites } from '../context/FavoritesContext';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import DOMPurify from 'dompurify';

export const BookCard = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const descriptionRef = useRef(null);
  const { readingList, addToReadingList, removeFromReadingList } = useReadingList();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isInReadingList = readingList.some(item => item.key === book.key);
  const isInFavorites = favorites.some(item => item.key === book.key);

  return (
    <div className="book-card">
      <div className="book-cover">
        {book.coverId ? (
          <img 
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
            alt={`Cover of ${book.title}`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : (
          <div className="no-cover">
            <span>{book.title}</span>
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author || 'Unknown author'}</p>
        {book.firstPublishYear && (
          <p className="book-year">Published: {book.firstPublishYear}</p>
        )}
        {book.description && (
          <div className="description-container">
            <div
              ref={descriptionRef}
              className={`book-description ${expanded ? 'expanded' : ''}`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.description) }}
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
            onClick={() => isInFavorites ? removeFromFavorites(book.key) : addToFavorites(book)}
          >
            {isInFavorites ? <FaHeart /> : <FaRegHeart />}
            <span>{isInFavorites ? ' Favorited' : ' Favorite'}</span>
          </button>
          <button 
            className={`bookmark-button ${isInReadingList ? 'active' : ''}`}
            onClick={() => isInReadingList ? removeFromReadingList(book.key) : addToReadingList(book)}
          >
            {isInReadingList ? <FaBookmark /> : <FaRegBookmark />}
            <span>{isInReadingList ? ' Saved' : ' Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
