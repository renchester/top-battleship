const View = (() => {
  const themeSwitcher = document.querySelector('#themeSwitch');

  const addHandlerToggleTheme = () => {
    themeSwitcher.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('preferredTheme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('preferredTheme', 'light');
      }
    });
  };

  const setPageTheme = () => {
    const preferredTheme = localStorage.getItem('preferredTheme');

    if (!preferredTheme || preferredTheme === 'light') {
      document.body.classList.remove('dark-mode');
      themeSwitcher.checked = false;
    } else if (preferredTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeSwitcher.checked = true;
    }
  };

  return {
    addHandlerToggleTheme,
    setPageTheme,
  };
})();

export default View;
