import { useEffect, useState } from "react"
import { subscribe } from "@/lib/eventBus"

function ActivityPanel() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    function handleBorrow(data) {
      setActivities((prev) =>
        [`Empréstimo: ${data.title}`, ...prev].slice(0, 5)
      )
    }

    function handleReturn(data) {
      setActivities((prev) =>
        [`Devolução: ${data.title}`, ...prev].slice(0, 5)
      )
    }

    function handleReservation(data) {
      setActivities((prev) =>
        [`Reserva: ${data.email}`, ...prev].slice(0, 5)
      )
    }

    const unsubscribeBorrow = subscribe("borrow", handleBorrow)
    const unsubscribeReturn = subscribe("return", handleReturn)
    const unsubscribeReservation = subscribe("reservation", handleReservation)

    return () => {
      unsubscribeBorrow()
      unsubscribeReturn()
      unsubscribeReservation()
    }
  }, [])

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">Atividades recentes</h2>

      {activities.length === 0 ? (
        <p>Nenhuma atividade registrada.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ActivityPanel