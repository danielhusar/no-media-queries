# No Media Queries [![Build Status](https://travis-ci.org/danielhusar/no-media-queries.svg)](https://travis-ci.org/danielhusar/no-media-queries)

Export the css without mediaqueries matching maximum page width.
This library can be used when you cant use respond.js, so you can have separated stylesheet for non responsive layout for IE8.

Also avaiable as [gulp](https://github.com/danielhusar/gulp-no-media-queries)/[grunt](https://github.com/danielhusar/grunt-no-media-queries) plugin.

## Install

Download [manually](https://github.com/danielhusar/no-media-queries/archive/master.zip) or with a package-manager.

#### [npm](https://npmjs.org/package/no-media-queries)

```bash
npm install --save no-media-queries
```

### Sample usage

```bash
nmq(css, options, reworkOptions);
```
### CLI

You can also use it as a CLI app by installing it globally:


```bash
npm install --global no-media-queries
```

```bash
$ nmq --help

Usage:
  $ nmq <file> > <new-file>

Example:
  $ nmq responsive.css > non-responsive.css

Custom options: (options with one dash, reworkOptions with two dashes)
  $ nmq responsive.css > non-responsive.css -width=200px --compress=true
```


### Example

This library will export all the relevant css rules form your css that match proper mediaquery breakpoint passed in.

If we have css like this:

```css
a{
	color: blue;
} 
@media all and (min-width: 500px){
	a{
		color: red;
	}
}
```

Running: 

```javascript
nmq(fs.readFileSync('responsive.css'), {width: 600px});
```

Will result in:

```css
a{
	color: red;
}
```

So we can have in our head css stylesheets like this:
```html
<link rel="stylesheet" href="responsive.css">
<!--[if (lt IE 9)]>
  <link rel="stylesheet" href="no-responsive.css">
<![endif]-->
```


Where no-responsive.css will be output from no-media-queries libarry.

## CSS

Type: `String` or `Buffer`

Css to parse.

## Options


#### width

Type: `String`  
Default: '10000px'

Breakpoint for our page width which should match mediaqueries.

#### type

Type: `String`  
Default: 'all'
Type of device.

## ReworkOptions

[Rework options](https://github.com/reworkcss/rework#reworktostringoptions)

## License

MIT © Daniel Husar
