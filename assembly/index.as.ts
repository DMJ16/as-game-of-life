enum Cell {
  DEAD = 0,
  ALIVE = 1,
}
export class Universe {
  width: u32 = 64;
  height: u32 = 64;
  cells: Uint32Array = new Uint32Array(this.width * this.height)
    .map((num, i) => {
      num = i;
      return num;
    })
    .map((num) => {
      if (num % 2 == 0 || num % 7 == 0) return Cell.ALIVE;
      else return Cell.DEAD;
    });

  getIdx(row: u32, col: u32): u32 {
    return row * this.width + col;
  }

  liveNeighborCount(row: u32, col: u32): u8 {
    let count: u8 = 0;
    const rowArr: u32[] = [this.height - 1, 0, 1];
    const colArr: u32[] = [this.width - 1, 0, 1];
    for (let i = 0; i < rowArr.length; i++) {
      const deltaRow: u32 = rowArr[i];
      for (let j = 0; j < colArr.length; j++) {
        const deltaCol: u32 = colArr[j];
        if (deltaRow == 0 && deltaCol == 0) continue;
        const neighbor_row = (row + deltaRow) % this.height;
        const neighbor_col = (col + deltaCol) % this.width;
        const idx = this.getIdx(neighbor_row, neighbor_col);
        count += this.cells[idx] as u8;
      }
    }
    return count;
  }

  tick(): void {
    for (let row: u32 = 0; row < this.height; row++) {
      for (let col: u32 = 0; col < this.width; col++) {
        const idx = this.getIdx(row, col);
        const cell = this.cells[idx];
        const liveNeighbors = this.liveNeighborCount(row, col);
        let nextCell: u32;
        if (cell == Cell.ALIVE && liveNeighbors < 2) {
          nextCell = Cell.DEAD;
        } else if (
          cell == Cell.ALIVE &&
          (liveNeighbors == 2 || liveNeighbors == 3)
        ) {
          nextCell = Cell.ALIVE;
        } else if (cell == Cell.ALIVE && liveNeighbors > 3) {
          nextCell = Cell.DEAD;
        } else if (cell == Cell.DEAD && liveNeighbors == 3) {
          nextCell = Cell.ALIVE;
        } else {
          nextCell = cell;
        }
        this.cells[idx] = nextCell;
      }
    }
  }
}
