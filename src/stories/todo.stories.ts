import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';
import { TodoComponent } from 'src/app/components/shared/todo/todo.component';

export const actionsData = {
  changeTodoText: action('changeTodoText'),
  setEditingId: action('setEditingId'),
};

const metaTodo: Meta<TodoComponent> = {
  title: 'Todo',
  component: TodoComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: TodoComponent) => ({
    props: {
      ...args,
      changeTodoText: actionsData.changeTodoText,
      setEditingId: actionsData.setEditingId,
    },
  }),
};

export default metaTodo;
type Story = StoryObj<TodoComponent>;

export const Default: Story = {
  args: {
    todo: {
      userId: 1,
      id: '1',
      title: 'Todo Completato',
      completed: true,
    },
  },
};

export const NotCompleteTodo: Story = {
  args: {
    todo: {
      userId: 2,
      id: '2',
      title: 'Todo non completato',
      completed: false,
    },
  },
};

export const ChangeText: Story = {
  args: {
    isEditing: true ,
  },
};
