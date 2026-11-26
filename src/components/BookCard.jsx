import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function BookCard({ book, isBorrowed, onBorrow, onReturn }) {
  const unavailable = !book.available && !isBorrowed

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>Gênero: {book.genre}</p>
        <p>Páginas: {book.pages}</p>

        <p className="mt-2 font-medium">
          {isBorrowed
            ? "Emprestado por você"
            : book.available
              ? "Disponível"
              : "Indisponível"}
        </p>
      </CardContent>

      <CardFooter>
        {isBorrowed ? (
          <Button onClick={() => onReturn(book.id)}>
            Devolver
          </Button>
        ) : (
          <Button
            disabled={unavailable}
            onClick={() => onBorrow(book.id)}
          >
            Emprestar
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default BookCard