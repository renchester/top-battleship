/* eslint-disable no-undef */

import Player from '../model/player';
import Ship from '../model/ship';
import Board from '../model/board';

describe('player', () => {
  let player1;
  let player2;

  beforeEach(() => {
    player1 = Player('human');
    player2 = Player('computer');
  });

  test('checks if computer can successfully place multiple ships inside board', () => {
    player1.ships = [
      Ship(5, 'carrier'),
      Ship(4, 'battleship'),
      Ship(3, 'destroyer'),
    ];

    player1.placeShipsOnGeneratedPlacements();

    // filter out board ship names
    const shipsOnBoard = [
      ...new Set(
        player1.board.state
          .map((square) => {
            if (!square.shipName) return 0;
            return square.shipName;
          })
          .filter((shipName) => shipName),
      ),
    ];

    expect(shipsOnBoard).toHaveLength(3);
    expect(shipsOnBoard).toContain('carrier');
    expect(shipsOnBoard).toContain('destroyer');
    expect(shipsOnBoard).toContain('battleship');
  });

  test('computer generates a random attack', () => {
    player1.board = Board(3);
    player1.ships = [Ship(2)];
    player1.board.placeShip([2, 2], player1.ships[0]);
    player2.generateAttack(player1);

    expect(player1.board.state.find((square) => square.isHit)).toHaveProperty(
      'isHit',
      true,
    );
  });

  test.skip('computer follows natural patterns when attacking', () => {});

  test('checks if square is successfully hit after attack', () => {
    player2.ships.push(Ship(2, 'patroller'));
    player2.board.placeShip([1, 1], player2.ships[0]);

    player1.attack(player2, [1, 1]);

    expect(player2.board.state[0].isHit).toBe(true);
  });

  test('returns when trying to attack an already hit square', () => {
    player2.ships.push(Ship(2, 'patroller'));
    player2.board.placeShip([1, 1], player2.ships[0]);

    player1.attack(player2, [1, 1]);

    expect(player1.attack(player2, [1, 1])).toBe(false);
  });

  test('checks if square with ship loses hitPoints after receiving attack', () => {
    player2.ships.push(Ship(2, 'patroller'));
    player2.board.placeShip([1, 1], player2.ships[0]);

    let origHP = player2.ships[0].hitPoints;

    player1.attack(player2, [1, 1]);

    expect(player2.ships[0].hitPoints).toBe(--origHP);
  });
});
