/* eslint-disable no-undef */
import { Board, Game, Ship } from '../model';

test('determines winner when one player has all their ships sunken', () => {
  const sampleGame = Game();

  const [human, ai] = sampleGame.players;
  human.board = Board(3);
  human.ships = [Ship(1)];
  human.board.placeShip([2, 2], human.ships[0]);

  ai.attack(human, [2, 2]);

  expect(sampleGame.checkWinner()).toBeTruthy();

  const sampleGame2 = Game();

  const [human2, ai2] = sampleGame2.players;
  human2.board = Board(4);
  human2.ships = [Ship(3)];
  human2.board.placeShip([2, 2], human2.ships[0]);

  ai2.attack(human2, [2, 2]);
  ai2.attack(human2, [3, 2]);
  ai2.attack(human2, [4, 2]);

  expect(sampleGame2.checkWinner()).toBeTruthy();
});
