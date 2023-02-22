/* eslint-disable no-return-assign */

const Square = (coordinates) => {
  const [row, column] = coordinates;

  return {
    row,
    column,
    coordinates,
    id: null,
    isHit: false,
    hasShip: false,
    shipName: '',
  };
};

export const Ship = (length, name = 'ship') => {
  const proto = {
    getHit() {
      --this.hitPoints;

      if (this.hitPoints <= 0) {
        this.isSunk = true;
      }
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
  const size = gridLength ** 2;
  const dimension = gridLength;
  const state = [];

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

    checkShipPlacementValidity(target) {
      return !(!target || target.hasShip);
    },

    getValidSquaresToPlaceShipOn(origin, ship) {
      const [row, col] = origin;
      const targetSquares = [];

      if (ship.orientation === 'vertical') {
        for (let i = 0; i < ship.length; i++) {
          const target = this.findSquareWithRowCol([+row + i, col]);

          if (this.checkShipPlacementValidity(target)) {
            targetSquares.push(target);
          } else return false;
        }
      }

      if (ship.orientation === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          const target = this.findSquareWithRowCol([row, +col + i]);

          if (this.checkShipPlacementValidity(target)) {
            targetSquares.push(target);
          } else return false;
        }
      }

      return targetSquares;
    },

    placeShip(coordinates, ship) {
      const targetSquares = this.getValidSquaresToPlaceShipOn(
        coordinates,
        ship,
      );

      if (!targetSquares || !targetSquares.length) return false;

      targetSquares.forEach((square) => {
        square.shipName = ship.name;
        square.hasShip = true;
      });

      return true;
    },

    explodeShip(coordinates) {
      const shipToExplode = this.findSquareWithRowCol(coordinates).shipName;

      const shipSquares = state.filter(
        (square) => square.shipName === shipToExplode,
      );

      const surroundingSquares = [];

      const surroundingValues = [-1, 0, 1];

      shipSquares.forEach((square) => {
        for (let i = 0; i < surroundingValues.length; i++) {
          for (let j = 0; j < surroundingValues.length; j++) {
            const targetSquare = this.findSquareWithRowCol([
              +square.row + surroundingValues[i],
              +square.column + surroundingValues[j],
            ]);

            surroundingSquares.push(targetSquare);
          }
        }
      });

      surroundingSquares.forEach((square) => {
        if (!square) return;

        square.isHit = true;
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
    dimension,
  });
};

export const Player = (name = 'human') => {
  const proto = {
    attack(playerToAttack, coordinates) {
      const targetSquare =
        playerToAttack.board.findSquareWithRowCol(coordinates);

      if (targetSquare.isHit) return false;

      if (!targetSquare.isHit) {
        playerToAttack.receiveAttack(coordinates);

        if (playerToAttack.ships.every((ship) => ship.isSunk)) {
          this.isWinner = true;
        }
      }

      return true;
    },

    receiveAttack(coordinates) {
      const attackedSquare = this.board.findSquareWithRowCol(coordinates);

      attackedSquare.isHit = true;

      if (attackedSquare.hasShip) {
        const targetShip = this.ships.find(
          (ship) => ship.name === attackedSquare.shipName,
        );

        targetShip.getHit();

        if (targetShip.isSunk) {
          this.board.explodeShip(coordinates);
        }
      }
    },

    generateAttack(playerToAttack) {
      const targetCoords = this.getRandomCoordinates(
        playerToAttack.board.dimension,
      );

      const targetSquare =
        playerToAttack.board.findSquareWithRowCol(targetCoords);

      if (!targetSquare.isHit) {
        this.attack(playerToAttack, targetCoords);
        return targetCoords;
      }

      if (!targetSquare || targetSquare.isHit) {
        this.generateAttack(playerToAttack);
      }
    },

    getRandomNumber(limit) {
      return Math.ceil(Math.random() * +limit);
    },

    getRandomCoordinates(dimension) {
      return [this.getRandomNumber(dimension), this.getRandomNumber(dimension)];
    },

    generateShipPlacement(board, ship) {
      ship.orientation =
        this.getRandomNumber(2) % 2 === 0 ? 'vertical' : 'horizontal';

      const startingPoint = this.getRandomCoordinates(board.dimension);

      if (board.getValidSquaresToPlaceShipOn(startingPoint, ship)) {
        this.board.placeShip(startingPoint, ship);
        return;
      }

      if (!board.getValidSquaresToPlaceShipOn(startingPoint, ship)) {
        this.generateShipPlacement(board, ship);
      }
    },

    placeComputerShips() {
      this.ships.map((ship) => this.generateShipPlacement(this.board, ship));
    },
  };

  const props = {
    name,
    board: Board(10),
    ships: [],
    lastThreeMoves: [],
    isWinner: false,
    isPlaying: false,
  };

  return Object.assign(Object.create(proto), props);
};

export const Game = (numOfPlayers = 2) => ({
  players: [Player('you'), Player('computer')],
  playStatus: true,
  currentPlayer: null,
  checkWinner() {
    return this.players.find((player) => player.isWinner);
  },
  goToNextPlayer() {
    this.players.forEach((player) => (player.isPlaying = !player.isPlaying));
  },
});
