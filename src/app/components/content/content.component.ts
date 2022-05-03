import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  conwayActiveCoords: [number, number][] = []
  visibleGrid: [boolean, number, number][] = new Array
  gridSize: number = 7  
  gridOffset: [number, number] = [0, 0]

  started: boolean = false
  sub: any

  constructor() { }

  ngOnInit(): void {
    this.addCoords([true, 3, 4])
    this.addCoords([true, 2, 3])
    this.addCoords([true, 2, 2])
    this.addCoords([true, 3, 2])
    this.addCoords([true, 4, 2])
    this.refreshGrid()
  }

  addCoords(position: [boolean, number, number]) {
    let coords: [number, number] = [position[1], position[2]]
    if (position[0]) {
      this.conwayActiveCoords.push(coords)
    }
    else {
      this.conwayActiveCoords = this.conwayActiveCoords.filter((value) => {return value[0] != coords[0] || value[1] != coords[1]})
    }
  }

  refreshGrid() {
    let flag = false
    this.visibleGrid = []
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        flag = false
        this.conwayActiveCoords.forEach(element => {
          if (element[0] + this.gridOffset[0] == x && element[1] + this.gridOffset[1] == y) {
            flag = true
          }
        })
        if (flag) {
          this.visibleGrid.push([true, x, y])
        }
        else {
          this.visibleGrid.push([false, x, y])
        }
      }
    }
    console.table(this.conwayActiveCoords)
  }

  restartGrid() {
    this.conwayActiveCoords = []
    this.refreshGrid()
  }

  changeGridSize(shift: number) {
    this.gridSize += shift
    this.refreshGrid()
  }

  changeGridOffset(shift: [number, number]) {
    this.gridOffset[0] += shift[0]
    this.gridOffset[1] += shift[1]
    this.refreshGrid()
  }

  nearbyPositions() {
    let posList: [number, number][] = new Array
    this.conwayActiveCoords.forEach((value) => {
      for (let x = value[0] - 1; x <= value[0] + 1; x++) {
        for (let y = value[1] - 1; y <= value[1] + 1; y++) {
          if (posList.filter(e => e[0] === x && e[1] === y).length == 0) {
            posList.push([x, y])
          }
        }
      }
    })
    return posList
  }

  simulateLife() {
    let solution: [boolean, number, number][] = new Array
    this.nearbyPositions().forEach((value) => {
      let count = 0
      for (let x = value[0] - 1; x <= value[0] + 1; x++) {
        for (let y = value[1] - 1; y <= value[1] + 1; y++) {
          if (this.conwayActiveCoords.filter(e => e[0] === x && e[1] === y).length > 0) {
            count += 1
          }
        }
      }
      if (count < 3 || count > 4) {
        solution.push([false, value[0], value[1]])
      }
      else if (count == 3) {
        solution.push([true, value[0], value[1]])
      }
    })
    console.table(solution)
    solution.forEach((value) => {
      this.addCoords(value)
    })
    this.refreshGrid()
  }

  startGame() {
    if (!this.started) {
      this.sub = interval(500).subscribe(() => {this.simulateLife()})
      this.started = true
    }

  }

  stopGame() {
    this.sub.unsubscribe()
    this.started = false
  }

}
