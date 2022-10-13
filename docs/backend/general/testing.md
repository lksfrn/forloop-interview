# Testing

[Jest](https://jestjs.io/) is our main testing framework. It contains a test runner, code coverage and assertion library. Nice all in one. We have a matchers extension [Jest Extended](https://github.com/jest-community/jest-extended). I recommend to take a look at the Jest documentation. There are a lot of examples there.

## Glossary

**Unit tests** are tests that are designed to test only the smallest possible part of an application, e.g. a function or an object. Typically they do not use a database or Redis and other services. The necessary functions are mocked.

**End-to-end tests (E2E)** are tests that try to simulate the user's view. In the case of APIs, they directly send requests to the routers and do not handle what's there so far. They only test that the router returns the correct data. It uses the database and everything, just like a real request.

**Assertion** is a marker for when we say how the tested item should look or behave. It is used to compare the _expected_ value and the _real_ value.

**Matcher** is one function/type/comparator from the assertion package.

**Test runner** is a program that is responsible for finding tests and running them. It also runs reports and evaluates them.

**Coverage** is the term for scanning the amount of tested code. The whole project is scanned and the parts (lines, files, conditions, functions...) that have a test bound to them are scanned. The goal is to get _60% coverage_.

**Mocking** is a way to replace a piece of code (typically a database call) with a "fake" function. This principle is used in unit tests today and every day. Mocking replaces a time-consuming function by saying what the return value should look like.

**Spying** is very similar to mocking except that the original function is not replaced. It is just wrapped in an object that can be tested, e.g. how many times it was called, with what parameters, etc.

**Snapshot** testing is a way of testing so that we know that our function works. Normally we would have to manually write tests to check that this is the case. Instead, we can automatically create a snapshot of the return values and just compare the function with the stored snapshot. Of course, this is only created the first time the function is run, when we know that the function is working as it should. This ensures that if someone changes the implementation of the function in the future, the test will not pass because the snapshot would have to be changed.

## Basic rules

-  Automatically creates a global function. No need to import anything
-  tests run in parallel and therefore must be completely independent of each other
   -  dependencies within a single `describe` are allowed

### Mocking vs Spying

Mocking is used when we don't want a function to be executed, but only called. This is typically what you want when working with a database, when EntityManager methods are replaced and no SQL statement actually runs (nor can it, because unit testing does not use a database).

```ts
// TODO: example
```

Spying is used when we don't want to replace the execution of the function itself, but just test that it is called correctly. Typical use-case is when we are testing the addition of a decorator. On the one hand we want to know if `app.decorate` was called correctly, but on the other hand we want the decorator to actually be added to the Fastify instance for later testing.

### Testing modules (unit) and routes (e2e)

It has already been said that there are two basic folders in a Fastify application: `modules` and `routes`. Modules are always unit tested. Routes can also be unit tested, but this is unnecessary in our case, so we will always test them using the E2E test.
