// const sampleBoard = Board(10);

const Board = () => {};
const Ship = () => {};

describe('board', () => {
  test('creates a grid with the same height and width', () => {
    expect(Board(10).size).toBe(100);
  });

  test('throws error when given size is less than 0', () => {});

  test('creates squares with correct row, column, and squareID numbers', () => {
    expect(Board(10).state[0].row).toBe(1);
    expect(Board(10).state[0].column).toBe(1);
    expect(Board(10).state[19].row).toBe(2);
    expect(Board(10).state[0].id).toBe(1);
    expect(Board(10).state[99].id).toBe(100);
  });

  test('should be able to place ships at specific coordinates', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([2, 1], sampleShip);

    expect(sampleBoard.state[4].hasShip && sampleBoard.state[7].hasShip);
  });

  test('fills up correct coordinates when placing a ship', () => {
    const sampleBoard = Board(3);

    const horizontalShip = Ship(2);
    const verticalShip = Ship(3);

    // Default vertical
    horizontalShip.orientation = 'horizontal';
    verticalShip.orientation = 'vertical';

    sampleBoard.placeShip([1, 2], horizontalShip);
    sampleBoard.placeShip([3, 1], verticalShip);

    expect(sampleBoard.state[0].hasShip && sampleBoard.state[1].hasShip);
    expect(
      sampleBoard.state[2].hasShip &&
        sampleBoard.state[5].hasShip &&
        sampleBoard.state[8].hasShip,
    );
  });

  test('returns error/false when placing ship on a filled square', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);
    const sampleShip2 = Ship(3);

    sampleBoard.placeShip([1, 3], sampleShip);

    expect(sampleBoard.placeShip([2, 3], sampleShip2)).toThrow();
  });

  test('throws error when placing ship outside board', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    expect(sampleBoard.placeShip([3, 3], sampleShip)).toThrow();
  });

  test('checks if square is successfully hit after receiving attack', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    sampleBoard.placeShip([1, 2], sampleShip);

    sampleBoard.receiveAttack([1, 2]);

    expect(sampleBoard.state[1].isHit);
  });

  //    Recheck
  test('checks if square with ship is hit after receiving attack', () => {
    const sampleBoard = Board(3);
    const sampleShip = Ship(2);

    const player = Player('sample');

    player.board = sampleBoard;
    player.ships.push(sampleShip);

    sampleBoard.placeShip([2, 2], sampleShip);

    let origHP = sampleShip.hitPoints;

    sampleBoard.receiveAttack([3, 2]);
    // Connect receive attack with ship getting hit

    expect(sampleBoard.state[7].hitPoints).toBe(origHP--);
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

    const human = Player('you');
    const ai = Player('computer');

    const game = Game(human, ai);

    human.board = boardOfHuman;
    human.ships.push(shipOfHuman);

    boardOfHuman.placeShip([2, 2], shipOfHuman);
    boardOfHuman.receiveAttack([2, 2]);
    boardOfHuman.receiveAttack([3, 2]);

    // need a function in/after receiveattack that checks if all ships are sunk

    expect(game.winner.name).toBe('computer');
  });
});

describe('ship', () => {
  test('ship gets correct name on init', () => {
    expect(Ship(3).name).toBe('destroyer');
    expect(Ship(5).name).toBe('carrier');
  });

  test('decreases hit points when hit', () => {
    const sampleShip = Ship(3);
    sampleShip.getHit();

    expect(sampleShip.hitPoints).toBe(2);
  });

  test('should be sunk when ship length is equal to hit points', () => {
    const sampleShip = Ship(2);
    sampleShip.getHit();
    sampleShip.getHit();

    expect(sampleShip.isSunk).toBe(true);
  });
});

describe('player', () => {
  test('');
});
