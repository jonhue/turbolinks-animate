### Version 2

Remove all of your previous initializations and listeners to call `appear` & `disappear` functions. They probably looked similar to the following:

```js
$(document).on('turbolinks:load', function () {
    $('body').turbolinksAnimate();
    turbolinksAnimateAppear();
});
$(document).on('turbolinks:request-start', function () {
    turbolinksAnimateDisappear();
});
$(window).on('popstate beforeunload', function (event) {
    turbolinksAnimateDisappear();
});
```

and replace them with this code snippet:

```js
$(document).on('turbolinks:load', function () {
    TurbolinksAnimate.init();
});
```

That's it!
