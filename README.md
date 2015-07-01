# postcss-each [![Build Status][ci-img]][ci]

A [PostCSS] plugin to iterate through values.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/outpunk/postcss-each.svg
[ci]:      https://travis-ci.org/outpunk/postcss-each

Iterate through values:

```css
@each $icon in foo, bar, baz {
  .icon-$(icon) {
    background: url('icons/$(icon).png');
  }
}
```

```css
.icon-foo {
  background: url('icons/foo.png');
}

.icon-bar {
  background: url('icons/bar.png');
}

.icon-baz {
  background: url('icons/baz.png');
}
```

Iterate through values with index:

```css
$array: (foo, bar, baz);

@each $val, $i in s, m, l  {
  .icon_size_$(val) {
    background: url('icons/$(array[$i]).png');
  }
}
```

```css
.icon_size_s {
  background: url('icons/foo.png');
}

.icon_size_m {
  background: url('icons/bar.png');
}

.icon_size_l {
  background: url('icons/baz.png');
}
```

<a href="https://evilmartians.com/?utm_source=postcss-each">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Sponsored by Evil Martians" width="236" height="54">
</a>

## Usage

```js
postcss([ require('postcss-each') ])
```

See [PostCSS] docs for examples for your environment.
