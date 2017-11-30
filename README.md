# turbolinks-animate.js

![NPM Version](https://img.shields.io/npm/v/turbolinks-animate.svg)
<img src="https://travis-ci.org/slooob/turbolinks-animate.js.svg?branch=master" />

A dead simple & powerful way to add rich & adaptive animations to your app which is already using Turbolinks™.

[**Demo**](https://phylator.herokuapp.com)

---

## Table of Contents

* [Information](#information)
* [Usage](#usage)
    * [Functions](#functions)
    * [Options](#options)
        * [Animations](#animations)
        * [Advanced](#advanced)
        * [Example](#example)
    * [Inline animations](#inline-animations)
    * [Per Device-Type](#per-device-type)
    * [Overriding animations](#overriding-animations)
    * [Persistent elements](#persistent-elements)
    * [Animation types](#animation-types)
* [To Do](#to-do)
* [Contributing](#contributing)
    * [Contributors](#contributors)
    * [Semantic Versioning](#semantic-versioning)
* [License](#license)

---

## Information

**Size:** turbolinks-animate.js takes < 1kb gzipped.

**Dependencies:** [jQuery](https://github.com/jquery/jquery), [Turbolinks](https://github.com/turbolinks/turbolinks), [Animate.css](https://github.com/daneden/animate.css)

---

## Usage

First you need to add [turbolinks-animate.js](https://www.npmjs.com/package/turbolinks-animate), and its dependencies to your project, then initialize turbolinks-animate.js:

```javascript
$(document).on( 'turbolinks:load', function() {
    $('body').turbolinksAnimate();
    turbolinksAnimateAppear();
});
$(document).on( 'turbolinks:request-start', function() {
    turbolinksAnimateDisappear();
});
$(window).on( 'popstate', function(event) {
    turbolinksAnimateDisappear();
});
```

**Note:** You can only use `turbolinksAnimate()` for one element at a time.

### Functions

```javascript
// Shows the initialized element
turbolinksAnimateAppear();

// Hides the initialized element
turbolinksAnimateDisappear();
```

### Options

There are a number of ways in which you can adopt turbolinks-animate.js to your needs:

#### Animations

The vital part is choosing an animation to play. turbolinks-animate.js utilizes Animate.css to power them. These are the animations which are currently accessible:

* fadeIn
* fadeInUp
* fadeInDown
* fadeInRight
* fadeInLeft
* fadeOut
* fadeOutUp
* fadeOutDown
* fadeOutRight
* fadeOutLeft

There are three ways in which you can specify the animation you want to use. To choose a globally used animation pass an option when initializing turbolinks-animate.js:

```javascript
$('body').turbolinksAnimate({ animation: 'fadeinright' });
```

**Note:** The option falls back to `fadein`.

**Note:** As a global choice you would only want to use appearing animations, as they will get reversed automatically when the current view disappears.

For alternate approaches take a look at [inline animations](#inline-animations) and animations for [Rails](#rails).

#### Advanced

**duration:** CSS value for `animation-duration`. Accepts a string. Defaults to `0.5s`.

**delay:** Milliseconds after which animation starts. Accepts an integer or `false`. Defaults to `false`.

**reversedDisappearing:** Whether or not a reversed animation should be used when disappearing. Accepts a boolean. Defaults to `true`.

**mobileWidth:** The maximum width of a device to be interpreted as mobile. Accepts an integer or string. Defaults to `'500'`.

**tabletWidth:** The maximum width of a device to be interpreted as a tablet. Accepts an integer or string. Defaults to `'1024'`.

#### Example

```javascript
$('body').turbolinksAnimate({ animation: 'fadeinright', duration: '1s', delay: 1000 });
```

### Inline animations

With turbolinks-animate.js you are able to set animations based on the links, who got clicked:

```html
<a href="" data-turbolinks-animate-animation="fadeout" data-turbolinks-animate-duration="0.3s" data-turbolinks-animate-delay="250">I am a link!</a>
```

### Per Device-Type

In addition you can specify animations specifically for certain screen sizes, just pass a hash:

```javascript
$('body').turbolinksAnimate({ animation: '{"mobile":"fadeinup","tablet":"fadeindown","desktop":"fadein"}', duration: '1s', delay: 1000 });
```

**Note:** At the moment turbolinks-animate.js only supports the three screen sizes `mobile`, `tablet` and `desktop`. You can customize the breakpoints through the [options](#advanced).

When a specific animation for the current screen size has not been given, an animation will be choosen through the following pattern:

* `mobile`
* `tablet`
* `desktop`
* `default` (e.g. a plain string, no hash)

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

---

## To Do

* Add more animations from [Animate.css](https://github.com/daneden/animate.css)
* Leave your suggestions [here](https://github.com/slooob/turbolinks-animate.js/issues/new)

---

## Contributing

We hope that you will consider contributing to turbolinks-animate.js. Please read this short overview for some information about how to get started:

[Learn more about contributing to this repository](https://github.com/slooob/turbolinks-animate.js/blob/master/CONTRIBUTING.md), [Code of Conduct](https://github.com/slooob/turbolinks-animate.js/blob/master/CODE_OF_CONDUCT.md)

### Contributors

Give the people some :heart: who are working on this project. See them all at:

https://github.com/slooob/turbolinks-animate.js/graphs/contributors

### Semantic Versioning

turbolinks-animate.js follows Semantic Versioning 2.0 as defined at http://semver.org.

## License

MIT License

Copyright (c) 2017 Slooob

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
