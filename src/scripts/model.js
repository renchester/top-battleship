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

export const Board = (gridLength = 10) => {
  let size = gridLength ** 2;
  let state = [];
  let owner = null;

  const placeShip = (coordinates, ship) => {
    const [row, col] = coordinates;
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

  return {
    size,
    state,
    owner,
    placeShip,
  };
};

export const Ship = (length, name = 'ship') => {};
