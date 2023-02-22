/* eslint-disable no-undef */

import Ship from '../model/ship';
import Board from '../model/board';
import Game from '../model/game';

describe('game', () => {
  let sampleGame;
  let player1;
  let player2;

  beforeEach(() => {
    sampleGame = Game();
    [player1, player2] = sampleGame.players;
    player1.board = Board(3);
    player1.ships = [Ship(1)];

    player1.board.placeShip([2, 2], player1.ships[0]);
  });

  test('determines winner when one player has all their ships sunken', () => {
    player2.attack(player1, [2, 2]);

    expect(sampleGame.checkWinner()).toHaveProperty('isWinner', true);
  });

  test('checks that winner is not yet defined by default', () => {
    expect(sampleGame.checkWinner()).toBeFalsy();
  });

  test('checks if current player value is toggled', () => {
    player1.isPlaying = true;

    sampleGame.goToNextPlayer();

    expect(player1.isPlaying).toBe(false);
    expect(player2.isPlaying).toBe(true);
  });
});
