import { Button } from "@/components/ui/button"

function FilterBar({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedGenre === "Todos" ? "default" : "outline"}
        aria-pressed={selectedGenre === "Todos"}
        onClick={() => onGenreChange("Todos")}
      >
        Todos
      </Button>

      {genres.map((genre) => (
        <Button
          key={genre}
          variant={selectedGenre === genre ? "default" : "outline"}
          aria-pressed={selectedGenre === genre}
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  )
}

export default FilterBar