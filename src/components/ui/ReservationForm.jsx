import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { emit } from "@/lib/eventBus"

function ReservationForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    const cleanEmail = email.trim()
    const atIndex = cleanEmail.indexOf("@")

    if (
      !cleanEmail ||
      atIndex === -1 ||
      !cleanEmail.slice(atIndex + 1).includes(".")
    ) {
      setError("Digite um e-mail válido para continuar.")
      setSuccess("")
      return
    }

    setError("")
    setSuccess(`Reserva realizada para ${cleanEmail}.`)
    emit("reservation", { email: cleanEmail })
    setEmail("")
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Reservar livro</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Button type="submit">Reservar</Button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </div>
  )
}

export default ReservationForm