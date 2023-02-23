import View from './view';

const gameView = (() => {
  const placeShipScreen = document.querySelector('.screen__ship-placement');
  const gameDisplayScreen = document.querySelector('.screen__game-display');

  const humanBoardEl = document.querySelector('.board__self');
  const computerBoardEl = document.querySelector('.board__opponent');
  const winnerOverlay = document.querySelector('.overlay__winner-display');

  const btnReset = document.querySelector('.btn__reset');
  const btnCloseOverlay = document.querySelector('.btn__close-overlay');

  const generateBoardMarkup = (square) => `
    <div class="square square__${square.isHit ? 'damaged' : 'base'} ${
    square.isHit && square.hasShip ? 'square__has-ship' : ''
  }" data-row="${square.row}" data-column="${square.column}" data-id="${
    square.id
  }"></div>`;

  const renderBoard = (player) => {
    const boardEl = player.isComputer ? computerBoardEl : humanBoardEl;

    const markup = player.board.state
      .map((square) => generateBoardMarkup(square))
      .join('');

    boardEl.innerHTML = `<span class="board__label">${
      player.isComputer ? 'Enemy' : `${player.name}'s`
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

  const addHandlerAttackEnemy = (handler) => {
    const enemySquares = [...computerBoardEl.querySelectorAll('.square')];

    enemySquares.forEach((square) =>
      square.addEventListener('click', (e) => {
        const { row, column } = e.target.dataset;

        handler([+row, +column]);
      }),
    );
  };

  const addHandlerNewGame = (handler, name) => {
    btnReset.addEventListener('click', (e) => {
      View.hideEl(gameDisplayScreen);
      View.unhideEl(placeShipScreen);

      handler(name);
    });
  };

  const displayWinner = (player) => {
    View.unhideEl(winnerOverlay);
    btnReset.textContent = 'Start New Game';

    winnerOverlay.querySelector(
      '.message__winner-main',
    ).textContent = `The winner is ${player.name}!`;
    winnerOverlay.querySelector('.message__winner-sub').textContent = `${
      player.isComputer
        ? 'Too bad! Now your domain has been overrun by the enemy!'
        : 'Congratulations! You have beat out the enemy. Your domain is in good hands.'
    }`;

    btnCloseOverlay.addEventListener('click', () => {
      View.hideEl(winnerOverlay);
    });
  };

  return {
    displayScreen,
    renderBoard,
    addHandlerAttackEnemy,
    addHandlerNewGame,
    displayWinner,
  };
})();

export default gameView;
