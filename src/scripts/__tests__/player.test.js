/* eslint-disable no-undef */

describe('player', () => {
  test('computer generates a random attack', () => {
    const human = Player('you');
    const ai = Player('computer');

    const game = Game(human, ai);

    human.board = Board(3);
    human.board.placeShip([2, 2], Ship(2));

    ai.generateAttack();
  });
});
