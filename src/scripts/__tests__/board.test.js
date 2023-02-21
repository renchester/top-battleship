/* eslint-disable no-undef */

import { Board, Ship, Player } from '../model';

describe('board', () => {
  test('creates a grid with the same height and width', () => {
    expect(Board(10).size).toBe(100);
  });

  test('creates squares with correct row and column numbers', () => {
    expect(Board(10).state[0].row).toBe(1);
    expect(Board(10).state[0].column).toBe(1);
    expect(Board(10).state[19].row).toBe(2);
    expect(Board(3).state[4].row).toBe(2);
    expect(Board(3).state[4].column).toBe(2);
    expect(Board(3).state[8].row).toBe(3);
    expect(Board(3).state[8].column).toBe(3);
  });

  test('creates squares with correct squareID numbers', () => {
    expect(Board(10).state[0].id).toBe(1);
    expect(Board(10).state[99].id).toBe(100);
    expect(Board(10).state[49].id).toBe(50);
    expect(Board(3).state[8].id).toBe(9);
    expect(Board(2).state[1].id).toBe(2);
  });

  test('should be able to place ships at specific coordinates', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2, 'destroyer');

    sampleBoard.placeShip([2, 1], sampleShip);

    expect(sampleBoard.state[3].hasShip).toBeTruthy();
    expect(sampleBoard.state[6].hasShip).toBeTruthy();
    expect(sampleBoard.state[6].shipName).toBe('destroyer');
  });

  test('fills up correct coordinates when placing a ship', () => {
    const sampleBoard = Board(3);

    const horizontalShip = Ship(2, 'patroller');
    const verticalShip = Ship(3, 'destroyer');

    // Default vertical
    horizontalShip.orientation = 'horizontal';
    verticalShip.orientation = 'vertical';

    sampleBoard.placeShip([1, 1], horizontalShip);
    sampleBoard.placeShip([1, 3], verticalShip);

    expect(sampleBoard.state[0].hasShip).toBeTruthy();
    expect(sampleBoard.state[1].hasShip).toBeTruthy();
    expect(sampleBoard.state[0].hasShip).toEqual(sampleBoard.state[1].hasShip);

    expect(sampleBoard.state[2].hasShip).toBeTruthy();
    expect(sampleBoard.state[5].hasShip).toBeTruthy();
    expect(sampleBoard.state[8].hasShip).toBeTruthy();
    expect(sampleBoard.state[2].hasShip).toEqual(sampleBoard.state[5].hasShip);
    expect(sampleBoard.state[5].hasShip).toEqual(sampleBoard.state[8].hasShip);
  });

  test('returns error/false when placing ship on a filled square', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);
    const sampleShip2 = Ship(3);

    sampleBoard.placeShip([1, 3], sampleShip);

    expect(() => sampleBoard.placeShip([2, 3], sampleShip2)).toThrow();
  });

  test('throws error when placing ship outside board', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    expect(() => sampleBoard.placeShip([3, 3], sampleShip)).toThrow();
  });

  test('finds correct square using square id number', () => {
    const sampleBoard = Board(3);

    expect(sampleBoard.findSquareWithID(3)).toEqual(sampleBoard.state[2]);
  });

  test('finds correct square using row and column number', () => {
    const sampleBoard = Board(3);

    expect(sampleBoard.findSquareWithRowCol([2, 2])).toEqual(
      sampleBoard.state[4],
    );
  });

  test('hits all surrounding squares around ship when it is sunk', () => {
    const player1 = Player('one');
    const player2 = Player('two');

    player2.ships.push(Ship(1, 'patroller'));
    player2.board = Board(3);
    player2.board.placeShip([2, 2], player2.ships[0]);

    player1.attack(player2, [2, 2]);

    expect(player2.board.state.every((square) => square.isHit)).toBeTruthy();
  });
});
