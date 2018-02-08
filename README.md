# turbolinks-animate.js

![NPM Version](https://img.shields.io/npm/v/turbolinks-animate.svg)
<img src="https://travis-ci.org/jonhue/turbolinks-animate.js.svg?branch=master" />

A dead simple & powerful way of adding rich & adaptive animations to your app which is already using Turbolinks™.

Utilize the [gem](https://github.com/jonhue/turbolinks-animate) when using turbolinks-animate.js with Rails.

[**Demo**](https://phylator.herokuapp.com)

---

## Table of Contents

* [Information](#information)
* [Usage](#usage)
    * [Functions](#functions)
    * [Options](#options)
    * [Inline animations](#inline-animations)
    * [Per Device-Type](#per-device-type)
    * [Overriding animations](#overriding-animations)
    * [Persistent elements](#persistent-elements)
    * [Animation types](#animation-types)
    * [Events](#events)
* [To Do](#to-do)
* [Contributing](#contributing)
    * [Contributors](#contributors)
    * [Semantic Versioning](#semantic-versioning)
* [License](#license)

---

## Information

**Size:** turbolinks-animate.js takes < 1kb gzipped.

**Dependencies:** [Turbolinks](https://github.com/turbolinks/turbolinks), [Animate.css](https://github.com/daneden/animate.css)

---

## Usage

**[How to migrate to version 2](MIGRATING.md)**

First you need to add [turbolinks-animate.js](https://www.npmjs.com/package/turbolinks-animate), and its dependencies to your project

**ES6:**

```javascript
import 'turbolinks-animate';
```

**ES5:**

```javascript
require('turbolinks-animate');
```

Then initialize it:

```javascript
document.addEventListener( 'turbolinks:load', function() {
    TurbolinksAnimate.init();
});
```

By default the `body` element is being used for animating page transitions. If you want to just transition specific parts of your views, you can specify an alternate element:

```javascript
document.addEventListener( 'turbolinks:load', function() {
    TurbolinksAnimate.init({ element: document.querySelector('main') });
});
```

**Note:** You can only use `TurbolinksAnimate.init()` for one element at a time.

In versions < 2, you were able to set custom listeners for `appear` and `disappear` animations. To restore the old behavior set the `customListeners` [options](#options) to `true`.

### Functions

```javascript
// Shows the initialized element
TurbolinksAnimate.appear();

// Hides the initialized element
TurbolinksAnimate.disappear();
```

### Options

There are a number of ways in which you can adopt turbolinks-animate.js to your needs:

#### Animations:

The vital part is choosing an animation to play. turbolinks-animate.js utilizes Animate.css to power them. These are the animations which are currently accessible:

* `fadeIn`
* `fadeInUp`
* `fadeInDown`
* `fadeInRight`
* `fadeInLeft`
* `fadeInUpBig`
* `fadeInDownBig`
* `fadeInRightBig`
* `fadeInLeftBig`
* `fadeOut`
* `fadeOutUp`
* `fadeOutDown`
* `fadeOutRight`
* `fadeOutLeft`
* `fadeOutUpBig`
* `fadeOutDownBig`
* `fadeOutRightBig`
* `fadeOutLeftBig`
* `bounceIn`
* `bounceInUp`
* `bounceInDown`
* `bounceInRight`
* `bounceInLeft`
* `bounceOut`
* `bounceOutUp`
* `bounceOutDown`
* `bounceOutRight`
* `bounceOutLeft`
* `flipInX`
* `flipInY`
* `flipOutX`
* `flipOutY`
* `lightSpeedIn`
* `lightSpeedOut`
* `rotateIn`
* `rotateInDownLeft`
* `rotateInDownRight`
* `rotateInUpRight`
* `rotateInUpLeft`
* `rotateOut`
* `rotateOutDownLeft`
* `rotateOutDownRight`
* `rotateOutUpRight`
* `rotateOutUpLeft`
* `rollIn`
* `rollOut`
* `zoomIn`
* `zoomInUp`
* `zoomInDown`
* `zoomInRight`
* `zoomInLeft`
* `zoomOut`
* `zoomOutUp`
* `zoomOutDown`
* `zoomOutRight`
* `zoomOutLeft`
* `slideInUp`
* `slideInDown`
* `slideInRight`
* `slideInLeft`
* `slideOutUp`
* `slideOutDown`
* `slideOutRight`
* `slideOutLeft`

There are three ways in which you can specify the animation you want to use. To choose a globally used animation pass an option when initializing turbolinks-animate.js:

```javascript
TurbolinksAnimate.init({ animation: 'fadeinright' });
```

**Note:** The option falls back to `fadein`.

**Note:** As a global choice you would only want to use appearing animations, as they will get fade out automatically when the current view disappears.

For alternate approaches take a look at [inline animations](#inline-animations) and animations [overriding animations](#overriding-animations).

#### Options:

* `duration` CSS value for `animation-duration`. Accepts a string. Defaults to `0.3s`.

* `delay` Milliseconds after which animation starts. Accepts an integer or `false`. Defaults to `false`.

* `reversedDisappearing` Whether or not a reversed animation should be used when disappearing. Accepts a boolean. Defaults to `false`.

* `breakpoints` An array of breakpoint objects to specify breakpoints used for [Per Device-Type animations](#per-device-type). Accepts an array. Defaults to: `[{ name: 'mobile', width: 500 },{ name: 'tablet', width: 1024 },{ name: 'desktop', width: 1440 }]`

* `customListeners` Restore the behavior of versions < 2 to set custom listeners to run `appear()` and `disappear()` functions. Accepts a boolean. Defaults to `false`.

#### Example:

```javascript
TurbolinksAnimate.init({ animation: 'fadeinright', duration: '1s', delay: 1000 });
```

### Inline animations

With turbolinks-animate.js you are able to set animations based on the links, who got clicked:

```html
<a href="" data-turbolinks-animate-animation="fadeout" data-turbolinks-animate-duration="0.3s" data-turbolinks-animate-delay="250">I am a link!</a>
```

#### Attributes:

* `data-turbolinks-animate-animation` Animation to be applied when disappearing after a hyperlink got clicked. Accepts a string. Set it to `'false'` to disable turbolinks-animate.js on this specific link.

* `data-turbolinks-animate-appear` Animation to be applied when appearing on the next view after a hyperlink got clicked. Accepts a string.

* `data-turbolinks-animate-duration` CSS value for `animation-duration`. Accepts a string.

* `data-turbolinks-animate-delay` Milliseconds after which animation starts. Accepts an integer or `false`.

### Per Device-Type

In addition you can specify animations specifically for certain screen sizes, just pass a hash:

```javascript
TurbolinksAnimate.init({ animation: { 'mobile': 'fadeinup', 'tablet': 'fadeindown', 'desktop': 'fadein' } });
```

**Note:** You can customize the breakpoints through the [options](#options).

### Overriding animations

A lot of times with frameworks like Ruby on Rails you want to be able to specify animations from within your controllers and views without nasty javascript nesting.

With turbolinks-animate.js you can just add a data attribute to your initialized element, naming the animation you want to use. It will override the global default:

```html
<body data-turbolinks-animate-animation="fadeinup"></body>
```

### Persistent elements

A lot of times you want to persist certain elements throughout requests, for example a navigation bar or other parts of your layout that is being shared between views. turbolinks-animate.js makes it dead simple to declare persistent elements in your view:

```html
<body data-turbolinks-animate-animation="fadein">
    <h1 data-turbolinks-animate-persist="true">My app</h1>
    <p>This is specific to my view!</p>
</body>
```

**Note:** Elements don't actually persist, the get replaced by the fetched page just like any other element. But because no animation gets applied, they look just as if the persist (as long as the newly fetched page includes the exact same element in the same position).

Setting `data-turbolinks-animate-persist` to `true` will result in the entire element (including its children) being excluded from the applied animations. If you want to apply the animations to children of the persistent element, but still keep it untouched, append `-itself` to the data attribute. This is especially useful, when you apply a background color to your element, which remains the same, but changes it contents:

```html
<body data-turbolinks-animate-animation="fadein">
    <nav data-turbolinks-animate-persist-itself="true" style="background: black;">
        <h1 style="color: white;">View specific title</h1>
    </nav>
    <p>This is specific to my view!</p>
</body>
```

### Animation types

Often your permanent elements depend on the hyperlink clicked. Just specify the animation type on the hyperlink tag, and replace `true` with the chosen type on the persistent element:

```html
<body data-turbolinks-animate-animation="fadein">
    <nav data-turbolinks-animate-persist-itself="nav" style="background: black;">
        <h1 style="color: white;">View specific title</h1>
    </nav>
    <a href="/do" data-turbolinks-animate-type="nav">Persist navigation!</a>
    <a href="/doo">Don't persist navigation!</a>
</body>
```

### Events

turbolinks-animate.js emits events that allow you to track the animation lifecycle. turbolinks-animate.js fires events on the `document` object.

* `turbolinks:animation-start` fires when an animation starts. The main turbolinks-animate.js element can be accessed with `event.data.element`. Access the animation with `event.data.animation`. Access whether content appears or disappears with `event.data.disappearing`.

* `turbolinks:animation-end` fires when an animation ends. The main turbolinks-animate.js element can be accessed with `event.data.element`. Access whether content appeared or disappeared with `event.data.disappearing`.

---

## To Do

[Here](https://github.com/jonhue/turbolinks-animate.js/projects/1) is the full list of current projects.

To propose your ideas, initiate the discussion by adding a [new issue](https://github.com/jonhue/turbolinks-animate.js/issues/new).

---

## Contributing

We hope that you will consider contributing to turbolinks-animate.js. Please read this short overview for some information about how to get started:

[Learn more about contributing to this repository](CONTRIBUTING.md), [Code of Conduct](CODE_OF_CONDUCT.md)

### Contributors

Give the people some :heart: who are working on this project. See them all at:

https://github.com/jonhue/turbolinks-animate.js/graphs/contributors

### Semantic Versioning

turbolinks-animate.js follows Semantic Versioning 2.0 as defined at http://semver.org.

## License

MIT License

Copyright (c) 2017 Jonas Hübotter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
