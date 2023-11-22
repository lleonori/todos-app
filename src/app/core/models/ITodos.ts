export interface ITodos {
  userId?: number;
  id?: string;
  title: string;
  completed: boolean;
}
export interface IChangeTodo {
  id: string;
  text: string;
}
