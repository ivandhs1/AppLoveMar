export interface Player {
  name: string;
  numberPick?: number; // 👈 evita errores de propiedad inexistente
}

export interface TimeRecord {
  questionIndex: number;
  question: string;
  playerTimes: { [playerName: string]: number };
}