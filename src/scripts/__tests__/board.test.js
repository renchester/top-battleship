/* eslint-disable no-undef */

import Board from '../model/board';
import Ship from '../model/ship';

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
    sampleBoard.placeShip([1, 1], Ship(2));
    sampleBoard.placeShip([1, 3], Ship(2));

    // ship 1
    expect(sampleBoard.state[0].hasShip).toBe(true);
    expect(sampleBoard.state[3].hasShip).toBe(true);

    // ship 2
    expect(sampleBoard.state[2].hasShip).toBe(true);
    expect(sampleBoard.state[5].hasShip).toBe(true);

    expect(sampleBoard.state[1].hasShip).toBe(false);
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
});
