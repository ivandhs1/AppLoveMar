import { Component } from '@angular/core';
import { GameService } from '../../Services/game';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {
    
  showModal = false;
  messageText = `
💌 Mensaje para mi Pollita – 11/10/2025

Mi pollita hermosa, mi niña, mi reina, mi amor 💖

Sé que a veces hemos tenido discusiones, malentendidos o momentos en los que las palabras no salieron como queríamos. 
Pero quiero que sepas, desde lo más profundo de mi corazón, que nada de eso cambia lo que siento por ti.<br><br>

Te amo con todo lo que soy. Cada día pienso en ti, en tus risas, en tu forma de ver el mundo, 
en lo increíble que eres. Y aunque a veces no lo parezca, siempre busco la manera de acercarme a ti, 
de entenderte más, de cuidarte mejor.<br><br>

Hice este pequeño software con todo mi cariño, no solo como un detalle, sino como una forma de seguir 
construyendo puentes entre nosotros. Para que tengamos una manera más linda y especial de comunicarnos, 
sin importar si estamos lejos o cerca.<br><br>

Porque tú eres mi motivo, mi inspiración y mi razón para seguir creando cosas bonitas. 💞

Con todo mi amor,
Tu niño, el que siempre te va a amar 💕
11/10/2025 💍
`;
  winnerName = 'Jugador 1'; // Puedes vincularlo desde tu lógica real
  averageTime = 2.35;

  constructor(public game: GameService, private router: Router) {}

  get formattedResults() {
    return this.game.questions.map((q, index) => ({
      question: q,
      times: this.game.times[index] || {}
    }));
  }

  restartGame() {
    this.game.reset();
    this.router.navigate(['/']);
  }

  get totalTimePlayer1() {
    const name = this.game.players[0].name;
    return this.sumTimesFor(name);
  }

  get totalTimePlayer2() {
    const name = this.game.players[1].name;
    return this.sumTimesFor(name);
  }

  private sumTimesFor(name: string): number {
    return this.game.times
      .map(entry => entry.playerTimes[name] || 0) // 👈 aquí accedemos correctamente
      .reduce((a, b) => a + b, 0);
  }

openMessage() {
  this.showModal = true;

  // Espera a que el modal se renderice y luego reproduce el audio
  setTimeout(() => {
    const audio = document.getElementById('romanticAudio') as HTMLAudioElement;
    if (audio) audio.play().catch(err => console.log('Autoplay bloqueado:', err));
  }, 300);
}

  closeMessage() {
    this.showModal = false;
  }
}