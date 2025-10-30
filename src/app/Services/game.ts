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
  "Si fueras una aplicación en mi celular, ¿cuál serías y por qué? 📱😂",
  "¿Qué cosa haces que sabes que me desespera… pero igual lo sigues haciendo? 😅",
  "Si tuvieras que describir nuestra relación como una película, ¿cuál sería? 🎬",
  "¿Qué emoji me representa mejor según tú? 🤔",
  "Si fuéramos un dúo famoso, ¿cómo se llamaría nuestro equipo? 🌟",
  "¿Qué apodo divertido me pondrías si no te enojaras por el mío? 😜",
  "¿Qué harías si mañana amanecemos intercambiando cuerpos por un día? 🤯",
  "¿Qué meme describe mejor cómo te sientes conmigo? 😂",
  "Si fuéramos personajes de caricatura, ¿quién serías tú y quién sería yo? 🧸",
  "¿Cuál fue la cita más rara o graciosa que hemos tenido? 💞",
  "Si te doy un súper poder solo para usar conmigo, ¿cuál eliges? ⚡",
  "¿Qué harías si te digo que quiero bailar contigo ahora mismo, sin música? 💃🕺",
  "¿Qué frase tuya me haría reír incluso en un mal día? 🤭",
  "Si tuvieras que imitarme, ¿qué frase o gesto harías primero? 😆",
  "¿Qué travesura te gustaría que hiciéramos juntos sin que nadie se entere? 🤫"
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
