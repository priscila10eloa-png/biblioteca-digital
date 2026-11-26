const listeners = {}

/**
 * Inscreve uma função em um evento.
 */
export function subscribe(event, callback) {
  if (!listeners[event]) {
    listeners[event] = new Set()
  }

  listeners[event].add(callback)

  return () => {
    listeners[event].delete(callback)
  }
}

/**
 * Emite um evento para os inscritos.
 */
export function emit(event, data) {
  listeners[event]?.forEach((callback) => callback(data))
}