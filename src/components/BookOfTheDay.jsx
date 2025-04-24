import { useState, useEffect } from 'react';
import axios from 'axios';
import { useReadingList } from '../context/ReadingListContext';
import { useFavorites } from '../context/FavoritesContext';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaSync } from 'react-icons/fa';
import DOMPurify from 'dompurify';

export const BookOfTheDay = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { readingList, addToReadingList, removeFromReadingList } = useReadingList();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [expanded, setExpanded] = useState(false);

  const fetchBookOfTheDay = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First fetch a random book from popular subjects
      const subjectResponse = await axios.get(
        'https://openlibrary.org/subjects/fiction.json?limit=1&offset=' + Math.floor(Math.random() * 100)
      );
      
      if (subjectResponse.data.works && subjectResponse.data.works.length > 0) {
        const workKey = subjectResponse.data.works[0].key;
        
        // Then fetch complete book details
        const bookResponse = await axios.get(
          `https://openlibrary.org${workKey}.json`
        );
        
        const coverId = subjectResponse.data.works[0].cover_id;
        const bookData = {
          key: workKey,
          title: subjectResponse.data.works[0].title,
          author: subjectResponse.data.works[0].authors?.[0]?.name || 'Unknown author',
          coverId: coverId,
          firstPublishYear: subjectResponse.data.works[0].first_publish_year,
          description: bookResponse.data.description?.value || 
                      (typeof bookResponse.data.description === 'string' ? bookResponse.data.description : 
                      subjectResponse.data.works[0].first_sentence?.[0] || 'No description available')
        };
        
        setBook(bookData);
      } else {
        throw new Error('No books found in this subject');
      }
    } catch (err) {
      console.error('Error fetching book of the day:', err);
      setError('Failed to load the book of the day. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookOfTheDay();
  }, []);

  const isInReadingList = book && readingList.some(item => item.key === book.key);
  const isInFavorites = book && favorites.some(item => item.key === book.key);

  if (loading) return (
    <div className="book-of-the-day loading">
      <h2>Book of the Day</h2>
      <div className="skeleton-loader"></div>
    </div>
  );

  if (error) return (
    <div className="book-of-the-day error">
      <h2>Book of the Day</h2>
      <p>{error}</p>
      <button className="refresh-button" onClick={fetchBookOfTheDay}>
        <FaSync /> Try Again
      </button>
    </div>
  );

  if (!book) return (
    <div className="book-of-the-day">
      <h2>Book of the Day</h2>
      <p>No book available</p>
    </div>
  );

  return (
    <div className="book-of-the-day">
      <div className="botd-header">
        <h2>Book of the Day</h2>
        <button className="refresh-button" onClick={fetchBookOfTheDay}>
          <FaSync /> New Book
        </button>
      </div>
      <div className="botd-content">
        <div className="botd-cover">
          {book.coverId ? (
            <img 
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
              alt={`Cover of ${book.title}`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="no-cover">No cover available</div>
          )}
        </div>
        <div className="botd-info">
          <h3 className="botd-title">{book.title}</h3>
          <p className="botd-author">by {book.author}</p>
          {book.firstPublishYear && (
            <p className="botd-year">Published: {book.firstPublishYear}</p>
          )}
          <div className="description-container">
            <div
              className={`botd-description ${expanded ? 'expanded' : ''}`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.description) }}
            />
            <button 
              className="read-more-toggle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Read less ▲' : 'Read more ▾'}
            </button>
          </div>
          <div className="botd-actions">
            <button 
              className={`favorite-button ${isInFavorites ? 'active' : ''}`}
              onClick={() => isInFavorites ? removeFromFavorites(book.key) : addToFavorites(book)}
            >
              {isInFavorites ? <FaHeart /> : <FaRegHeart />}
              {isInFavorites ? ' Favorited' : ' Favorite'}
            </button>
            <button 
              className={`bookmark-button ${isInReadingList ? 'active' : ''}`}
              onClick={() => isInReadingList ? removeFromReadingList(book.key) : addToReadingList(book)}
            >
              {isInReadingList ? <FaBookmark /> : <FaRegBookmark />}
              {isInReadingList ? ' Saved' : ' Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};