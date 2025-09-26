export interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  author: string;
  timestamp: string;
  comments: Comment[];
}

export interface TechStackSuggestion {
    frontend: { tech: string; reason: string; };
    backend: { tech: string; reason: string; };
    database: { tech: string; reason: string; };
    deployment: { tech: string; reason: string; };
}
