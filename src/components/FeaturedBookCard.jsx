import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useReadingList } from '../context/ReadingListContext';
import { useFavorites } from '../context/FavoritesContext';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaSync } from 'react-icons/fa';
import DOMPurify from 'dompurify';

export const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { readingList, addToReadingList, removeFromReadingList } = useReadingList();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  // State for managing expanded description for each book
  const [expandedBooks, setExpandedBooks] = useState({});

  const fetchFeaturedBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = Math.floor(Math.random() * 100);

      const response = await axios.get(
        `https://openlibrary.org/subjects/fiction.json?limit=3&offset=${offset}`
      );

      const works = response.data.works || [];
      const booksData = await Promise.all(
        works.map(async (work) => {
          try {
            const workResponse = await axios.get(`https://openlibrary.org${work.key}.json`);
            return {
              key: work.key,
              title: work.title,
              author: work.authors?.[0]?.name || 'Unknown author',
              coverId: work.cover_id,
              firstPublishYear: work.first_publish_year,
              description: workResponse.data.description?.value ||
                (typeof workResponse.data.description === 'string'
                  ? workResponse.data.description
                  : work.first_sentence?.[0] || 'No description available')
            };
          } catch {
            return null;
          }
        })
      );

      setBooks(booksData.filter(Boolean));
    } catch (err) {
      console.error('Error fetching featured books:', err);
      setError('Failed to load featured books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  // Toggle the expanded state for a specific book's description
  const toggleDescription = (key) => {
    setExpandedBooks((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  if (loading) return <div className="featured-books loading">Loading featured books...</div>;
  if (error) return (
    <div className="featured-books error">
      <h2>Featured Books</h2>
      <p>{error}</p>
      <button className="refresh-button" onClick={fetchFeaturedBooks}>
        <FaSync /> Try Again
      </button>
    </div>
  );

  return (
    <div className="featured-books">
      <div className="section-header">
        <h2>Featured Books</h2>
        <button className="refresh-button" onClick={fetchFeaturedBooks}>
          <FaSync /> Refresh
        </button>
      </div>
      <div className="books-grid">
        {books.map((book) => {
          const isInReadingList = readingList.some((item) => item.key === book.key);
          const isInFavorites = favorites.some((item) => item.key === book.key);

          return (
            <div key={book.key} className="book-card">
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
                <p className="book-author">{book.author}</p>
                {book.firstPublishYear && (
                  <p className="book-year">Published: {book.firstPublishYear}</p>
                )}
                <div className="description-container">
                  <div
                    className={`book-description ${expandedBooks[book.key] ? 'expanded' : ''}`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(book.description)
                    }}
                  />
                  <button
                    className="read-more-toggle"
                    onClick={() => toggleDescription(book.key)}
                  >
                    {expandedBooks[book.key] ? 'Read less ▲' : 'Read more ▾'}
                  </button>
                </div>
                <div className="book-actions">
                  <button
                    className={`favorite-button ${isInFavorites ? 'active' : ''}`}
                    onClick={() =>
                      isInFavorites
                        ? removeFromFavorites(book.key)
                        : addToFavorites(book)
                    }
                  >
                    {isInFavorites ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button
                    className={`bookmark-button ${isInReadingList ? 'active' : ''}`}
                    onClick={() =>
                      isInReadingList
                        ? removeFromReadingList(book.key)
                        : addToReadingList(book)
                    }
                  >
                    {isInReadingList ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
