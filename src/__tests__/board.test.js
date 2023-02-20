// const sampleBoard = Board(10);

const Board = () => {};
const Ship = () => {};

describe('board', () => {
  test('creates a grid with the same height and width', () => {
    expect(Board(10).size).toBe(100);
  });

  test('throws error when given size is less than 0', () => {});

  test('creates squares with correct row, column, and squareID numbers', () => {
    expect(Board(10).state[0].row).toBe(10);
    expect(Board(10).state[0].column).toBe(1);
    expect(Board(10).state[0].id).toBe(90);
  });

  test('should be able to place ships at specific coordinates', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([1, 3], sampleShip);

    expect(sampleBoard.state[3].hasShip && sampleBoard.state[6].hasShip);
  });

  test('fills up correct coordinates when placing a ship', () => {
    const sampleBoard = Board(3);

    const horizontalShip = Ship(2);
    const verticalShip = Ship(3);

    horizontalShip.orientation = 'horizontal';
    verticalShip.orientation = 'vertical';

    sampleBoard.placeShip([1, 2], horizontalShip);
    sampleBoard.placeShip([3, 1], verticalShip);

    expect(sampleBoard.state[7].hasShip && sampleBoard.state[8].hasShip);
    expect(
      sampleBoard.state[0].hasShip &&
        sampleBoard.state[3].hasShip &&
        sampleBoard.state[6].hasShip,
    );
  });

  test('returns error/false when placing ship on a filled square', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);
    const sampleShip2 = Ship(3);

    sampleBoard.placeShip([1, 3], sampleShip);

    expect(sampleBoard.placeShip([1, 2], sampleShip2)).toThrow();
  });

  test('throws error when placing ship outside board', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    expect(sampleBoard.placeShip([1, 1], sampleShip)).toThrow();
  });

  test('checks if square is successfully hit after receiving attack', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([1, 2], sampleShip);

    sampleBoard.receiveAttack([1, 3]);

    expect(sampleBoard.state[0].isHit);
  });

  //    Recheck
  test('checks if square with ship is hit after receiving attack', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([1, 2], sampleShip);

    sampleBoard.receiveAttack([1, 2]);

    expect(sampleBoard.state[3].isHit);
  });

  test('throws error when trying to hit a filled square', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([1, 2], sampleShip);

    sampleBoard.receiveAttack([1, 2]);

    expect(sampleBoard.receiveAttack([1, 2])).toThrow();
  });

  //   Recheck
  test("make player win when all their opponent's ships are sunk", () => {
    const boardOfHuman = Board(3);
    const shipOfHuman = Ship(2);

    const boardOfAI = Board(3);
    const shipOfAI = Ship(2);

    const human = Player();
    const ai = Player();
  });
});

describe('ship', () => {
  test('decreases hit points when hit', () => {
    expect(Ship(3));
  });

  test('should be sunk when ship length is equal to hit points', () => {});

  //   test('should rotate when orientation is changed', () => {});
});

describe('player', () => {
  test('');
});
