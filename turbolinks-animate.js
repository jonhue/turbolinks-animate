/**!
 * @fileOverview turbolinks-animate.js - Animations extending Turbolinks
 * @version 2.0.1
 * @license
 * MIT License
 *
 * Copyright (c) 2017 Jonas Hübotter
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var TurbolinksAnimate = TurbolinksAnimate || new function() {

    this.options = {};
    this.inline = false;
    this.element = null;
    this.elements = null;
    this.disappearing = false;
    this.initialized = false;
    this.animations = [
        { name: 'fadeIn', disappear: 'fadeOut', reverse: null },
        { name: 'fadeOut', disappear: true, reverse: null },
        { name: 'fadeInUp', disappear: 'fadeOutUp', reverse: 'fadeInDown' },
        { name: 'fadeOutUp', disappear: true, reverse: 'fadeOutDown' },
        { name: 'fadeInDown', disappear: 'fadeOutDown', reverse: 'fadeInUp' },
        { name: 'fadeOutDown', disappear: true, reverse: 'fadeOutUp' },
        { name: 'fadeInLeft', disappear: 'fadeOutLeft', reverse: 'fadeInRight' },
        { name: 'fadeOutLeft', disappear: true, reverse: 'fadeOutRight' },
        { name: 'fadeInRight', disappear: 'fadeOutRight', reverse: 'fadeInLeft' },
        { name: 'fadeOutRight', disappear: true, reverse: 'fadeOutLeft' },
        { name: 'fadeInUpBig', disappear: 'fadeOutUpBig', reverse: 'fadeInDownBig' },
        { name: 'fadeOutUpBig', disappear: true, reverse: 'fadeOutDownBig' },
        { name: 'fadeInDownBig', disappear: 'fadeOutDownBig', reverse: 'fadeInUpBig' },
        { name: 'fadeOutDownBig', disappear: true, reverse: 'fadeOutUpBig' },
        { name: 'fadeInLeftBig', disappear: 'fadeOutLeftBig', reverse: 'fadeInRightBig' },
        { name: 'fadeOutLeftBig', disappear: true, reverse: 'fadeOutRightBig' },
        { name: 'fadeInRightBig', disappear: 'fadeOutRightBig', reverse: 'fadeInLeftBig' },
        { name: 'fadeOutRightBig', disappear: true, reverse: 'fadeOutLeftBig' },
        { name: 'bounceIn', disappear: 'bounceOut', reverse: null },
        { name: 'bounceOut', disappear: true, reverse: null },
        { name: 'bounceInUp', disappear: 'bounceOutUp', reverse: 'bounceInDown' },
        { name: 'bounceOutUp', disappear: true, reverse: 'bounceOutDown' },
        { name: 'bounceInDown', disappear: 'bounceOutDown', reverse: 'bounceInUp' },
        { name: 'bounceOutDown', disappear: true, reverse: 'bounceOutUp' },
        { name: 'bounceInLeft', disappear: 'bounceOutLeft', reverse: 'bounceInRight' },
        { name: 'bounceOutLeft', disappear: true, reverse: 'bounceOutRight' },
        { name: 'bounceInRight', disappear: 'bounceOutRight', reverse: 'bounceInLeft' },
        { name: 'bounceOutRight', disappear: true, reverse: 'bounceOutLeft' },
        { name: 'flipInX', disappear: 'flipOutX', reverse: 'flipInY' },
        { name: 'flipOutX', disappear: true, reverse: 'flipOutY' },
        { name: 'flipInY', disappear: 'flipOutY', reverse: 'flipInX' },
        { name: 'flipOutY', disappear: true, reverse: 'flipOutX' },
        { name: 'lightSpeedIn', disappear: 'lightSpeedOut', reverse: null },
        { name: 'lightSpeedOut', disappear: true, reverse: null },
        { name: 'rotateIn', disappear: 'rotateOut', reverse: null },
        { name: 'rotateOut', disappear: true, reverse: null },
        { name: 'rotateInDownLeft', disappear: 'rotateOutDownLeft', reverse: 'rotateInUpRight' },
        { name: 'rotateOutDownLeft', disappear: true, reverse: 'rotateOutUpRight' },
        { name: 'rotateInDownRight', disappear: 'rotateOutDownRight', reverse: 'rotateInUpLeft' },
        { name: 'rotateOutDownRight', disappear: true, reverse: 'rotateOutUpLeft' },
        { name: 'rotateInUpLeft', disappear: 'rotateOutUpLeft', reverse: 'rotateInDownRight' },
        { name: 'rotateOutUpLeft', disappear: true, reverse: 'rotateOutDownRight' },
        { name: 'rotateInUpRight', disappear: 'rotateOutUpRight', reverse: 'rotateInDownLeft' },
        { name: 'rotateOutUpRight', disappear: true, reverse: 'rotateOutDownLeft' },
        { name: 'rollIn', disappear: 'rollOut', reverse: null },
        { name: 'rollOut', disappear: true, reverse: null },
        { name: 'zoomIn', disappear: 'zoomOut', reverse: null },
        { name: 'zoomOut', disappear: true, reverse: null },
        { name: 'zoomInUp', disappear: 'zoomOutUp', reverse: 'zoomInDown' },
        { name: 'zoomOutUp', disappear: true, reverse: 'zoomOutDown' },
        { name: 'zoomInDown', disappear: 'zoomOutDown', reverse: 'zoomInUp' },
        { name: 'zoomOutDown', disappear: true, reverse: 'zoomOutUp' },
        { name: 'zoomInLeft', disappear: 'zoomOutLeft', reverse: 'zoomInRight' },
        { name: 'zoomOutLeft', disappear: true, reverse: 'zoomOutRight' },
        { name: 'zoomInRight', disappear: 'zoomOutRight', reverse: 'zoomInLeft' },
        { name: 'zoomOutRight', disappear: true, reverse: 'zoomOutLeft' },
        { name: 'slideInUp', disappear: 'slideOutUp', reverse: 'slideInDown' },
        { name: 'slideOutUp', disappear: true, reverse: 'slideOutDown' },
        { name: 'slideInDown', disappear: 'slideOutDown', reverse: 'slideInUp' },
        { name: 'slideOutDown', disappear: true, reverse: 'slideOutUp' },
        { name: 'slideInLeft', disappear: 'slideOutLeft', reverse: 'slideInRight' },
        { name: 'slideOutLeft', disappear: true, reverse: 'slideOutRight' },
        { name: 'slideInRight', disappear: 'slideOutRight', reverse: 'slideInLeft' },
        { name: 'slideOutRight', disappear: true, reverse: 'slideOutLeft' }
    ];
    var array = [];
    $.each( this.animations, function( k, animation ) {
        array.push(animation.name);
    });
    this.animateClasses = array;
    // this.scrollPositions = [];

    this.init = function(options) {

        var defaults = {
            element: $('body'),
            animation: 'fadein',
            duration: '0.3s',
            delay: false,
            reversedDisappearing: false,
            breakpoints: [
                { name: 'mobile', width: 500 },
                { name: 'tablet', width: 1024 },
                { name: 'desktop', width: 1440 }
            ],
            customListeners: false
        };
        options = $.extend( defaults, options );

        TurbolinksAnimate.element = options.element;
        TurbolinksAnimate.setOptions(options);
        if ( 'scrollRestoration' in history ) {
            history.scrollRestoration = 'manual';
        };

        if ( TurbolinksAnimate.initialized == false && options.customListeners == false ) {
            $(document).on( 'turbolinks:before-visit', function() {
                // TurbolinksAnimate.scrollPositions.unshift({ scrollPosition: $(window).scrollTop(), url: window.location.href });
                // console.log( 'disappears ... ' + TurbolinksAnimate.scrollPositions );
            });
            $(document).on( 'turbolinks:request-start', function() {
                TurbolinksAnimate.disappear();
            });
            $(window).on( 'popstate beforeunload', function() {
                TurbolinksAnimate.disappear();
                // TurbolinksAnimate.scrollPositions.unshift({ scrollPosition: $(window).scrollTop(), url: document.referrer });
                // console.log('disappears ... ' + TurbolinksAnimate.scrollPositions);
            });
        };

        $('a, button').click(function() {
            if ( typeof $(this).data('turbolinks-animate-animation') !== 'undefined' ) {
                TurbolinksAnimate.inline = true;
            };
            TurbolinksAnimate.options.animation = $(this).data('turbolinks-animate-animation') || options.animation;
            TurbolinksAnimate.options.appear = $(this).data('turbolinks-animate-appear');
            TurbolinksAnimate.options.duration = $(this).data('turbolinks-animate-duration') || options.duration;
            TurbolinksAnimate.options.delay = $(this).data('turbolinks-animate-delay') || options.delay;
            TurbolinksAnimate.options.type = $(this).data('turbolinks-animate-type');
        });

        TurbolinksAnimate.initialized = true;
        if ( options.customListeners == false ) {
            TurbolinksAnimate.appear();
        };

    };

    this.setOptions = function(options) {

        var previousType = TurbolinksAnimate.options.type,
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

    this.appear = function() {
        TurbolinksAnimate.disappearing = false;

        // if ( TurbolinksAnimate.scrollPositions.length > 0 ) {
        //     console.log(TurbolinksAnimate.scrollPositions);
        //     var scrollPositions = TurbolinksAnimate.scrollPositions.filter(function(obj) {
        //         return obj.url == window.location.href;
        //     });
        //     if ( scrollPositions.length > 0 ) {
        //         $(window).scrollTop(scrollPositions[0].scrollPosition);
        //         console.log(scrollPositions[0].scrollPosition);
        //     };
        // };

        TurbolinksAnimate.toggle();
    };
    this.disappear = function() {
        TurbolinksAnimate.disappearing = true;
        TurbolinksAnimate.toggle();
    };
    this.toggle = function() {
        if ( TurbolinksAnimate.options.animation != 'false' ) {
            TurbolinksAnimate.resetClasses();
            TurbolinksAnimate.getElements();
            TurbolinksAnimate.useOptions();
            Turbolinks.clearCache(); // fix cache issues
            TurbolinksAnimate.animate();
            TurbolinksAnimate.reset();
        };
    };

    this.getElements = function() {
        TurbolinksAnimate.elements = [];

        function getChildren(parent) {
            var type = TurbolinksAnimate.options.type || TurbolinksAnimate.options.previousType || 'true';
            if ( parent.data('turbolinks-animate-persist') == type ) {
                return;
            } else if ( parent.data('turbolinks-animate-persist-itself') == type || parent.find('[data-turbolinks-animate-persist]').length > 0 || parent.find('[data-turbolinks-animate-persist-itself]').length > 0 ) {
                parent.children().each(function() {
                    getChildren($(this));
                });
            } else {
                TurbolinksAnimate.elements.push(parent);
            };
        };

        getChildren(TurbolinksAnimate.element);
    };
    this.useOptions = function() {
        if ( TurbolinksAnimate.elements != null ) {
            $(TurbolinksAnimate.elements).each(function() {
                $(this).css( 'animationDuration', TurbolinksAnimate.options.duration );
                if ( TurbolinksAnimate.options.delay != false ) {
                    $(this).css( 'animationDelay', TurbolinksAnimate.options.delay );
                };
            });
        };
    };

    this.reset = function() {
        delete TurbolinksAnimate.options.appear;
        delete TurbolinksAnimate.options.previousType;
        TurbolinksAnimate.inline = false;
    };
    this.resetClasses = function() {
        $(TurbolinksAnimate.elements).each(function() {
            $(this).removeClass(TurbolinksAnimate.animateClasses.join(' '));
        });
    };

    this.animate = function() {
        $(TurbolinksAnimate.elements).each(function() {
            $(this).one( 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function() {
                setTimeout(function() {
                    if ( TurbolinksAnimate.disappearing == false ) {
                        TurbolinksAnimate.resetClasses();
                    };
                }, 250);
            });
            $(this).addClass(TurbolinksAnimate.getClassListFor(TurbolinksAnimate.getAnimation()));
        });
    };
    this.getAnimation = function() {
        var animation;

        if (!TurbolinksAnimate.disappearing) { animation = TurbolinksAnimate.options.appear };
        if (TurbolinksAnimate.inline) {
            animation = TurbolinksAnimate.options.animation;
        } else if ( typeof TurbolinksAnimate.element.data('turbolinks-animate-animation') !== 'undefined' ) {
            animation = TurbolinksAnimate.element.data('turbolinks-animate-animation');
        } else {
            animation = TurbolinksAnimate.options.animation;
        };

        return animation;
    };
    this.getClassListFor = function(animations) {
        var classList = 'animated',
            browserWidth = $(window).width(),
            animation = null;

        var breakpoints = TurbolinksAnimate.options.breakpoints.sort(function( a, b ) {
            return b.width - a.width;
        });
        $.each( breakpoints, function( k, breakpoint ) {
            if ( animation == null && browserWidth <= breakpoint.width ) {
                animation = animations[breakpoint.name.toString()];
            };
        });
        if ( animation == null ) {
            animation = animations;
        };

        classList += ' ';
        animation = $.grep( TurbolinksAnimate.animations, function(object) { return object.name.toLowerCase() == animation.toLowerCase() })[0];
        if ( TurbolinksAnimate.disappearing ) {
            if ( animation.disappear != true ) {
                animation = $.grep( TurbolinksAnimate.animations, function(object) { return object.name.toLowerCase() == animation.disappear.toLowerCase() })[0];
            };
            if ( TurbolinksAnimate.options.reversedDisappearing && animation.reverse != null ) {
                classList += animation.reverse;
            } else {
                classList += animation.name;
            };
        } else {
            classList += animation.name;
        };

        return classList;
    };

};
