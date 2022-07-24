export interface Opts {
  isMulti: string;
  options: string[];
  answer: string[];
}

export interface Question {
  _id: string;
  category: string;
  title: string;
  desc: string;
  options?: string;
  explanation: string;
  level: number;
  tagId: number;
}

export interface Tag {
  id: number;
  tagName: string;
  image: string;
}
