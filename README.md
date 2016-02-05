# postcss-each [![Build Status][ci-img]][ci]

A [PostCSS] plugin to iterate through values.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/outpunk/postcss-each.svg
[ci]:      https://travis-ci.org/outpunk/postcss-each

<a href="https://evilmartians.com/?utm_source=postcss-each">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Sponsored by Evil Martians" width="236" height="54">
</a>

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

Iterate through multiple variables:

```css
@each $animal, $color in (puma, sea-slug), (black, blue) {
  .$(animal)-icon {
    background-image: url('/images/$(animal).png');
    border: 2px solid $color;
  }
}
```

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

## Usage

```js
postcss([ require('postcss-each') ])
```

### Options

#### `plugins`

Type: `object`  
Default: `{}`

Accepts two properties: `afterEach` and `beforeEach`

#### `afterEach`

Type: `array`
Default: `[]`

Plugins to be called after each iteration

#### `beforeEach`

Type: `array`
Default: `[]`

Plugins to be called before each iteration

```javascript
require('postcss-each')({
  plugins: {
    afterEach: [
      require('postcss-at-rules-variables')
    ],
    beforeEach: [
      require('postcss-custom-properties')
    ]
  }
})
```


See [PostCSS] docs for examples for your environment.
