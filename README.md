Book Nook - Book Search Application

![BookNook Screenshot](./public/screenshot.png) <!-- Add a screenshot later -->

A React-based book search application that allows users to discover books, save favorites, and maintain a reading list using the Open Library API.

## Features

- Book Search: Find books by title, author, or subject
- Book of the Day: Daily featured book with refresh option
- Reading List: Save books you want to read later
- Favorites: Mark your favorite books for quick access
- Dark Mode: Toggle between light and dark themes
- Responsive Design: Works on all device sizes
- Book Details: View author, publication year, and descriptions

## Technologies Used

- React (Vite)
- React Router
- Context API (State Management)
- Axios (API Requests)
- Open Library API
- React Icons
- DOMPurify (Secure HTML rendering)
- CSS Modules

Project Structure
book-nook/
├── public/
├── src/
│   ├── components/
│   │   ├── BookCard/
│   │   ├── BookOfTheDay/
│   │   ├── Header/
│   │   ├── SearchBar/
│   │   └── ThemeToggle/
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   │   ├── ReadingListContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── Home/
│   │   ├── ReadingList/
│   │   └── Favorites/
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

API Usage
This project uses the Open Library API for:
Book searches (/search.json)
Book details (/works/{id}.json)
Book covers (/b/id/{cover_id}-L.jpg)

Getting Started
1. Clone the Project

```bash
git clone https://github.com/Mathew-Rym/book-nook.git
cd book-nook
npm install
npm run dev
npm run build
npm run preview

