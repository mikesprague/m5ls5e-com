import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub, faTwitter, faLinkedin
} from "@fortawesome/free-brands-svg-icons";
// import {
//   faTint, faCode,
//   faSun as faSunLight, faMoonStars, faCloudRain, faCloudSnow, faCloudSleet, faWind as faWIndLight,
//   faFog, faClouds, faCloudsSun, faCloudsMoon, faCloudHail, faHurricane, faThunderstorm, faTornado
// } from "@fortawesome/pro-light-svg-icons";

export function initFontAwesomeIcons() {
  library.add(
    faGithub,
    faTwitter,
    faLinkedin,
  );
  dom.watch();
}
