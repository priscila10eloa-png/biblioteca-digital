import { Button } from "@/components/ui/button"

function Header({ loanCount, darkMode, onToggleDarkMode }) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div>
        <h1 className="text-2xl font-bold">Biblioteca Digital</h1>
        <p className="hidden text-sm sm:block">
          Explore nosso catálogo de livros
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span>Empréstimos ({loanCount})</span>

        <Button onClick={onToggleDarkMode}>
          {darkMode ? "Modo claro" : "Modo escuro"}
        </Button>
      </div>
    </header>
  )
}

export default Header