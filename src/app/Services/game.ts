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
    '¿Algo que no te gusta de mí? (habla con cariño)',
    '¿Algo que te ha molestado de mí?',
    '¿Qué fue lo que más te enamoró de mí después de conocerme?',
    'Un recuerdo mío que siempre te hace sonreír',
    'Algo que te gustaría que hiciéramos más juntos',
    'Una forma en que te gusta que te muestre cariño',
    'Una promesa pequeña que te gustaría que cumpliera',
    '¿Qué detalle mío valoras y pocas veces digo que me importa?',
    'Algo que quisieras que supiera sobre tus sueños',
    '¿Cómo te sientes cuando estamos lejos?'
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
