import View from './view';

const gameView = (() => {
  const placeShipScreen = document.querySelector('.screen__ship-placement');
  const gameDisplayScreen = document.querySelector('.screen__game-display');

  const humanBoardEl = document.querySelector('.board__self');
  const computerBoardEl = document.querySelector('.board__opponent');

  const generateBoardMarkup = (square) => `
            <div
              class="square square__${square.isHit ? 'damaged' : 'base'}
                ${square.isHit && square.hasShip ? 'square__has-ship' : ''} "
              data-row="${square.row}"
              data-column="${square.column}"
              data-id="${square.id}"
            ></div> `;

  const renderBoard = (player, boardEl) => {
    const markup = player.board.state
      .map((square) => generateBoardMarkup(square))
      .join('');

    boardEl.innerHTML = `<span class="board__label">${
      player.name === 'computer' ? 'Enemy' : `${player.name}'s`
    } domain</span>`;
    boardEl.insertAdjacentHTML('beforeend', markup);
  };

  const displayScreen = (game) => {
    View.hideEl(placeShipScreen);
    View.unhideEl(gameDisplayScreen);

    const { players } = game;
    const [human, computer] = players;

    renderBoard(human, humanBoardEl);
    renderBoard(computer, computerBoardEl);
  };

  return { displayScreen, renderBoard };
})();

export default gameView;
