import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoveNote } from '../../models/note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class NoteFormComponent {
  @Output() addNote = new EventEmitter<Omit<LoveNote, 'id' | 'date' | 'isOpened'>>();

  noteForm: FormGroup;
  isOpen = false;

  emojis = ['💖', '🥰', '🌹', '✨', '😊', '💌', '🔥', '👑'];

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      sender: ['Player 1', Validators.required],
      category: ['sweet', Validators.required],
      content: ['', [Validators.required, Validators.minLength(5)]],
      moodEmoji: ['💖']
    });
  }

  toggleForm(): void {
    this.isOpen = !this.isOpen;
  }

  selectEmoji(emoji: string): void {
    this.noteForm.patchValue({ moodEmoji: emoji });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.addNote.emit(this.noteForm.value);
      this.noteForm.reset({
        sender: 'Player 1',
        category: 'sweet',
        moodEmoji: '💖'
      });
      this.isOpen = false;
    }
  }
}