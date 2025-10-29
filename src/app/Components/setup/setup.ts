import { Component } from '@angular/core';
import { GameService } from '../../Services/game';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setup',
  imports: [FormsModule, CommonModule],
  templateUrl: './setup.html',
  styleUrl: './setup.css',
})
export class Setup {

  constructor(public game: GameService, private router: Router) {}

  start() {
    if (!this.game.players[0].name.trim() || !this.game.players[1].name.trim()) {
    alert('Por favor, escriban ambos nombres.');
    return;
  }

  const n1 = this.game.players[0].numberPick;
  const n2 = this.game.players[1].numberPick;

  if (!n1 || !n2 || n1 < 1 || n1 > 10 || n2 < 1 || n2 > 10) {
    alert('Ambos deben elegir un número entre 1 y 10.');
    return;
  }

  this.game.decideStarter();
  this.router.navigate(['/play']);
}

}
