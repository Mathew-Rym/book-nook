// src/components/Header.jsx
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilter = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onFilter(genre);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl font-bold">📚 Book Nook</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="p-2 rounded text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      <select
        onChange={handleFilter}
        value={selectedGenre}
        className="p-2 text-black rounded"
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Self-help">Self-help</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Mystery">Mystery</option>
      </select>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
