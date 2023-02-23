import styles from '../sass/main.scss';

import Game from './model/game';
import placeShipView from './views/placeShipView';
import View from './views/view';

let game;
let humanPlayer;
let computerPlayer;
let currentShip;

const controlRotateShip = (ship) => {
  ship.rotate();
};

const controlAdjacentSquares = (origin, ship) => {
  const adjacentSquares = humanPlayer.board.getValidSquaresToPlaceShipOn(
    origin,
    ship,
  );

  if (!adjacentSquares || adjacentSquares.some((square) => square.hasShip))
    return false;

  return adjacentSquares.map((square) => square.id);
};

const controlPlaceShip = (coordinates, ship) => {
  humanPlayer.board.placeShip(coordinates, ship);
  placeShipView.renderBoard(humanPlayer.board.state);
  currentShip.isOnBoard = true;

  currentShip = humanPlayer.ships.find((targetShip) => !targetShip.isOnBoard);

  if (currentShip) {
    controlShipPlacement(currentShip);
  }

  if (!currentShip) {
    computerPlayer.placeShipsOnGeneratedPlacements();

    console.log('done');

    gameView.renderBoard(game);
  }
};

const controlShipPlacement = (ship) => {
  placeShipView.addHandlerFindShipSquares(ship, controlAdjacentSquares);
  placeShipView.addHandlerRotateShip(ship, controlRotateShip);
  placeShipView.addHandlerPlaceShip(ship, controlPlaceShip);
};

const controlStartGame = (name) => {
  // Initialize game
  game = Game(name);
  [humanPlayer, computerPlayer] = game.players;

  [currentShip] = humanPlayer.ships;

  // Generate board placement screen
  placeShipView.renderBoard(humanPlayer.board.state);
  controlShipPlacement(currentShip);
};

const init = () => {
  View.setPageTheme();
  View.addHandlerToggleTheme();
  View.addHandlerStartGame(controlStartGame);
};

init();

//  const [carrier, battleship, destroyer, submarine, patroller] =
//  humanPlayer.ships;
