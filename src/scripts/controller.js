/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
import styles from '../sass/main.scss';

import Game from './model/game';

import View from './views/view';
import placeShipView from './views/placeShipView';
import gameView from './views/gameView';

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

const controlAttackHuman = () => {
  const genCoordinates = computerPlayer.generateAttack(humanPlayer);
  gameView.renderBoard(humanPlayer);
  gameView.updateLogs(computerPlayer, genCoordinates);

  if (game.checkWinner()) gameView.displayWinner(computerPlayer);
};

const controlAttackEnemy = (coordinates) => {
  if (!humanPlayer.attack(computerPlayer, coordinates)) return;

  humanPlayer.attack(computerPlayer, coordinates);
  gameView.renderBoard(computerPlayer);
  gameView.updateLogs(humanPlayer, coordinates);

  if (game.checkWinner()) {
    gameView.displayWinner(humanPlayer);
    return;
  }

  controlAttackHuman();
  gameView.addHandlerAttackEnemy(controlAttackEnemy);
};

const controlPlaceShip = (coordinates, ship) => {
  if (!humanPlayer.board.placeShip(coordinates, ship)) return;

  humanPlayer.board.placeShip(coordinates, ship);
  placeShipView.renderBoard(humanPlayer.board.state);
  currentShip.isOnBoard = true;

  // Move to next ship not on board
  currentShip = humanPlayer.ships.find((targetShip) => !targetShip.isOnBoard);

  if (currentShip) {
    controlShipPlacement(currentShip);
  } else if (!currentShip) {
    computerPlayer.placeShipsOnGeneratedPlacements();

    gameView.displayScreen(game);
    gameView.addHandlerAttackEnemy(controlAttackEnemy);
    gameView.addHandlerNewGame(controlStartGame, humanPlayer.name);
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
  computerPlayer.isComputer = true;

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
