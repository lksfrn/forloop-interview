# Dynamic Fields

The central concept of ours are the so-called dynamic fields. It is a way of entering, validating and storing data. Imagine a ist of POJOs that contains all this information. The POJO could look like this:

```js
{
    name: 'firstName',
    label: 'First Name',
    widget: 'text',
    validation: ['required'],
    data: {
        rows: 2,
        help: 'Please enter your name',
        default: 'Anonymous'
    },
}
```

This will create a required `<textarea>` block with 2 rows, default value `Anonymous`, label `First Name` and with help text `Please enter your name`.

::: warning
All available items mentioned below in lists must be in quotes. If you see a type `string`, the usage would be `widget: 'string'`.
:::

## `name`

Name of the key in values object stored in the database. **Must be unique and in camelCase.**

## `label`

Name for the field in the UI. Has nothing to do with the database. Just for the user.

## `widget`

It describes the UI widget for the user. If you need to have variable count of fields of the same type, you may use `[<widget>]`, eg. `['string']`. Can be one of following:

```
string
password
text
editor
number
date
checkbox
select
multiselect
hidden
email
radio
```

### `relation`

**TODO**

This widget should be used for selecting the relations. It does several things:

-  fetches the related objects for the widget from the server
-  optionally uses autocomlete
-  values are the `_id` of the fetched objects
-  label is calculated from the provided template and the procesed object

## `validation`

List of following validators:

```
required
min:<number>
max:<number>
minEq:<number>
maxEq:<number>
minLength:<number>
maxLength:<number>
and so on...
```

## `data`

This is the general usage POJO for the properties that are rarely used or for the ones that are applied only for specific widgets/types. You may use:

```
rows (only text widget)
decimals (only number widget)
help
options (only radio, select, multiselect widgets)
mask (only string, text widget)
```

### `options`

Options are specified in the array that contains strings or POJO `{ value: ..., label: ... }`. If the strings are used, the value is used for both keys. These two ways can be combined.

```js
[
    'Some value',
    { value: 'Saved value', label: 'Shown for the user' },
]
// becomes internally
[
    { value: 'Some value', label: 'Some value' },
    { value: 'Saved value', label: 'Shown for the user' },
]
```

### `default`

The value must have the same type as the widget.
