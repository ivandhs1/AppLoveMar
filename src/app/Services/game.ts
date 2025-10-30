import { Injectable } from '@angular/core';
import { Player, TimeRecord } from '../Models/models';

@Injectable({ providedIn: 'root' })
export class GameService {
  players: Player[] = [
    { name: '', numberPick: 0 }, // 👈 inicializamos correctamente
    { name: '', numberPick: 0 }
  ];

  rule: 'menor' | 'mayor' = 'menor';
  starterIndex: number | null = null;
  currentQuestion = 0;
  times: TimeRecord[] = [];

  readonly questions: string[] = [
  "¿Qué fue lo primero que te enamoró de mí?",
  "Si pudieras cambiarme algo (sin ofender 😅), ¿qué sería?",
  "¿Qué detalle pequeño mío te derrite el corazón?",
  "¿Qué cosa mía te ha molestado pero nunca me dijiste?",
  "¿Qué sueño o meta te gustaría que logremos juntos?",
  "¿Qué canción sientes que nos representa?",
  "¿Cuál es tu apodo favorito que te he dicho (o te gustaría que te diga)?",
  "Si tuvieras que describir nuestro amor con una sola palabra, ¿cuál sería y por qué?",
  "¿Qué cosa tonta hemos hecho juntos que siempre te hace reír al recordarla?",
  "Si pudieras revivir un momento conmigo, ¿cuál elegirías?",
  "¿Qué cosa hago que te hace sentir más amado(a)?",
  "¿Qué parte de mí (física o emocional) te encanta más?",
  "¿Qué aprendiste de nuestra relación que antes no sabías sobre el amor?",
  "¿Qué te gustaría que hiciéramos más seguido para mejorar nuestra conexión?",
  "Si pudieras decirme una sola cosa que venga directo del corazón ahora mismo, ¿qué sería?"
  ];

  // 🔹 Decide quién empieza según la regla o al azar si empatan
  decideStarter(): number {
    // 🎲 Elegir aleatoriamente la regla
    this.rule = Math.random() < 0.5 ? 'menor' : 'mayor';

    const a = this.players[0].numberPick ?? 0;
    const b = this.players[1].numberPick ?? 0;

    if (a === b) {
      this.starterIndex = Math.round(Math.random());
      return this.starterIndex;
    }

    // 🧩 Aplica la regla elegida
    this.starterIndex = this.rule === 'menor' ? (a < b ? 0 : 1) : (a > b ? 0 : 1);
    return this.starterIndex;
  }

  // 🔹 Registra los tiempos de cada jugador por pregunta
  recordTime(questionIndex: number, playerName: string, ms: number) {
    let rec = this.times.find(t => t.questionIndex === questionIndex);
    if (!rec) {
      rec = {
        questionIndex,
        question: this.questions[questionIndex],
        playerTimes: {}
      };
      this.times.push(rec);
    }
    rec.playerTimes[playerName] = ms;
  }

  // 🔹 Reinicia el estado completo del juego
  reset() {
    this.players = [
      { name: '', numberPick: 0 },
      { name: '', numberPick: 0 }
    ];
    this.rule = 'menor';
    this.starterIndex = null;
    this.currentQuestion = 0;
    this.times = [];
  }
}
