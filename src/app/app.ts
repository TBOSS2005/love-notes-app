import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from './components/countdown/countdown';
import { NoteCardComponent } from './components/note-card/note-card';
import { NoteFormComponent } from './components/note-form/note-form';
import { LoveNotesService } from './services/love-notes.service';
import { LoveNote } from './models/note.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CountdownComponent,
    NoteCardComponent,
    NoteFormComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  title = 'Our Love Notes';
  notes: LoveNote[] = [];
  filteredNotes: LoveNote[] = [];
  selectedCategory = 'all';

  constructor(private loveNotesService: LoveNotesService) {}

  ngOnInit(): void {
    this.loveNotesService.notes$.subscribe(notes => {
      this.notes = notes;
      this.applyFilter();
    });
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategory === 'all') {
      this.filteredNotes = this.notes;
    } else {
      this.filteredNotes = this.notes.filter(n => n.category === this.selectedCategory);
    }
  }

  handleAddNote(newNote: Omit<LoveNote, 'id' | 'date' | 'isOpened'>): void {
    this.loveNotesService.addNote(newNote);
  }

  handleDeleteNote(id: string): void {
    this.loveNotesService.deleteNote(id);
  }

  handleToggleOpen(id: string): void {
    this.loveNotesService.toggleOpened(id);
  }
}