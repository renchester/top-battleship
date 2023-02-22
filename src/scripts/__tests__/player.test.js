/* eslint-disable no-undef */

import { Player, Ship, Board } from '../model';

describe('player', () => {
  test.only('checks if computer can successfully place multiple ships inside board', () => {
    const ai = Player('computer');

    ai.ships = [
      Ship(5, 'carrier'),
      Ship(4, 'battleship'),
      Ship(3, 'destroyer'),
    ];

    ai.placeComputerShips();

    // filter out board ship names
    const aiShipsOnBoard = [
      ...new Set(
        ai.board.state
          .map((square) => {
            if (!square.shipName) return 0;

            // eslint-disable-next-line consistent-return
            return square.shipName;
          })
          .filter((shipName) => shipName),
      ),
    ];

    expect(aiShipsOnBoard.length).toBe(3);
    expect(aiShipsOnBoard).toContain('carrier');
    expect(aiShipsOnBoard).toContain('destroyer');
    expect(aiShipsOnBoard).toContain('battleship');

    const ai2 = Player('computer2');

    ai2.ships = [
      Ship(4, 'ship--1'),
      Ship(8, 'ship--2'),
      Ship(4, 'ship--3'),
      Ship(5, 'ship--4'),
      Ship(6, 'ship--5'),
      Ship(7, 'ship--6'),
    ];

    ai2.placeComputerShips();

    const ai2ShipsOnBoard = [
      ...new Set(
        ai2.board.state
          .map((square) => {
            if (!square.shipName) return 0;

            // eslint-disable-next-line consistent-return
            return square.shipName;
          })
          .filter((shipName) => shipName),
      ),
    ];

    expect(ai2ShipsOnBoard.length).toBe(6);
  });

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
});
