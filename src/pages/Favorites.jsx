import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { BookCard } from '../components/BookCard';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <h1>My Favorite Books</h1>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Click the heart icon on books you love!</p>
        </div>
      ) : (
        <div className="books-grid">
          {favorites.map(book => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
