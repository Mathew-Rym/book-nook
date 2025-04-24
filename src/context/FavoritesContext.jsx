import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [readingList, setReadingList] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('readingList');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Add this useEffect to save to localStorage when readingList changes
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.key === book.key);
      if (exists) return prev;
      return [...prev, book];
    });
  };

  const removeFromFavorites = (bookKey) => {
    setFavorites(prev => prev.filter(book => book.key !== bookKey));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
