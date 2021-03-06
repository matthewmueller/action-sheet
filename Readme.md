
# action-sheet

  ios-inspired action sheet.

  ![action sheet](http://f.cl.ly/items/2q1z123X312W3I2G433Q/Screen%20Shot%202013-03-29%20at%201.39.56%20AM.png)

## Installation

    $ component install matthewmueller/action-sheet

## Example

```js
actionsheet('Are you sure?')
  .button('ok', function() { alert('ok!'); })
  .button('maybe', function() { alert('maybe...'); })
  .cancel('cancel')
  .show();
```

## API

### `actionsheet(title)`

Initialize a new `actionsheet` with a `title`.

### `.button(title, [fn], [cls])`

Create a button with a `title` and optional callback `fn` when clicked. The optional `cls` allows you to add classes to the button.

### `.cancel(title, [fn], [cls])`

Create a cancel button with a `title` and optional `fn` when clicked. Will automatically hide the action sheet when clicked. The optional `cls` allows you to add classes to the button.

### `.show()`

Show the action sheet.

### `.hide()`

Hide the action sheet.

### `.remove()`

Removes the action sheet from the DOM and unbinds all events.

## TODO:

* Tests
* Prevent scrolling when action sheet is active
* Allow esc to hide action sheet

## License

  MIT
