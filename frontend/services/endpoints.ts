/** URL base de l'API, configurable via variable d'entorn `NEXT_PUBLIC_API_URL`. */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Mapa centralitzat de tots els endpoints de l'API.
 * Afegir aquí qualsevol endpoint nou per evitar URLs hardcodejades als serveis.
 */
export const ENDPOINTS = {
  /** Endpoints d'autenticació */
  auth: {
    /** POST — Inicia sessió amb email i password */
    login: `${BASE_URL}/auth/login`,
    /** POST — Registra un nou usuari amb username, email i password */
    register: `${BASE_URL}/auth/register`,
  },

  /** Endpoints del joc */
  game: {
    /** POST — Inicia o recupera la partida de l'usuari */
    start: `${BASE_URL}/game/start`,
    /** POST — Guarda el progrés de la partida */
    save: `${BASE_URL}/game/save`,
    /** GET — Retorna la partida activa de l'usuari */
    activeGame: `${BASE_URL}/game/me/active`,
    /** GET — Retorna l'última partida de l'usuari */
    lastGame: `${BASE_URL}/game/me/last`,
    /** POST — Envia la resposta d'un puzzle */
    answer: (gameId: number) => `${BASE_URL}/game/${gameId}/answer`,
    /** POST — Sol·licita una pista */
    hint: (gameId: number) => `${BASE_URL}/game/${gameId}/hint`,
  },
} as const;
