import { useReadingList } from '../context/ReadingListContext';
import { BookCard } from '../components/BookCard';

export const ReadingList = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  if (!readingList) {
    return (
      <div className="loading-message">
        Loading your reading list...
      </div>
    );
  }

  return (
    <div className="reading-list-page">
      <h1>My Reading List</h1>
      {readingList.length === 0 ? (
        <div className="empty-message">
          Your reading list is empty. Add some books!
        </div>
      ) : (
        <div className="books-grid">
          {readingList.map(book => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};