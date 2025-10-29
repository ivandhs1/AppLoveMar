import { Component, NgZone, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../../Services/game';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play.html',
  styleUrl: './play.css',
})
export class Play implements OnInit, OnDestroy {
  currentPlayerIdx = 0;
  isTiming = false;
  startTime = 0;
  lastTime = 0;
  elapsedSeconds = 0;
  timerInterval: any;
  questionDoneFor: string[] = [];

  constructor(
    public game: GameService,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.game.starterIndex === null) {
      this.router.navigate(['/']);
      return;
    }
    this.currentPlayerIdx = this.game.starterIndex!;
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  startTimer(): void {
    if (this.isTiming || this.bothAnswered) return;

    this.isTiming = true;
    this.startTime = performance.now();
    this.elapsedSeconds = 0;
    this.clearTimer();

    // 🔥 Actualiza UI cada 100ms
    this.ngZone.runOutsideAngular(() => {
      this.timerInterval = setInterval(() => {
        const elapsed = (performance.now() - this.startTime) / 1000;
        this.elapsedSeconds = parseFloat(elapsed.toFixed(1));
        // 👇 Forzar refresco visual
        this.ngZone.run(() => this.cdr.detectChanges());
      }, 100);
    });
  }

  stopTimer(): void {
    if (!this.isTiming) return;
    this.clearTimer();
    this.isTiming = false;

    const elapsed = Math.round(performance.now() - this.startTime);
    this.lastTime = elapsed;

    const qIndex = this.game.currentQuestion;
    const playerName = this.game.players[this.currentPlayerIdx].name;

    this.game.recordTime(qIndex, playerName, elapsed);
    this.questionDoneFor.push(playerName);

    if (!this.bothAnswered) {
      this.currentPlayerIdx = this.currentPlayerIdx === 0 ? 1 : 0;
    }

    this.cdr.detectChanges(); // Refrescar tras detener
  }

  nextQuestion(): void {
    if (this.game.currentQuestion < this.game.questions.length - 1) {
      this.game.currentQuestion++;
      this.resetForNext();
    } else {
      this.router.navigate(['/summary']);
    }
  }

  resetForNext(): void {
    this.clearTimer();
    this.isTiming = false;
    this.lastTime = 0;
    this.elapsedSeconds = 0;
    this.questionDoneFor = [];
    this.currentPlayerIdx = this.game.starterIndex!;
    this.cdr.detectChanges();
  }

  get bothAnswered(): boolean {
    return this.questionDoneFor.length === 2;
  }
}
