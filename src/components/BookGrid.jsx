import BookCard from "./BookCard"

function BookGrid({ books, borrowedBooks, onBorrow, onReturn }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isBorrowed={borrowedBooks.includes(book.id)}
          onBorrow={onBorrow}
          onReturn={onReturn}
        />
      ))}
    </div>
  )
}

export default BookGrid