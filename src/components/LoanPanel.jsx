import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function LoanPanel({ books, borrowedBooks }) {
  const loans = books.filter((book) =>
    borrowedBooks.includes(book.id)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus empréstimos</CardTitle>
      </CardHeader>

      <CardContent>
        {loans.length === 0 ? (
          <p>Nenhum livro emprestado.</p>
        ) : (
          <ul className="space-y-2">
            {loans.map((book) => (
              <li key={book.id}>
                {book.title} — {book.author}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default LoanPanel