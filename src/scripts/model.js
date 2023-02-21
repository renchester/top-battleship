console.log(1);

const Square = (coordinates) => {
  const [row, column] = coordinates;

  return {
    row,
    column,
    coordinates,
    id: null,
    isHit: false,
    hasShip: false,
    shipName: null,
  };
};

export const Ship = (length, name = 'ship') => {
  const proto = {
    getHit() {
      --this.hitPoints;

      if (this.hitPoints <= 0) this.isSunk = true;
    },
    rotate() {
      this.orientation =
        this.orientation === 'vertical' ? 'horizontal' : 'vertical';
    },
  };

  const props = {
    name,
    length,
    hitPoints: length,
    orientation: 'vertical',
    isSunk: false,
  };

  return Object.assign(Object.create(proto), props);
};

export const Board = (gridLength = 10) => {
  let size = gridLength ** 2;
  let state = [];
  let owner = null;

  const proto = {
    findSquareWithID(id) {
      return this.state.find((square) => square.id === id);
    },

    findSquareWithRowCol(coordinates) {
      return this.state.find(
        (square) =>
          square.row === coordinates[0] && square.column === coordinates[1],
      );
    },

    placeShip(coordinates, ship) {
      const [row, col] = coordinates;
      const { length, orientation } = ship;

      const targetSquares = [];

      if (orientation === 'vertical') {
        // column remains same

        for (let i = 0; i < length; i++) {
          targetSquares.push(this.findSquareWithRowCol([+row + i, col]));
        }
      } else if (orientation === 'horizontal') {
        // row remains same

        for (let i = 0; i < length; i++) {
          targetSquares.push(this.findSquareWithRowCol([row, +col + i]));
        }
      }

      targetSquares.forEach((square) => {
        square.shipName = ship.name;
        square.hasShip = true;
      });
    },
  };

  const createBoard = () => {
    for (let i = 1; i <= gridLength; i++) {
      const row = i;
      let column = 1;

      for (let j = 1; j <= gridLength; j++) {
        column = j;

        const newSquare = Square([row, column]);
        state.push(newSquare);
      }
    }

    state.forEach((square, i) => (square.id = ++i));
  };

  createBoard();

  return Object.assign(Object.create(proto), {
    size,
    state,
    owner,
  });
};
