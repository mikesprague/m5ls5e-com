import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

export function initFontAwesomeIcons() {
  library.add(
    faGithub,
    faTwitter,
    faLinkedin,
  );
  dom.watch();
}
