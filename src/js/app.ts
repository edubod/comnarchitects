import loadAnimation from './utils/load-animation';
import mouseFollower from './utils/mouse-follower';
import scrollAnimation from './utils/scroll-animation';

window.Webflow ||= [];
window.Webflow.push(() => {
  scrollAnimation();
  mouseFollower();
  loadAnimation();
});
