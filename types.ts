
export interface Idea {
  id: string;
  title: string;
  description: string;
  likes: number;
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
