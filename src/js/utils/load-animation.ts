import gsap from 'gsap';
import SplitType from 'split-type';

function initLoadAnimation() {
  const preloaderElements = document.querySelectorAll('.preloader');
  let pageLoaded = false;

  preloaderElements.forEach(function (element) {
    if (element.classList.contains('preloader')) element.classList.remove('preloader');
    if (!element.classList.contains('preloader')) pageLoaded = true;
  });

  if (pageLoaded) initIntroAnimation();

  gsap.set('[text-split]', { opacity: 1 });
}

function initIntroAnimation() {
  new SplitType('[text-split]', {
    types: 'lines, words',
    tagName: 'span',
  });

  const textElement = document.querySelectorAll('[text-split]');

  textElement.forEach(function (element) {
    gsap.fromTo(
      element.querySelectorAll('span'),
      {
        'will-change': 'transform',
        transformOrigin: '50% 100%',
        yPercent: 100,
      },
      {
        ease: 'power2',
        opacity: 1,
        yPercent: 0,
        delay: 0.3,
        stagger: 0.05,
      }
    );
  });
}

export default function loadAnimation() {
  initLoadAnimation();
}
