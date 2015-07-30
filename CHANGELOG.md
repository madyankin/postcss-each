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
