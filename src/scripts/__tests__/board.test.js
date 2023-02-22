/* eslint-disable no-undef */

import { Board, Ship } from '../model';

describe('board', () => {
  let sampleBoard;

  beforeEach(() => {
    sampleBoard = Board(3);
  });

  test('creates a grid with the same height and width', () => {
    expect(sampleBoard.size).toBe(9);
  });

  test('creates squares with correct row and column numbers', () => {
    expect(sampleBoard.state[4].row).toBe(2);
    expect(sampleBoard.state[4].column).toBe(2);
    expect(sampleBoard.state[8].row).toBe(3);
    expect(sampleBoard.state[8].column).toBe(3);
  });

  test('creates squares with correct squareID numbers', () => {
    expect(sampleBoard.state[8].id).toBe(9);
  });

  test('should be able to place ships at specific coordinates', () => {
    sampleBoard.placeShip([2, 1], Ship(2, 'destroyer'));

    expect(sampleBoard.state[3].hasShip).toBe(true);
    expect(sampleBoard.state[6].hasShip).toBe(true);
    expect(sampleBoard.state[6].shipName).toBe('destroyer');
  });

  test('fills up correct coordinates when placing a ship', () => {
    const horizontalShip = Ship(2, 'patroller');
    const verticalShip = Ship(3, 'destroyer');

    horizontalShip.orientation = 'horizontal';
    verticalShip.orientation = 'vertical';

    sampleBoard.placeShip([1, 1], horizontalShip);
    sampleBoard.placeShip([1, 3], verticalShip);

    // horizontal ship
    expect(sampleBoard.state[0].hasShip).toBe(true);
    expect(sampleBoard.state[1].hasShip).toBe(true);

    // vertical ship
    expect(sampleBoard.state[2].hasShip).toBe(true);
    expect(sampleBoard.state[5].hasShip).toBe(true);
    expect(sampleBoard.state[8].hasShip).toBe(true);
  });

  test('returns error/false when placing ship on a filled square', () => {
    sampleBoard.placeShip([1, 3], Ship(2));

    expect(sampleBoard.placeShip([2, 3], Ship(3))).toBe(false);
  });

  test('returns error/false when placing ship outside board', () => {
    expect(sampleBoard.placeShip([3, 3], Ship(2))).toBe(false);
  });

  test('finds correct square using square id number', () => {
    expect(sampleBoard.findSquareWithID(3)).toEqual(sampleBoard.state[2]);
  });

  test('finds correct square using row and column number', () => {
    expect(sampleBoard.findSquareWithRowCol([2, 2])).toEqual(
      sampleBoard.state[4],
    );
  });

  test('hits all surrounding squares around ship when it is sunk', () => {
    sampleBoard.placeShip([2, 2], Ship(1));
    sampleBoard.explodeShip([2, 2]);
    expect(sampleBoard.state.every((square) => square.isHit)).toBe(true);
  });

  test('explodes squares around multiple ships', () => {
    sampleBoard = Board(10);
    sampleBoard.placeShip([1, 1], Ship(5, 'carrier'));
    sampleBoard.placeShip([5, 5], Ship(2, 'patroller'));

    sampleBoard.explodeShip([1, 1]);
    sampleBoard.explodeShip([5, 5]);

    expect(sampleBoard.state.filter((square) => square.isHit).length).toEqual(
      24,
    );
  });

  test('exploding works even on overlapping squares', () => {
    sampleBoard.placeShip([2, 1], Ship(1, 'bomb1'));
    sampleBoard.placeShip([2, 3], Ship(1, 'bomb2'));

    sampleBoard.explodeShip([2, 1]);
    sampleBoard.explodeShip([2, 3]);

    expect(sampleBoard.state.every((square) => square.isHit)).toBe(true);
  });
});
