import { createContext, useContext, useState, useEffect } from 'react';

const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
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

  const addToReadingList = (book) => {
    setReadingList(prev => {
      // Check if book already exists
      const exists = prev.some(item => item.key === book.key);
      if (exists) return prev;
      return [...prev, book];
    });
  };

  const removeFromReadingList = (bookKey) => {
    setReadingList(prev => prev.filter(book => book.key !== bookKey));
  };

  return (
    <ReadingListContext.Provider value={{ readingList, addToReadingList, removeFromReadingList }}>
      {children}
    </ReadingListContext.Provider>
  );
};

export const useReadingList = () => useContext(ReadingListContext);