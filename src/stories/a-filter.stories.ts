
import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';
import { AFilterComponent } from 'src/app/components/shared/a-filter/a-filter.component';
import { FilterEnum } from 'src/app/core/enums/enum';


export const actionsData = {
  onChangeFilter: action('onChangeFilter'),
};

const meta1: Meta<AFilterComponent> = {
  title: 'a-filter',
  component: AFilterComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: AFilterComponent) => ({
    props: {
      ...args,
      onChangeFilter: actionsData.onChangeFilter,
    },
  }),
};

export default meta1;
type Story = StoryObj<AFilterComponent>;

export const Default: Story = {
  args: {
    textFilter: '1',
    typeFilter: FilterEnum.all
    // task: {
    //   id: '1',
    //   title: 'Test Task',
    //   state: 'FILTER_ALL',
    // },
  },
};

// export const Pinned: Story = {
//   args: {
//     task: {
//       ...Default.args?.task,
//       state: 'FILTER_ACTIVE',
//     },
//   },
// };

// export const Archived: Story = {
//   args: {
//     task: {
//       ...Default.args?.task,
//       state: 'FILTER_COMPLETED',
//     },
//   },
// };
