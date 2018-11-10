window.TurbolinksAnimate = window.TurbolinksAnimate || new function() {
  this.options = {};
  this.inline = false;
  this.element = null;
  this.elements = null;
  this.disappearing = false;
  this.initialized = false;
  this.animations = [
    {name: 'fadeIn', disappear: 'fadeOut', reverse: null},
    {name: 'fadeOut', disappear: true, reverse: null},
    {name: 'fadeInUp', disappear: 'fadeOutUp', reverse: 'fadeInDown'},
    {name: 'fadeOutUp', disappear: true, reverse: 'fadeOutDown'},
    {name: 'fadeInDown', disappear: 'fadeOutDown', reverse: 'fadeInUp'},
    {name: 'fadeOutDown', disappear: true, reverse: 'fadeOutUp'},
    {name: 'fadeInLeft', disappear: 'fadeOutLeft', reverse: 'fadeInRight'},
    {name: 'fadeOutLeft', disappear: true, reverse: 'fadeOutRight'},
    {name: 'fadeInRight', disappear: 'fadeOutRight', reverse: 'fadeInLeft'},
    {name: 'fadeOutRight', disappear: true, reverse: 'fadeOutLeft'},
    {name: 'fadeInUpBig', disappear: 'fadeOutUpBig', reverse: 'fadeInDownBig'},
    {name: 'fadeOutUpBig', disappear: true, reverse: 'fadeOutDownBig'},
    {name: 'fadeInDownBig', disappear: 'fadeOutDownBig', reverse: 'fadeInUpBig'},
    {name: 'fadeOutDownBig', disappear: true, reverse: 'fadeOutUpBig'},
    {name: 'fadeInLeftBig', disappear: 'fadeOutLeftBig', reverse: 'fadeInRightBig'},
    {name: 'fadeOutLeftBig', disappear: true, reverse: 'fadeOutRightBig'},
    {name: 'fadeInRightBig', disappear: 'fadeOutRightBig', reverse: 'fadeInLeftBig'},
    {name: 'fadeOutRightBig', disappear: true, reverse: 'fadeOutLeftBig'},
    {name: 'bounceIn', disappear: 'bounceOut', reverse: null},
    {name: 'bounceOut', disappear: true, reverse: null},
    {name: 'bounceInUp', disappear: 'bounceOutUp', reverse: 'bounceInDown'},
    {name: 'bounceOutUp', disappear: true, reverse: 'bounceOutDown'},
    {name: 'bounceInDown', disappear: 'bounceOutDown', reverse: 'bounceInUp'},
    {name: 'bounceOutDown', disappear: true, reverse: 'bounceOutUp'},
    {name: 'bounceInLeft', disappear: 'bounceOutLeft', reverse: 'bounceInRight'},
    {name: 'bounceOutLeft', disappear: true, reverse: 'bounceOutRight'},
    {name: 'bounceInRight', disappear: 'bounceOutRight', reverse: 'bounceInLeft'},
    {name: 'bounceOutRight', disappear: true, reverse: 'bounceOutLeft'},
    {name: 'flipInX', disappear: 'flipOutX', reverse: 'flipInY'},
    {name: 'flipOutX', disappear: true, reverse: 'flipOutY'},
    {name: 'flipInY', disappear: 'flipOutY', reverse: 'flipInX'},
    {name: 'flipOutY', disappear: true, reverse: 'flipOutX'},
    {name: 'lightSpeedIn', disappear: 'lightSpeedOut', reverse: null},
    {name: 'lightSpeedOut', disappear: true, reverse: null},
    {name: 'rotateIn', disappear: 'rotateOut', reverse: null},
    {name: 'rotateOut', disappear: true, reverse: null},
    {name: 'rotateInDownLeft', disappear: 'rotateOutDownLeft', reverse: 'rotateInUpRight'},
    {name: 'rotateOutDownLeft', disappear: true, reverse: 'rotateOutUpRight'},
    {name: 'rotateInDownRight', disappear: 'rotateOutDownRight', reverse: 'rotateInUpLeft'},
    {name: 'rotateOutDownRight', disappear: true, reverse: 'rotateOutUpLeft'},
    {name: 'rotateInUpLeft', disappear: 'rotateOutUpLeft', reverse: 'rotateInDownRight'},
    {name: 'rotateOutUpLeft', disappear: true, reverse: 'rotateOutDownRight'},
    {name: 'rotateInUpRight', disappear: 'rotateOutUpRight', reverse: 'rotateInDownLeft'},
    {name: 'rotateOutUpRight', disappear: true, reverse: 'rotateOutDownLeft'},
    {name: 'rollIn', disappear: 'rollOut', reverse: null},
    {name: 'rollOut', disappear: true, reverse: null},
    {name: 'zoomIn', disappear: 'zoomOut', reverse: null},
    {name: 'zoomOut', disappear: true, reverse: null},
    {name: 'zoomInUp', disappear: 'zoomOutUp', reverse: 'zoomInDown'},
    {name: 'zoomOutUp', disappear: true, reverse: 'zoomOutDown'},
    {name: 'zoomInDown', disappear: 'zoomOutDown', reverse: 'zoomInUp'},
    {name: 'zoomOutDown', disappear: true, reverse: 'zoomOutUp'},
    {name: 'zoomInLeft', disappear: 'zoomOutLeft', reverse: 'zoomInRight'},
    {name: 'zoomOutLeft', disappear: true, reverse: 'zoomOutRight'},
    {name: 'zoomInRight', disappear: 'zoomOutRight', reverse: 'zoomInLeft'},
    {name: 'zoomOutRight', disappear: true, reverse: 'zoomOutLeft'},
    {name: 'slideInUp', disappear: 'slideOutUp', reverse: 'slideInDown'},
    {name: 'slideOutUp', disappear: true, reverse: 'slideOutDown'},
    {name: 'slideInDown', disappear: 'slideOutDown', reverse: 'slideInUp'},
    {name: 'slideOutDown', disappear: true, reverse: 'slideOutUp'},
    {name: 'slideInLeft', disappear: 'slideOutLeft', reverse: 'slideInRight'},
    {name: 'slideOutLeft', disappear: true, reverse: 'slideOutRight'},
    {name: 'slideInRight', disappear: 'slideOutRight', reverse: 'slideInLeft'},
    {name: 'slideOutRight', disappear: true, reverse: 'slideOutLeft'}
  ];
  let array = [];
  this.animations.forEach((animation) => array.push(animation.name));
  this.animateClasses = array;

  this.init = (options) => {
    let defaults = {
      element: document.querySelector('body'),
      animation: 'fadein',
      duration: '0.3s',
      delay: false,
      reversedDisappearing: false,
      breakpoints: [
        {name: 'mobile', width: 500},
        {name: 'tablet', width: 1024},
        {name: 'desktop', width: 1440}
      ],
      customListeners: false
    };
    options = extend({}, defaults, options);

    TurbolinksAnimate.element = options.element;
    TurbolinksAnimate.setOptions(options);
    if ('scrollRestoration' in history)
      history.scrollRestoration = 'manual';

    if (TurbolinksAnimate.initialized == false && options.customListeners == false) {
      document.addEventListener('turbolinks:request-start', () => {
        TurbolinksAnimate.disappear();
      });
      window.addEventListener('popstate', () => {
        TurbolinksAnimate.disappear();
      });
      let ignoreBeforeunload = false;
      document.querySelectorAll('a[href^=mailto]').forEach((element) => element.addEventListener('click', () => ignoreBeforeunload = true));
      window.addEventListener('beforeunload', () => {
        if (!ignoreBeforeunload)
          TurbolinksAnimate.disappear();
        ignoreBeforeunload = false;
      });
      document.addEventListener('turbolinks:before-render', (event) => {
        TurbolinksAnimate.prepareTransition(event.data.newBody);
      });
      document.addEventListener('turbolinks:render', () => {
        TurbolinksAnimate.transition();
      });
    }

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('click', () => {
        if (typeof element.dataset.turbolinksAnimateAnimation !== 'undefined')
          TurbolinksAnimate.inline = true;
        TurbolinksAnimate.options.animation = element.dataset.turbolinksAnimateAnimation || options.animation;
        TurbolinksAnimate.options.appear = element.dataset.turbolinksAnimateAppear;
        TurbolinksAnimate.options.duration = element.dataset.turbolinksAnimateDuration || options.duration;
        TurbolinksAnimate.options.delay = element.dataset.turbolinksAnimateDelay || options.delay;
        TurbolinksAnimate.options.type = element.dataset.turbolinksAnimateType;
      });
    });

    TurbolinksAnimate.initialized = true;
    if (options.customListeners == false)
      TurbolinksAnimate.appear();
  };

  this.setOptions = (options) => {
    let previousType = TurbolinksAnimate.options.type,
      appear = TurbolinksAnimate.options.appear;

    TurbolinksAnimate.options = {
      animation: options.animation,
      duration: options.duration,
      delay: options.delay,
      reversedDisappearing: options.reversedDisappearing,
      breakpoints: options.breakpoints,
      previousType: previousType,
      appear: appear
    };
  };

  this.prepareTransition = (newBody) => {
    document.querySelectorAll('[data-turbolinks-animate-transition]').forEach((element) => {
      let property = element.dataset.turbolinksAnimateTransition,
        matchingElements = newBody.querySelectorAll(element.tagName + '[data-turbolinks-animate-transition]'),
        newElement = null;

      if (matchingElements.length == 1) {
        newElement = matchingElements[0];
      } else if (matchingElements.length > 1) {
        newElement = newBody.querySelector('#' + element.id);
      } else {
        return;
      }

      newElement.style[cssPropertyToCamelCase(property)] = getComputedStyle(element).getPropertyValue(property);
    });
  };
  this.transition = () => {
    document.querySelectorAll('[data-turbolinks-animate-transition]').forEach((element) => {
      setTimeout(() => element.style[cssPropertyToCamelCase(element.dataset.turbolinksAnimateTransition)] = null, 1);
    });
  };

  this.appear = () => {
    TurbolinksAnimate.disappearing = false;
    TurbolinksAnimate.toggle();
  };
  this.disappear = () => {
    TurbolinksAnimate.disappearing = true;
    TurbolinksAnimate.toggle();
  };
  this.toggle = () => {
    if (TurbolinksAnimate.options.animation != 'false') {
      TurbolinksAnimate.resetClasses();
      TurbolinksAnimate.getElements();
      TurbolinksAnimate.useOptions();
      Turbolinks.clearCache();
      TurbolinksAnimate.animate();
      TurbolinksAnimate.reset();
    }
  };

  this.getElements = () => {
    TurbolinksAnimate.elements = [];

    function getChildren(parent) {
      let type = TurbolinksAnimate.options.type || TurbolinksAnimate.options.previousType || 'true';
      if (parent.dataset.turbolinksAnimatePersist == type) {
        return;
      } else if (parent.dataset.turbolinksAnimatePersistItself == type || parent.querySelectorAll('[data-turbolinks-animate-persist]').length > 0 || parent.querySelectorAll('[data-turbolinks-animate-persist-itself]').length > 0) {
        let children = parent.children;
        for (let i = 0; i < children.length; i++) {
          getChildren(children[i]);
        }
      } else {
        TurbolinksAnimate.elements.push(parent);
      }
    }

    getChildren(TurbolinksAnimate.element);
  };
  this.useOptions = () => {
    if (TurbolinksAnimate.elements != null) {
      TurbolinksAnimate.elements.forEach((element) => {
        element.style.animationDuration = TurbolinksAnimate.options.duration;
        if (TurbolinksAnimate.options.delay != false)
          element.style.animationDelay = TurbolinksAnimate.options.delay;
      });
    }
  };

  this.reset = () => {
    delete TurbolinksAnimate.options.appear;
    delete TurbolinksAnimate.options.previousType;
    TurbolinksAnimate.inline = false;
  };
  this.resetClasses = () => {
    if (TurbolinksAnimate.elements != null) {
      TurbolinksAnimate.elements.forEach((element) => {
        TurbolinksAnimate.animateClasses.forEach((animation) => element.classList.remove(animation));
      });
    }
  };

  this.animate = () => {
    let animation = TurbolinksAnimate.getAnimation();

    TurbolinksAnimate.element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', (event) => {
      if (event.currentTarget.dataset.triggered)
        return;
      event.currentTarget.dataset.triggered = true;

      dispatchEvent('turbolinks:animation-end', {detail: {element: TurbolinksAnimate.element, disappearing: TurbolinksAnimate.disappearing}});
    });

    dispatchEvent('turbolinks:animation-start', {detail: {element: TurbolinksAnimate.element, disappearing: TurbolinksAnimate.disappearing, animation: animation}});

    TurbolinksAnimate.elements.forEach((element) => {
      element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', () => {
        if (event.currentTarget.dataset.triggered)
          return;
        event.currentTarget.dataset.triggered = true;
        setTimeout(() => {
          if (TurbolinksAnimate.disappearing == false)
            TurbolinksAnimate.resetClasses();
        }, 250);
      });
      TurbolinksAnimate.getClassListFor(animation).forEach((animation) => element.classList.add(animation));
    });
  };
  this.getAnimation = () => {
    let animation;

    if (!TurbolinksAnimate.disappearing)
      animation = TurbolinksAnimate.options.appear;
    if (TurbolinksAnimate.inline) {
      animation = TurbolinksAnimate.options.animation;
    } else if (typeof TurbolinksAnimate.element.dataset.turbolinksAnimateAnimation !== 'undefined') {
      animation = TurbolinksAnimate.element.dataset.turbolinksAnimateAnimation;
    } else {
      animation = TurbolinksAnimate.options.animation;
    }

    return animation;
  };
  this.getClassListFor = (animations) => {
    let classList = ['animated'],
      browserWidth = window.innerWidth,
      animation = null;

    let breakpoints = TurbolinksAnimate.options.breakpoints.sort((a, b) => {
      return b.width - a.width;
    });
    breakpoints.forEach((k, breakpoint) => {
      if (animation == null && browserWidth <= breakpoint.width)
        animation = animations[breakpoint.name.toString];
    });
    if (animation == null)
      animation = animations;

    animation = TurbolinksAnimate.animations.filter(object => object.name.toLowerCase() == animation.toLowerCase())[0];
    if (TurbolinksAnimate.disappearing) {
      if (animation.disappear != true)
        animation = TurbolinksAnimate.animations.filter(object => object.name.toLowerCase() == animation.disappear.toLowerCase())[0];
      if (TurbolinksAnimate.options.reversedDisappearing && animation.reverse != null) {
        classList.push(animation.reverse);
      } else {
        classList.push(animation.name);
      }
    } else {
      classList.push(animation.name);
    }

    return classList;
  };
};


function dispatchEvent(name, options = {}) {
  let event = new Event(name, options);
  document.dispatchEvent(event);
}

function extend() {
  for (let i = 1; i < arguments.length; i++)
    for (let key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

function cssPropertyToCamelCase(property) {
  return property.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
}
