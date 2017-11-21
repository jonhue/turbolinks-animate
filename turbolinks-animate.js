/**!
 * @fileOverview turbolinks-animate.js - Animations extending Turbolinks
 * @version 1.0.3
 * @license
 * MIT License
 *
 * Copyright (c) 2017 Slooob
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
$.fn.extend({
    turbolinksAnimate: function(options) {
        var defaults = {
            animation: 'fadein',
            duration: '0.5s',
            delay: false,
            reversedDisappearing: true
        };

        options = $.extend(defaults, options);

        turbolinksAnimateInit($(this), options);
    }
});



var turbolinksAnimateData = {}, turbolinksAnimateElement;

function turbolinksAnimateInit(el, options) {
    turbolinksAnimateElement = el;
    turbolinksAnimateData['animation'] = options.animation
    turbolinksAnimateData['duration'] = options.duration
    turbolinksAnimateData['delay'] = options.delay
    turbolinksAnimateData['reversedDisappearing'] = options.reversedDisappearing
    $('a[data-turbolinks-animate]').click( function() {
        turbolinksAnimateData['animation'] = $(this).data('turbolinks-animate-animation').toLowerCase();
        turbolinksAnimateData['duration'] = $(this).data('turbolinks-animate-duration');
        turbolinksAnimateData['delay'] = $(this).data('turbolinks-animate-delay');
    });
};



function turbolinksAnimateAppear() {
    turbolinksAnimateReset();
    turbolinksAnimateOptions();

    turbolinksAnimateElement.addClass(turbolinksAnimateGetClassListFor(turbolinksAnimateCustomAnimation() || turbolinksAnimateData['animation'], false));
    Turbolinks.clearCache() // fix for cache issues
};

function turbolinksAnimateDisappear() {
    turbolinksAnimateReset();
    turbolinksAnimateOptions();

    turbolinksAnimateElement.addClass(turbolinksAnimateGetClassListFor(turbolinksAnimateCustomAnimation() || turbolinksAnimateData['animation'], true));
    Turbolinks.clearCache() // fix for cache issues
};



function turbolinksAnimateCustomAnimation() {
    var classes = turbolinksAnimateElement.attr('class').split(' ');
    for ( var i = 0; i < classes.length; i++ ) {
        var matches = /^turbolinks-animate\-(.+)/.exec(classes[i]);
        if (matches != null) {
            return matches[1].substring(1);
        };
    };
};

function turbolinksAnimateOptions() {
    turbolinksAnimateElement.css({ 'animation-duration': turbolinksAnimateData['duration'] });
    if (turbolinksAnimateData['delay'] != false) {
        turbolinksAnimateElement.css({ 'animation-delay': turbolinksAnimateData['delay'] });
    };
};

function turbolinksAnimateReset() {
    turbolinksAnimateElement.removeClass('fadeIn fadeInUp fadeInDown fadeInLeft fadeInRightfadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight');
};

function turbolinksAnimateGetClassListFor(animation, disappears) {
    var classList = 'animated';
    if (animation == 'fadein') { classList += (disappears ? ' fadeOut' : ' fadeIn') }
    else if (animation == 'fadeinup') { classList += (disappears ? (turbolinksAnimateData['reversedDisappearing'] ? ' fadeOutDown' : ' fadeOutUp') : ' fadeInUp') }
    else if (animation == 'fadeindown') { classList += (disappears ? (turbolinksAnimateData['reversedDisappearing'] ? ' fadeOutUp' : ' fadeOutDown') : ' fadeInDown') }
    else if (animation == 'fadeinleft') { classList += (disappears ? ' fadeOutLeft' : ' fadeInLeft') }
    else if (animation == 'fadeinright') { classList += (disappears ? ' fadeOutRight' : ' fadeInRight') }
    else if (animation == 'fadeout') { classList += ' fadeOut' }
    else if (animation == 'fadeoutup') { classList += (turbolinksAnimateData['reversedDisappearing'] ? ' fadeOutDown' : ' fadeOutUp') }
    else if (animation == 'fadeoutdown') { classList += (turbolinksAnimateData['reversedDisappearing'] ? ' fadeOutUp' : ' fadeOutDown') }
    else if (animation == 'fadeoutleft') { classList += ' fadeOutLeft' }
    else if (animation == 'fadeoutright') { classList += ' fadeOutRight' };
    return classList;
};
