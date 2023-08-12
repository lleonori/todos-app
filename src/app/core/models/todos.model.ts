export interface TodosInterface {
  userId?: number;
  id?: string;
  title: string;
  completed: boolean;
}
export interface ChangeTodoInterface {
  id: string;
  text: string;
}
