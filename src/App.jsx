import { useEffect, useState } from "react"
import { books as initialBooks, genres } from "./data/books"
import { emit } from "@/lib/eventBus"

import Header from "./components/Header"
import FilterBar from "./components/FilterBar"
import BookGrid from "./components/BookGrid"
import LoanPanel from "./components/LoanPanel"
import ReservationForm from "./components/ReservationForm"
import ActivityPanel from "./components/ActivityPanel"
import Footer from "./components/Footer"

function App() {
  const [books, setBooks] = useState(initialBooks)
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("Todos")
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    let timeoutId

    Promise.resolve().then(() => {
      timeoutId = setTimeout(() => {
        setLoading(false)
        setMessage("Catálogo carregado.")
      }, 1000)
    })

    return () => clearTimeout(timeoutId)
  }, [])

  function handleBorrow(id) {
    const book = books.find((item) => item.id === id)

    if (!book || !book.available || borrowedBooks.includes(id)) {
      return
    }

    setBorrowedBooks((prev) => [...prev, id])

    setBooks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: false } : item
      )
    )

    emit("borrow", { title: book.title })
  }

  function handleReturn(id) {
    const book = books.find((item) => item.id === id)

    if (!book || !borrowedBooks.includes(id)) {
      return
    }

    setBorrowedBooks((prev) =>
      prev.filter((bookId) => bookId !== id)
    )

    setBooks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: true } : item
      )
    )

    emit("return", { title: book.title })
  }

  const filteredBooks =
    selectedGenre === "Todos"
      ? books
      : books.filter((book) => book.genre === selectedGenre)

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          loanCount={borrowedBooks.length}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        />

        <main className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6">
          {loading ? (
            <p>Carregando catálogo...</p>
          ) : (
            <p>{message}</p>
          )}

          <FilterBar
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />

          <BookGrid
            books={filteredBooks}
            borrowedBooks={borrowedBooks}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />

          <LoanPanel
            books={books}
            borrowedBooks={borrowedBooks}
          />

          <ReservationForm />

          <ActivityPanel />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App