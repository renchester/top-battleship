import styles from '../sass/main.scss';

import View from './view';

const init = () => {
  View.setPageTheme();
  View.addHandlerToggleTheme();
};

init();
