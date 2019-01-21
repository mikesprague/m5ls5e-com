import '../scss/styles.scss';
import { initFontAwesomeIcons } from './modules/icons';

document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initFontAwesomeIcons();
    console.info(`🙊 If you know, you know`);
  }
};
