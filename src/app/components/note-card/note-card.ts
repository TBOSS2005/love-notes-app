import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoveNote } from '../../models/note.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './note-card.html'
})
export class NoteCardComponent {
  @Input() note!: LoveNote;
  @Output() delete = new EventEmitter<string>();
  @Output() toggleOpen = new EventEmitter<string>();

  get categoryColor(): string {
    switch (this.note.category) {
      case 'sweet': return 'bg-rose-900 text-rose-200 border-rose-400';
      case 'funny': return 'bg-amber-900 text-amber-200 border-amber-400';
      case 'memories': return 'bg-purple-900 text-purple-200 border-purple-400';
      case 'future': return 'bg-teal-900 text-teal-200 border-teal-400';
      default: return 'bg-pink-900 text-pink-200 border-pink-400';
    }
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.note.id);
  }

  onToggle(): void {
    this.toggleOpen.emit(this.note.id);
  }
}