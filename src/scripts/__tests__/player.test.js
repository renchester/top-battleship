/* eslint-disable no-undef */

import { Player, Ship, Board } from '../model';

describe('player', () => {
  test.skip('computer generates a random attack', () => {
    const human = Player('you');
    const ai = Player('computer');

    // const game = Game(human, ai);

    human.board = Board(3);
    human.board.placeShip([2, 2], Ship(2));

    ai.generateAttack();
  });

  test.skip('computer does not attack already hit squares', () => {});

  test.skip('computer follows natural patterns when attacking', () => {});
});

test('checks if square is successfully hit after attack', () => {
  const player1 = Player('one');
  const player2 = Player('two');

  // Expect player to have board on init

  player2.ships.push(Ship(2, 'patroller'));
  player2.board.placeShip([1, 1], player2.ships[0]);

  player1.attack(player2, [1, 1]);

  expect(player2.board.state[0].isHit).toBeTruthy();
});

test('returns when trying to attack an already hit square', () => {
  const player1 = Player('one');
  const player2 = Player('two');

  player2.ships.push(Ship(2, 'patroller'));
  player2.board.placeShip([1, 1], player2.ships[0]);

  player1.attack(player2, [1, 1]);

  expect(() => player1.attack(player2, [1, 1])).toThrow();
});

test('checks if square with ship loses hitPoints after receiving attack', () => {
  const player1 = Player('one');
  const player2 = Player('two');

  player2.ships.push(Ship(2, 'patroller'));
  player2.board.placeShip([1, 1], player2.ships[0]);
  let origHP = player2.ships[0].hitPoints;

  player1.attack(player2, [1, 1]);

  expect(player2.ships[0].hitPoints).toBe(--origHP);
});
