import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reeller, ScrollerPlugin } from 'reeller';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

ScrollTrigger.config({
  ignoreMobileResize: true,
});

const mm = gsap.matchMedia();
const breakPointLg = 992;
const breakPointSm = 480;

function initSmoothScroll() {
  const lenis = new Lenis({
    smooth: true,
  });

  lenis.on('scroll', () => ScrollTrigger.update());

  const scrollFn = (time: any) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };

  requestAnimationFrame(scrollFn);
  observeEditor(lenis);
}

function observeEditor(smoothScroll: { destroy: () => void }) {
  const html = document.documentElement;
  const config = { attributes: true, childList: false, subtree: false };

  const callback = (mutationList: any) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes') {
        const btn = document.querySelector('.w-editor-bem-EditSiteButton');
        const bar = document.querySelector('.w-editor-bem-EditorMainMenu');
        const addTrigger = (target: Element) =>
          target.addEventListener('click', () => smoothScroll.destroy());

        if (btn) addTrigger(btn);
        if (bar) addTrigger(bar);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(html, config);
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
  const targetStickyImage = triggerElement.querySelector('.intro_image-sticky-img');

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

function initImageScaleScroll() {
  const triggerElement = document.querySelectorAll('.showcase_project');

  triggerElement.forEach(function (element) {
    const targetElement = element.querySelector('.showcase_project-img');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.fromTo(
      targetElement,
      {
        scale: '1',
      },
      {
        scale: '1.05',
        duration: 1,
      }
    );
  });
}

function initHeadlineScroll() {
  new SplitType('[headline-split]', {
    types: 'lines, words',
    tagName: 'span',
  });

  const textElement = document.querySelectorAll('[headline-split]');

  textElement.forEach(function (element) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'bottom top',
      },
    });

    tl.fromTo(
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
        stagger: 0.05,
      }
    );
  });
}

export default function scrollAnimation() {
  initSmoothScroll();
  initShowcaseMarquee();
  initStudioMarquee();
  initLogoScroll();
  initIntroImageScroll();
  initImageScaleScroll();
  initHeadlineScroll();
}
