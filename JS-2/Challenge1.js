class Seat {
  constructor() {
      this._isAvailable = true;
  }

  reserve() {
      if (this._isAvailable) {
          this._isAvailable = false;
          return true;
      } else {
          return false;
      }
  }

  isReserved() {
      return !this._isAvailable;
  }

  display() {
      return this._isAvailable ? 'O' : 'X';
  }
}

class Cinema {
  constructor(columns, rows) {
      this.seats = [];
      for (let i = 0; i < rows; i++) {
          let row = [];
          for (let j = 0; j < columns; j++) {
              row.push(new Seat());
          }
          this.seats.push(row);
      }
  }

  reserve(column, row) {
      if (this.seats[row] && this.seats[row][column]) {
          return this.seats[row][column].reserve();
      } else {
          return false;
      }
  }

  showCine() {
      for (let row of this.seats) {
          let rowDisplay = row.map(seat => seat.display()).join(' ');
          console.log(rowDisplay);
      }
  }
}

const cine = new Cinema(10, 5);
cine.reserve(2, 2);
cine.reserve(7, 4);
cine.reserve(2, 3);
cine.reserve(3, 1);
cine.reserve(1, 5);
cine.reserve(4, 4);
cine.showCine();
