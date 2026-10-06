export interface LoveNote {
  id: string;
  title: string;
  sender: string;
  category: 'sweet' | 'funny' | 'memories' | 'future';
  content: string;
  date: string;
  moodEmoji?: string;
  isOpened?: boolean;
}