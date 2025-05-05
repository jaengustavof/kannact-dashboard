export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}
