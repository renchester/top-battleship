/* eslint-disable no-undef */

describe('ship', () => {
  test('decreases hit points when hit', () => {
    const sampleShip = Ship(3);
    sampleShip.getHit();

    expect(sampleShip.hitPoints).toBe(2);
  });

  test('should be sunk when ship length is equal to hit points', () => {
    const sampleShip = Ship(2);
    sampleShip.getHit();
    sampleShip.getHit();

    expect(sampleShip.isSunk).toBeTruthy();
  });

  test('returns correct coordinates', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([2, 2], sampleShip);

    const expectedCoordinates = [
      [2, 2],
      [3, 2],
    ];

    expect(sampleShip.coordinates).toEqual(expectedCoordinates);
  });

  test('returns correct coordinates on horizontal orientation', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleShip.rotate();
    sampleBoard.placeShip([2, 2], sampleShip);

    const expectedCoordinates = [
      [2, 2],
      [2, 3],
    ];

    expect(sampleShip.coordinates).toEqual(expectedCoordinates);
  });
});
