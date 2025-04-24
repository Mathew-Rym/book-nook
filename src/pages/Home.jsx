import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useBookSearch } from '../hooks/useBookSearch';
import { BookOfTheDay } from '../components/BookOfTheDay';
import { FeaturedBooks } from '../components/FeaturedBookCard';
import { SearchBar } from '../components/SearchBar';
import { BookCard } from '../components/BookCard';

export const Home = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { loading, error, books, hasMore } = useBookSearch(query, page);
  const observer = useRef();

  const lastBookElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className="home">
      <BookOfTheDay />
      <FeaturedBooks />
      <SearchBar onSearch={handleSearch} />
      
      <div className="books-grid">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={book.key}>
                <BookCard book={book} />
              </div>
            );
          } else {
            return <BookCard key={book.key} book={book} />;
          }
        })}
      </div>
      
      {loading && <div className="loading">Loading more books...</div>}
      {error && <div className="error">Error loading books</div>}
      {!loading && !error && books.length === 0 && query && (
        <div className="no-results">No books found for "{query}"</div>
      )}
    </div>
  );
};
