import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.css']
})
export class GridTileComponent implements OnInit {

  @Input() value: [boolean, number, number] = [false, 0, 0];
  @Input() offset: [number, number] = [0, 0]
  @Output() newItemEvent = new EventEmitter<[boolean, number, number]>()

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.value[0] = !this.value[0]
    this.value[1] -= this.offset[0]
    this.value[2] -= this.offset[1]
    this.newItemEvent.emit(this.value)
  }

}
