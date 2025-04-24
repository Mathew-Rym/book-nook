import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ReadingListProvider } from './context/ReadingListContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ReadingList } from './pages/ReadingList';
import { Favorites } from './pages/Favorites'; // Add this import
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ReadingListProvider>
          <FavoritesProvider>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/reading-list" element={<ReadingList />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </main>
            </div>
          </FavoritesProvider>
        </ReadingListProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;