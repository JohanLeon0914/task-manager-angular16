import { Person } from "./person.model";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    people: Person[];
  }