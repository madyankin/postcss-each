## 0.3.0
Added index iteration:

```css
$array: (foo, bar);

@each $val, $i in s, m  {
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
