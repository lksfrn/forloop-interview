# Meowtify

Meowtify is our own Altais framework built on top of Fastify and Mongoose. We maintain this library using monorep.

## Structure

The `<something>` field indicates that this is a multiple name, i.e. it represents an array.

```bash
- packages # all packages
    - <pkg> # one package
        - __tests__ # tests
            - modules # tests that test modules
                - <module> # module name (corresponds to src/modules)
            - e2e # tests that test routs
                - <route> # route name (matches src/routes)
        - src # main code
            - models # models for the database
            - modules # module plugins
            - routes # route plugins
            - schemas # DTO for routes
            - app.ts # main plugin for package
            - index.ts # main file for package
- sample # test project
    - src # code for test project
```
