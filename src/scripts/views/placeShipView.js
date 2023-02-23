import View from './view';

const placeShipView = (() => {
  const boardEl = document.querySelector('.board__ship-placement');
  const shipsEl = document.querySelector('.ships__display');

  const btnRotate = document.querySelector('.btn__rotate-ship');

  const generateSquareMarkup = (square) => `
            <div
              class="square square__empty ${
                square.hasShip ? 'square__filled' : ''
              }"
              data-row="${square.row}"
              data-column="${square.column}"
              data-id="${square.id}"
            ></div>
  `;

  const renderBoard = (boardArr) => {
    const markup = boardArr
      .map((square) => generateSquareMarkup(square))
      .join('');

    boardEl.innerHTML = '';
    boardEl.insertAdjacentHTML('afterbegin', markup);
  };

  const addHandlerFindShipSquares = (ship, handler) => {
    const squares = [...boardEl.querySelectorAll('.square')];

    squares.forEach((el) => {
      el.addEventListener('mouseenter', (e) => {
        const { row, column } = e.target.dataset;

        e.target.classList.add('square__placement-origin');

        const nextSquares = handler([+row, +column], ship);

        if (!nextSquares || nextSquares.length !== ship.length) return;

        nextSquares.forEach((id) => {
          boardEl
            .querySelector(`.square[data-id="${id}"]`)
            .classList.add('square__placement-adjacent');
        });
      });

      el.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('square__placement-origin');
        squares.forEach((square) =>
          square.classList.remove('square__placement-adjacent'),
        );
      });
    });
  };

  const addHandlerRotateShip = (ship, handler) => {
    btnRotate.addEventListener('click', () => {
      handler(ship);
    });
  };

  const addHandlerPlaceShip = (ship, handler) => {
    const squares = [...boardEl.querySelectorAll('.square')];

    squares.forEach((el) => {
      el.addEventListener('click', (e) => {
        const { row, column } = e.target.dataset;

        handler([+row, +column], ship);
      });
    });
  };

  return {
    renderBoard,
    addHandlerFindShipSquares,
    addHandlerRotateShip,
    addHandlerPlaceShip,
  };
})();

export default placeShipView;
