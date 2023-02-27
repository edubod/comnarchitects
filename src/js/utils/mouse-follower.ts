import gsap from 'gsap';
import MouseFollower from 'mouse-follower';

function initMouseFollower() {
  MouseFollower.registerGSAP(gsap);

  if (window.matchMedia('(pointer:fine)').matches) {
    new MouseFollower({
      visible: false,
      visibleOnState: true,
      speed: 1,
    });
  }
}

export default function mouseFollower() {
  initMouseFollower();
}
