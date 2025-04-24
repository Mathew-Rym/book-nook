Book Nook

A simple and elegant React app for browsing books, featuring search, filter, "Book of the Day", and a dark mode toggle. Built with Tailwind CSS and React Router.


Tech Stack

- React (with Vite)
- Tailwind CSS for styling
- React Router DOM for page routing
- open library JSON data for book listings
- Dark Mode using Tailwind and local state

Folder Structure
book-nook/ ├── public/ │ └── favicon.svg ├── src/ │ ├── assets/ │ ├── components/ │ │ ├── Header.jsx │ │ ├── BookCard.jsx │ │ ├── BookOfTheDay.jsx │ │ └── ThemeToggle.jsx │ ├── data/ │ │ └── books.json │ ├── pages/ │ │ ├── Home.jsx │ │ └── BookDetails.jsx │ ├── App.jsx │ ├── main.jsx │ └── index.css ├── tailwind.config.js ├── postcss.config.js ├── package.json └── README.md

Getting Started
1. Clone the Project

```bash
git clone https://github.com/Mathew-Rym/book-nook.git
cd book-nook
npm install
npm run dev
npm run build
npm run preview

