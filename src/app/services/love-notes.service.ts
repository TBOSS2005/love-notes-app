import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoveNote } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class LoveNotesService {
  private STORAGE_KEY = 'love_notes_app_data';
  private ANNIVERSARY_KEY = 'love_notes_anniversary';
  private isBrowser: boolean;

  private initialNotes: LoveNote[] = [
    {
      id: '1',
      title: 'Our First Date',
      sender: 'Player 1',
      category: 'memories',
      content: 'I still remember how nervous I was meeting you. Your warm smile made all my anxiety disappear instantly.',
      date: new Date(Date.now() - 86400000 * 30).toISOString(),
      moodEmoji: '💖',
      isOpened: true
    },
    {
      id: '2',
      title: 'Why I Love You',
      sender: 'Player 1',
      category: 'sweet',
      content: 'You always make me feel supported, loved, and safe. Thank you for being my favorite person in the world!',
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      moodEmoji: '🥰',
      isOpened: true
    },
    {
      id: '3',
      title: 'Future Quest',
      sender: 'Player 1',
      category: 'future',
      content: 'Let us plan a cozy weekend getaway soon! Just us, good food, beautiful scenery, and zero distractions.',
      date: new Date().toISOString(),
      moodEmoji: '✨',
      isOpened: false
    }
  ];

  private notesSubject = new BehaviorSubject<LoveNote[]>([]);
  public notes$: Observable<LoveNote[]> = this.notesSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.notesSubject.next(this.loadNotes());
  }

  private loadNotes(): LoveNote[] {
    if (this.isBrowser) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error loading notes from localStorage:', e);
        }
      }
    }
    return this.initialNotes;
  }

  private saveNotes(notes: LoveNote[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
    }
    this.notesSubject.next(notes);
  }

  getNotes(): LoveNote[] {
    return this.notesSubject.value;
  }

  addNote(note: Omit<LoveNote, 'id' | 'date' | 'isOpened'>): void {
    const newNote: LoveNote = {
      ...note,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      isOpened: false
    };
    const currentNotes = [newNote, ...this.notesSubject.value];
    this.saveNotes(currentNotes);
  }

  deleteNote(id: string): void {
    const updated = this.notesSubject.value.filter(n => n.id !== id);
    this.saveNotes(updated);
  }

  toggleOpened(id: string): void {
    const updated = this.notesSubject.value.map(n => 
      n.id === id ? { ...n, isOpened: !n.isOpened } : n
    );
    this.saveNotes(updated);
  }

  getAnniversaryDate(): string {
    if (this.isBrowser) {
      return localStorage.getItem(this.ANNIVERSARY_KEY) || '2023-01-01';
    }
    return '2023-01-01';
  }

  setAnniversaryDate(date: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.ANNIVERSARY_KEY, date);
    }
  }
}