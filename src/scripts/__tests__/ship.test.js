/* eslint-disable no-undef */

import Ship from '../model/ship';

describe('ship', () => {
  test('decreases hit points when hit', () => {
    const sampleShip = Ship(3);
    sampleShip.getHit();

    expect(sampleShip.hitPoints).toBe(2);
  });

  test('should be sunk when ship hit points is equal to zero', () => {
    const sampleShip = Ship(2);
    sampleShip.getHit();
    sampleShip.getHit();

    expect(sampleShip.isSunk).toBeTruthy();
  });

  test('rotates correctly', () => {
    const sampleShip = Ship(2);

    expect(sampleShip.orientation).toBe('vertical');

    sampleShip.rotate();

    expect(sampleShip.orientation).toBe('horizontal');
  });
});
