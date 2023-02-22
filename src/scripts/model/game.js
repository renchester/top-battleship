/* eslint-disable no-return-assign */
import Player from './player';

const Game = () => ({
  players: [Player('human player'), Player('computer')],
  playStatus: true,
  currentPlayer: null,
  checkWinner() {
    return this.players.find((player) => player.isWinner);
  },
  goToNextPlayer() {
    this.players.forEach((player) => (player.isPlaying = !player.isPlaying));
  },
});

export default Game;
