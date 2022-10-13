# Overview of Dynamics

The central concept of ours are the so-called dynamics. It is a way of entering, validating and storing data. Imagine a configurable way of defining your data.

There are several things to explain in here. First, start with the basic POJO for a cat:

```js
const cat = {
    name: 'Elisabeth',
    description: '<p>A very fat cat.</p>'
    weight: 5.2,
    isCute: true,
    religion: null,
    birthDate: '2010-07-23T11:32:16+01:00'
    abilities: [
        'eating',
        'sleeping',
        'pooping',
    ],
    breed: {
        name: 'British Shorthair',
        origin: 'Great Britain'
    },
}
```

This POJO represents all data types JSON can have: string, number, boolean, array and nested object. It is everything you need to store any data, but then you start asking questions like:

-  how can I structure forms for user to be able to enter values?
-  what about validation? Can `name` be of arbitrary length?
-  is array of abilities somehow limited?
-  is there a difference of widgets used for `name` and `description`?
-  does the user really need to enter HTML in `description` manually?
-  how to distinguish between them?
-  what if the `breed` can be only one element of o=some set?
-  what about entering the `birthDate`?
-  how can I secure certain field that only some users can alter it?
-  if some field is required, do I have to copy this information everywhere or can I keep it in one place?

## The Answer

Dynamics!

> Of course, you would not think anything else, right?

## Structure

**Models** are our first building blocks. They represent something you may wanna store in the database. Think about them in an abstract way.

**Fields** define the properties of the model. They holds information about widget, label or validation.

**Choices** represent repeatable set options within given field, commonly combined with select boxes.

**Layouts** are philosofically lying somewhere between fields and models.

Real world example is a diagnosis form in medical databases. The diagnosis form itself is a model. That model has different flavors like first diagnosis form, diagnosis form after relaps/progression, "common" (or better default) diagnosis form and so on. Each of this type has slightly different structure, but they all represent the same model. That is why we also introduced layouts to distinguish between them while saying that they are under same model. It is no surprise that the layouts are composed of fields, which defines in our example date of the form, diagnosis and more than 200 additional properties. The example of choices is situation where the doctor has to fill some select box with yes, no or unknown. It is convenient to store these choices somewhere to be able to reuse/edit them at runtime.

::: warning
Please, think about it for a moment. This is a lot to process. Try to draw a diagram of the situation. Do you think you can come up with another real world example?
:::

-  a model has 1:N relationship to layouts
-  a layout has M:N relationship to fields
-  a field has N:1 relationship to choices
-  a field can contain other fields (creates tree structure)

All three has similar properties:

-  `name` internal representation, not visible to the user, in camelCase, unique
-  `label` UI representation for the user, human language, no special meaning for the computer
-  `description` optional, human readable text
