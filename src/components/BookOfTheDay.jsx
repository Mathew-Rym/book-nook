// BookOfTheDay.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useReadingList } from '../context/ReadingListContext';
import { useFavorites } from '../context/FavoritesContext';
import { FaSync } from 'react-icons/fa';
import FeaturedBookCard from './FeaturedBookCard';

export const BookOfTheDay = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { readingList, addToReadingList, removeFromReadingList } = useReadingList();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://openlibrary.org/search.json?q=subject:fiction&limit=3'
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div className="loading">Loading featured books...</div>;

  return (
    <div className="books-container">
      <div className="section-header">
        <h2>Featured Books</h2>
        <button className="refresh-button" onClick={fetchBooks}>
          <FaSync /> Refresh
        </button>
      </div>
      <div className="books-grid">
        {books.map(book => {
          const isInReadingList = readingList.some(item => item.key === book.key);
          const isInFavorites = favorites.some(item => item.key === book.key);

          return (
            <FeaturedBookCard
              key={book.key}
              book={book}
              isInReadingList={isInReadingList}
              isInFavorites={isInFavorites}
              addToReadingList={addToReadingList}
              removeFromReadingList={removeFromReadingList}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          );
        })}
      </div>
    </div>
  );
};
