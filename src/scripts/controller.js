import styles from '../sass/main.scss';

import Game from './model/game';
import View from './views/view';

let game;

const controlStartGame = (name) => {
  // Generate board placement screen
  game = Game();
};

const init = () => {
  View.setPageTheme();
  View.addHandlerToggleTheme();
  View.addHandlerStartGame(controlStartGame);
};

init();
