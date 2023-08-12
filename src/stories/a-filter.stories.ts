import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';
import { AFilterComponent } from 'src/app/components/shared/a-filter/a-filter.component';
import { FilterEnum } from 'src/app/core/enums/enum';

export const actionsData = {
  onChangeFilter: action('onChangeFilter'),
};

const metaAFilter: Meta<AFilterComponent> = {
  title: 'Filter',
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

export default metaAFilter;

type Story = StoryObj<AFilterComponent>;

export const Default: Story = {
  args: {
    textFilter: FilterEnum.all,
    typeFilter: FilterEnum.all,
  },
};

export const Active: Story = {
  args: {
    textFilter: FilterEnum.active,
    typeFilter: FilterEnum.active,
  },
};

export const Completed: Story = {
  args: {
    textFilter: FilterEnum.completed,
    typeFilter: FilterEnum.completed,
  },
};
