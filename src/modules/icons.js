import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export function initFontAwesomeIcons() {
  library.add(faGithub, faTwitter, faLinkedin);
  dom.watch();
}
