import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.html',
  styleUrl: './countdown.css'
})
export class CountdownComponent implements OnInit, OnDestroy {
  // 1. Set your dating start date here:
  readonly startDate = new Date('2025-03-14T00:00:00');

  // 2. Set your 1-Year Anniversary target date here:
  readonly anniversaryDate = new Date('2026-03-14T00:00:00');

  // Days of Love (Counter Up)
  daysTogether = signal(0);
  hoursTogether = signal(0);

  // Countdown to 1 Year (Countdown Down)
  countdownDays = signal(0);
  countdownHours = signal(0);
  countdownMinutes = signal(0);
  countdownSeconds = signal(0);
  isAnniversary = signal(false);

  private timerId: any;

  ngOnInit(): void {
    this.updateTimers();
    this.timerId = setInterval(() => this.updateTimers(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateTimers(): void {
    const now = new Date().getTime();

    // --- Calculate Days of Love Together ---
    const start = this.startDate.getTime();
    const timeTogether = Math.max(0, now - start);
    this.daysTogether.set(Math.floor(timeTogether / (1000 * 60 * 60 * 24)));
    this.hoursTogether.set(Math.floor((timeTogether % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    // --- Calculate Countdown to 1-Year Anniversary ---
    const target = this.anniversaryDate.getTime();
    const timeRemaining = target - now;

    if (timeRemaining <= 0) {
      this.isAnniversary.set(true);
      return;
    }

    this.countdownDays.set(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
    this.countdownHours.set(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.countdownMinutes.set(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
    this.countdownSeconds.set(Math.floor((timeRemaining % (1000 * 60)) / 1000));
  }
}