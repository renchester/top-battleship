import Ship from './ship';
import Board from './board';

const Player = (name = 'human') => {
  const proto = {
    attack(playerToAttack, coordinates) {
      const targetSquare =
        playerToAttack.board.findSquareWithRowCol(coordinates);

      if (targetSquare.isHit) return false;

      if (!targetSquare.isHit) {
        playerToAttack.receiveAttack(coordinates);

        if (playerToAttack.ships.every((ship) => ship.isSunk))
          this.isWinner = true;
      }

      return true;
    },

    receiveAttack(coordinates) {
      const attackedSquare = this.board.findSquareWithRowCol(coordinates);

      if (attackedSquare.isHit) return;

      attackedSquare.isHit = true;

      if (attackedSquare.hasShip) {
        const targetShip = this.ships.find(
          (ship) => ship.name === attackedSquare.shipName,
        );

        targetShip.getHit();

        if (targetShip.isSunk) {
          const explodedSquares = this.board.getExplodedSquares(coordinates);

          explodedSquares.forEach((square) => {
            if (!square) return;
            this.receiveAttack(square.coordinates);
            square.isHit = true;
          });
        }
      }
    },

    getRandomNumber(limit) {
      return Math.ceil(Math.random() * +limit);
    },

    getRandomCoordinates(dimension) {
      return [this.getRandomNumber(dimension), this.getRandomNumber(dimension)];
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
        this.generateAttack(playerToAttack); // recursively generate a new attack
      }

      return targetCoords;
    },

    generateShipPlacement(board, ship) {
      ship.orientation =
        this.getRandomNumber(10) % 2 === 0 ? 'vertical' : 'horizontal';

      const startingPoint = this.getRandomCoordinates(board.dimension);

      if (board.getValidSquaresToPlaceShipOn(startingPoint, ship)) {
        this.board.placeShip(startingPoint, ship);
        return;
      }

      if (!board.getValidSquaresToPlaceShipOn(startingPoint, ship)) {
        this.generateShipPlacement(board, ship);
      }
    },

    placeShipsOnGeneratedPlacements() {
      this.ships.map((ship) => this.generateShipPlacement(this.board, ship));
    },
  };

  const props = {
    name,
    board: Board(10),
    ships: [
      Ship(5, 'carrier'),
      Ship(4, 'battleship'),
      Ship(3, 'destroyer'),
      Ship(3, 'submarine'),
      Ship(2, 'patroller'),
    ],
    lastThreeMoves: [],
    isWinner: false,
    isPlaying: false,
    isComputer: false,
  };

  return Object.assign(Object.create(proto), props);
};

export default Player;
