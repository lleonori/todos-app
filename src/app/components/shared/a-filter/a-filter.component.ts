import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterEnum } from 'src/app/core/enums/enum';

@Component({
  selector: 'app-a-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a-filter.component.html',
})
export class AFilterComponent {
  @Input() textFilter: string = '';
  @Input() typeFilter: FilterEnum = FilterEnum.all;
  @Input() selectedFilter: boolean = false;
  @Output() changeFilter = new EventEmitter<FilterEnum>();

  onChangeFilter(filterName: FilterEnum) {
    this.changeFilter.emit(filterName);
  }

  get filterEnum() {
    return FilterEnum;
  }
}
