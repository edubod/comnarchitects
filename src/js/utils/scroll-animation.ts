import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MouseFollower from 'mouse-follower';
import { Reeller, ScrollerPlugin } from 'reeller';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

ScrollTrigger.config({
  ignoreMobileResize: true,
});

const mm = gsap.matchMedia();
const breakPointLg = 992;
//const breakPointMd = 768;
const breakPointSm = 480;

function initSmoothScroll() {
  const lenis = new Lenis({
    //lerp: 0.2,
    smooth: true,
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  const scrollFn = (time: any) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };

  requestAnimationFrame(scrollFn);
}

function initShowcaseMarquee() {
  Reeller.registerGSAP(gsap);
  Reeller.use(ScrollerPlugin);

  new Reeller({
    container: '.showcase_reel',
    wrapper: '.showcase_reel-wrap',
    itemSelector: '.showcase_reel-item',
    speed: 10,
    plugins: {
      scroller: {
        speed: 1,
        multiplier: 0.3,
        threshold: 1,
        reversed: false,
      },
    },
  });
}

function initStudioMarquee() {
  Reeller.registerGSAP(gsap);
  Reeller.use(ScrollerPlugin);

  new Reeller({
    container: '.studio_reel',
    wrapper: '.studio_reel-wrap',
    itemSelector: '.studio_reel-item',
    speed: 10,
    plugins: {
      scroller: {
        speed: 1,
        multiplier: 0.3,
        threshold: 1,
        reversed: false,
      },
    },
  });

  new Reeller({
    container: '.studio_reel.is-reverse',
    wrapper: '.studio_reel-wrap',
    itemSelector: '.studio_reel-item',
    speed: 10,
    plugins: {
      scroller: {
        speed: 1,
        multiplier: 0.3,
        threshold: 1,
        reversed: true,
      },
    },
  });
}

function initMouseFollower() {
  MouseFollower.registerGSAP(gsap);

  new MouseFollower({
    visible: false,
    visibleOnState: true,
    speed: 1,
  });
}

function initLogoScroll() {
  const triggerElement = document.querySelector('.section_header');
  if (!triggerElement) return;
  const targetElement = document.querySelector('.navbar_logo');
  if (!targetElement) return;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPointLg}px)`,
      isTablet: `(max-width: ${breakPointLg - 1}px)`,
      isMobile: `(max-width: ${breakPointSm}px)`,
    },
    (context) => {
      if (!context.conditions) return;
      const { isMobile } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.fromTo(
        targetElement,
        {
          'will-change': 'transform',
          scale: '1',
          top: '100%',
          y: '-100%',
        },
        {
          scale: isMobile ? '1' : '.5',
          top: '0%',
          y: '0%',
          duration: 1,
        }
      );
    }
  );
}

function initIntroImageScroll() {
  const triggerElement = document.querySelector('.intro_image-wrap');
  if (!triggerElement) return;
  const targetStickyElement = triggerElement.querySelector('.intro_image-element');

  mm.add(
    {
      isDesktop: `(min-width: ${breakPointLg}px)`,
      isTablet: `(max-width: ${breakPointLg - 1}px)`,
      isMobile: `(max-width: ${breakPointSm}px)`,
    },
    (context) => {
      if (!context.conditions) return;
      const { isTablet } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl.fromTo(
        targetStickyElement,
        {
          y: isTablet ? '-10vh' : '-20vh',
          clipPath: isTablet ? 'inset(5% 20% 40% 20%)' : 'inset(5% 60% 70% 10%)',
        },
        {
          y: '0vh',
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
        }
      );
    }
  );
}

export default function scrollAnimation() {
  initSmoothScroll();
  initShowcaseMarquee();
  initStudioMarquee();
  initMouseFollower();
  initLogoScroll();
  initIntroImageScroll();
}
