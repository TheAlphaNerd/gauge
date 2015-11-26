gauge
=====

A nearly stateless terminal based horizontal guage / progress bar.

```javascript
var Gauge = require("gauge")

var gauge = new Gauge()

gauge.show("test", 0.20)

gauge.pulse("this")

gauge.hide()
```

![](example.png)


### CHANGES FROM 1.x

Gauge 2.x is breaking release, please see the [changelog] for details on
what's changed if you were previously a user of this module.

### `var gauge = new Gauge(stream, [options])`

* **stream** – A stream that progress bar updates are to be written to. Gauge honors
  backpressure and will pause most writing if it is indicated.
* **options** – *(optional)* An option object.

Constructs a new gauge. Gauges are drawn on a single line, and are not drawn
if the current terminal isn't a tty.

If **stream** is a terminal or if you pass in **tty** to **options** then we
will detect terminal resizes and redraw to fit.  We do this by watching for
`resize` events on the tty.  (To work around a bug in verisons of Node prior
to 2.5.0, we watch for them on stdout if the tty is stderr.) Resizes to
larger window sizes will be clean, but shrinking the window will always
result in some cruft.

The **options** object can have the following properties, all of which are
optional:

* **updateInterval**: How often gauge updates should be drawn.
* **theme**: The theme to use as output.  Defaults to something usable on
  your combination of OS, color and unicode support. In practice this means
  that Windows always gets ASCII by default, Mac almost always gets unicode,
  and everyone almost always gets color. Unicode is detected with [has-unicode]
  and color is detected with [has-color]. Theme selection is done by the
  internal [themes] module, which you can use directly.
* **template**: Describes what you want your gauge to look like. The default
  is what npm uses. Detailed [documentation] is later in this document.
* **hideCursor**: Defaults to true.  If true, then the cursor will be hidden
  while the gauge is displayed.
* **tty**: The tty that you're ultimately writing to. Defaults to the same
  as **stream**. This is used for detecting resizes.
* **enabled**: Defaults to true. If true the gauge starts enabled. If disabled then
  all update commands are ignored and no gauge will be printed until you call `.enable()`.
* **Gauge**: The class to use to actually generate the gauge for printing. This defaults
  to `require('gauge/gauge')` and ordinarly you shouldn't need to override this.

[has-unicode]: https://www.npmjs.com/package/has-unicode
[has-color]: https://www.npmjs.com/package/has-color
[themes]: #themes
[documentation]: #templates

### `gauge.show([section, [completed]])`

* **section** – *(optional)* The name of the current thing contributing to
  progress.  Defaults to the last value used, or "".

* **completed** – *(optional)* The portion completed as a value between 0 and 1. Defaults to the last value used, or 0.

### `gauge.hide()`

Removes the gauge from the terminal.

### `gauge.pulse([name])`

* **name** – *(optional)* The specific thing that triggered this pulse

Spins the spinner in the gauge to show output. If **name** is included then
it will be combined with the last name passed to `gauge.show` using the
subsection property of the theme (typically a right facing arrow).

### `gauge.disable()`

Hides the gauge and ignores further calls to `show` or `pulse`.

### `gauge.enable()`

Shows the gauge and resumes updating when `show` or `pulse` is called.

### `gauge.setTheme(theme)`

Change the active theme, will be displayed with the next show or pulse

### `gauge.setTemplate(template)`

Change the active template, will be displayed with the next show or pulse

### Theme Objects

There are two theme objects available as a part of the module, `Gauge.unicode` and `Gauge.ascii`.
Theme objects have the follow properties:

| Property   | Unicode | ASCII |
| ---------- | ------- | ----- |
| startgroup | ╢       | \|    |
| endgroup   | ╟       | \|    |
| complete   | █       | #     |
| incomplete | ░       | -     |
| spinner    | ▀▐▄▌    | -\\\|/ |
| subsection | →       | ->    |

*startgroup*, *endgroup* and *subsection* can be as many characters as you want.

*complete* and *incomplete* should be a single character width each.

*spinner* is a list of characters to use in turn when displaying an activity
spinner.  The Gauge will spin as many characters as you give here.

### Template Objects

A template is an array of objects and strings that, after being evaluated,
will be turned into the gauge line.  The default template is:

```javascript
[
    {type: "name", separated: true, maxLength: 25, minLength: 25, align: "left"},
    {type: "spinner", separated: true},
    {type: "startgroup"},
    {type: "completionbar"},
    {type: "endgroup"}
]
```

The various template elements can either be **plain strings**, in which case they will
be be included verbatum in the output.

If the template element is an object, it can have the following keys:

* *type* can be:
  * `section` – What big thing you're working on now.
    subsection property from the theme.
  * `spinner` – If you've ever called `pulse` this will be one of the characters
    from the spinner property of the theme.
  * `startgroup` – The `startgroup` property from the theme.
  * `completionbar` – This progress bar itself
  * `endgroup` – The `endgroup` property from the theme.
* *separated* – If true, the element will be separated with spaces from things on
  either side (and margins count as space, so it won't be indented), but only
  if its included.
* *maxLength* – The maximum length for this element. If its value is longer it
  will be truncated.
* *minLength* – The minimum length for this element. If its value is shorter it
  will be padded according to the *align* value.
* *align* – (Default: left) Possible values "left", "right" and "center". Works
  as you'd expect from word processors.
* *length* – Provides a single value for both *minLength* and *maxLength*. If both
  *length* and *minLength or *maxLength* are specifed then the latter take precedence.

### Tracking Completion

If you have more than one thing going on that you want to track completion
of, you may find the related [are-we-there-yet] helpful.  It's `change`
event can be wired up to the `show` method to get a more traditional
progress bar interface.

[are-we-there-yet]: https://www.npmjs.com/package/are-we-there-yet
