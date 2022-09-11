import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  term = ""
  @Output() filterEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {
  }

  filter() {
    console.log(this.term)
    this.filterEvent.emit(this.term.toLowerCase().trim());
  }

}
