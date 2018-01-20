# Changelog

### master

* nothing yet

### 2.0.1 - 2018/01/20

* bugfixes
    * attempt to fix scroll restauration behavior

### 2.0.0 - 2018/01/10

* features
    * introducing global `TurbolinksAnimate` object
    * allowing for custom breakpoints
    * add numerous animations from Animate.css

### 1.3.9 - 2018/01/07

* bugfixes
    * fixed persistent elements

### 1.3.8 - 2018/01/04

* enhancements
    * smoother animations
* bugfixes
    * fixed not fading in content

### 1.3.7 - 2018/01/04

* enhancements
    * improving code readability
* bugfixes
    * fixing error on disappear animation
    * allow links inside persistent elements to be clicked (#5)

### 1.3.6 - 2018/01/03

* bugfixes
    * fixing errors related to #4

### 1.3.5 - 2017/12/31

* bugfixes
    * fixing #4 - throwing errors on subsequent requests

### 1.3.4 - 2017/12/4

* enhancements
    * disable turbolinks-animate.js on hyperlink by setting `data-turbolinks-animate-animation` to `'false'`
    * changing default animation duration from `0.5s` to `0.3s`

### 1.3.3 - 2017/12/1

* bugfixes
    * fixing disappear-animation when the following appear animation has been specified on the hyperlink

### 1.3.2 - 2017/11/30

* enhancements
    * allow `data-turbolinks-animate-appear` attribute on hyperlinks to specify animation for following view
* bugfixes
    * fixes #2

### 1.3.1 - 2017/11/30

* bugfixes
    * utilize previous type declaration when appearing

### 1.3.0 - 2017/11/30

* features
    * allow persistent elements dependent on type of animations

### 1.2.0 - 2017/11/30

* features
    * allow persistent elements

### 1.1.0 - 2017/11/25

* features
    * allow per device-type animations

### 1.0.4 - 2017/11/21

* bugfixes
    * fixing cache issues

### 1.0.3 - 2017/11/21

* bugfixes
    * fixing cache issues

### 1.0.2 - 2017/11/21

    * bugfixes
        * re-added fadeout animations

### 1.0.1 - 2017/11/21

* bugfixes
    * console log errors fixed

### 1.0.0 - 2017/11/21

* initial release
