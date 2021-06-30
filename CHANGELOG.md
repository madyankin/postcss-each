## 1.1.0
- Updated postcss-simple-vars (by Charles Suh @charlessuh)

## 1.0.0
- Updated to PostCSS 8 (by Charles Suh @charlessuh)
- Got rid of Babel

## 0.10.0
Updated to PostCSS 6

## 0.9.3
Babel packages moved to devDependencies

## 0.9.2
Updated dependencies

## 0.9.1
Fixed nodes processing order https://github.com/outpunk/postcss-each/issues/17 (by Muhamad Gameel @hexpanic)

## 0.9.0
Added `afterEach` and `beforeEach` options to run plugins before and after each iteration (by @GitScrum)

## 0.8.0
Added support for using parent's variables in a nested loop (by @GitScrum)

## 0.7.2
Updated dependencies

## 0.7.1
Updated dependencies

## 0.7.0
Updated to PostCSS 5

## 0.6.0
Added multiple variable assignment (by Ryan Tsao @rtsao):

```css
@each $animal, $color in (puma, black), (sea-slug, blue) {
  .$(animal)-icon {
    background-image: url('/images/$(animal).png');
    border: 2px solid $color;
  }
}

```css
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
}

.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
}
```

## 0.5.0
### Internal changes
* Translated to ES6
* PostCSS updated

## 0.4.1
Internal improvements

## 0.4.0
Added nested iteration (by Ryan Tsao @rtsao)

## 0.3.1
Fixed #4: Do not search the `in` keyword inside vars

## 0.3.0
Added index iteration (by Anton Winogradov @verybigman):

```css
@each $val, $i in foo, bar {
  .icon-$(val) {
    background: url("$(val)_$(i).png");
  }
}
```

```css
.icon-foo {
  background: url("foo_0.png");
}

.icon-bar {
  background: url("bar_1.png");
}
```

## 0.2.1
Fixed short vars issue #2

## 0.2.0
### Internal changes
* The code has been cleaned.
* The variables processing code has been replaced with [`postcss-simple-vars`].

[`postcss-simple-vars`]: https://github.com/postcss/postcss-simple-vars

## 0.1.0
Initial version
