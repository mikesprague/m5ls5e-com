import '../scss/styles.scss';
import { initFontAwesomeIcons } from './modules/icons';

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    initFontAwesomeIcons();
    console.info('🙊 If you know, you know');
  }
};
