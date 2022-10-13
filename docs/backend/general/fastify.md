# Fastify

## Framework

[Fastify](https://www.fastify.io/) is a superfast framework for JavaScript. We use it in combination with TypeScript. Besides its speed, we use it because it doesn't use the classic OOP model of controllers, services, etc. Check out [documentation](https://www.fastify.io/docs/latest/) right off the bat. It is short and good. I especially recommend to focus on the plugins.

## Plugins

Plugins are the basic building blocks. These are very simple and _extremely flexible_. This is their main domain. They can do dependency injection, route prefix and that's basically enough. It's unbelievable that it's enough. Unfortunately, with flexibility comes the responsibility of the programmer to ensure that they are used correctly. Over time, the Fastify community has concluded that plugins should be divided into two parts (i.e. two folders): **modules** and **routes**:

```
- src
    - modules
        - kitten
        - cat
    - routes
        - cat
```

To reiterate, modules defined inside other modules are not visible anywhere else except in their own paths. So Fastify puts everything in scopes because of _separation of concerns_. If we want to create a global plugin, but register it somewhere in a looping plugin, we use:

```ts
// cat/index.ts
import { FastifyPluginAsync } from "fastify"
import fp from "fastify-plugin"

const plugin: FastifyPluginAsync<CatOptions> = async (app, opts) => {
   //                           ^^^^^^^^^^^^            ^^^^^^
   //                           optional                optional
   // ...
}

export const meowtifyCat = fp(plugin) // global plugin
export const meowtifyCat = plugin // local plugin
```

This case is typically used when we want to have a global email forwarding, but we register it somewhere deeper in the application. We often don't have access to the root (i.e. the highest) instance, because it is created during a CLI command.

The plugin accepts a Fastify `app` instance as the first parameter and `opts` as the second configuration. The second parameter is optional. Plugins are **always asychronous functions**, so they return `Promise`. In the documentation, it is more common to find a version that has a callback `done` as the last parameter. To override the asynchronous function, just remove the last parameter and write the `async` callback before the function.

### Modules

Modules are those plugins that add functionality. Most often these will be decorators and hooks. Examples of modules are database connection, asynchronous queue, mail client, other APIs, logger and others.

The structure of the module is as follows, except for exceptions where everything is put into `index.ts`:

```
- cat
    - index.ts
    - ...
```

The `index.ts` file is used for Fastify type augmentation. This needs to be done after adding a decorator in the plugin, because Fastify knows about the variable, but TypeScript does not, and therefore throws an error that the decorator does not exist. More in [Fastify docs](https://www.fastify.io/docs/latest/TypeScript/#creating-type-definitions-for-a-fastify-plugin). This file also exports the necessary types, functions, objects, etc. from the plugin. It is used to manage the code. It can contain simple logic. For more complex code, make a separate file and re-export it in `index.ts`.

### Routes

Routing plugins should only contain endpoint definitions. The first parameter is the URL under which the route is registered. The second parameter is options and the last parameter is a handler, an asychronous anonymous function. Again, handlers are **always asynchronous**. They accept the `req` (request) and `reply` (response) parameters. Returns an arbitrary serializable object:

```ts
// GET /cat/eliska

app.get<{ Body: CatDtoIn; Params: CatParamsDto }>(
   "/cat/:name",
   {
      onRequest: app.guard(),
      schema: {
         body: catDtoIn,
         params: catParamsDto,
         response: { 200: catDtoOut },
      },
   },
   async (req, reply) => {
      req.params.name === "eliska" // true
      // ...
      return cat
   }
)
```

Of course, the `app.get` function can be different. The special syntax `<{ Body: CatDtoIn, Params: CatParamsDto }>` is used to set the type for TypeScript. It has no effect on the program function, but TS will not be built without it. More info in JSON Schema section. The URL can contain a parameter like `:name` (you can tell the parameter by starting with a colon).

For each route, you need to define a corresponding JSON Schema, which defines the JSON structure. Thanks to this we can validate and serialize on the input and only serialize on the output very efficiently. More in the JSON Schema section.

The `onRequest: app.guard('')` flag indicates that the given route is public, i.e. that we do not require a login. If the route is only for logged in users, we write `app.guard('auth')`. The user rule then has access to the selected attributes. For example, `app.guard('read', 'Cat')` indicates that we require the user to have access to the `read` action on the `Cat` entity. If it makes sense, `Cat` is the name of the entity according to Mongoose.

## JSON Schema

Another important part is [JSON Schema](https://json-schema.org/). It is used to define and validate positions in the DTO. For your purposes, the DTO and the schema are the same. There are differences, but they are too small to be worth mentioning. They have several types, most commonly `in` (input) and `out` (output). Let's take the example of `DtoIn`:

```ts
import { FromSchema } from "json-schema-to-ts"

export const catDtoIn = {
   type: "object",
   required: ["name", "data"],
   additionalProperties: false,
   properties: {
      name: { type: "string" },
      data: { $ref: "json#" },
   },
} as const

export type CatDtoIn = FromSchema<typeof catDtoIn>
```

I won't go into the actual definition and format of JSON schemas here, as it is a very broad concept and there are many tutorials on it.

In `camelCase` we name the actual POJO that defines the schema. The format is such that you start with the resource name at the beginning in lower case. Then add `Dto` and finally come `In`, `Out`, `Query`, or `Params`. Acceptable names for the resource `cat`:

```
catDtoIn
catDtoOut
catDtoQuery
catDtoParams
```

Then you need to make this POJO a type for TS, as seen in the example. The type name is always the same as the POJO except that it is in `PascalCase`, i.e. it starts with a capital letter.

It is worth noting that the schema POJO **must** contain `additionalProperties: false`. We can also see the `$ref` reference in properties. So far we have:

-  `{ $ref: 'oid#' }` for OID validation
-  `{ $ref: 'json#' }` for JSON validation
-  `{ $ref: 'email#' }` for email validation

## OpenAPI (Swagger)

[OpenAPI](https://www.openapis.org/) (formely [Swagger](https://swagger.io/)).
