
const BookCard = ({ book, onViewDetails }) => {
    return (
      <div className="bg-white dark:bg-gray-700 rounded shadow p-4">
        <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded" />
        <p className="text-sm text-gray-500 dark:text-gray-300">{book.genre}</p>
        <h2 className="text-xl font-bold">{book.title}</h2>
        <p className="text-md">{book.author}</p>
        <button
          onClick={() => onViewDetails(book)}
          className="mt-2 bg-black text-white px-4 py-2 rounded"
        >
          Details
        </button>
      </div>
    );
  };
  
  export default BookCard;
  