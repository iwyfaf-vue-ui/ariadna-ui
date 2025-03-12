# Vue Library Builder
Builder for developing Vue libraries.

* [Vue Library Builder](#vue-library-builder)
  * [Clone](#clone)
  * [Install](#install)
  * [Create library](#create-library)
  * [Create playground](#create-playground)
  * [Test libraries](#test-libraries)
    * [Locally](#locally)

## Clone

You can click the "Use this template" button or clone the repository:

```
git@github.com:iwyfaf-vue-tpl/vue-library-builder.git library-name
```

## Install

First, install the `npm-check-updates` library globally. It is needed to update the dependencies of the project when 
it is created.

```shell
npm i npm-check-updates -g
```

Install the dependencies:

```shell
npm i
```

## Create library
To create a new library just do:

```
npm run library:new library-name
```

And follow the suggested steps:

* `Enter package prefix if it exists` - Add `"name": "@prefix/library-name"` to `package.json`. The symbol `@` builder 
will add itself.
* `Enter package description if it exists` - Add `"description": "Your library description."`
* `Update lib dependencies? (Y/n)` - Will update all the dependencies of your library to the latest version.
* In the last step, select the pre-installed build of your library.

## Create playground
To create a new playground just do:

```
npm run playground:new playground-name
```

And follow the suggested steps:

* `Update lib dependencies? (Y/n)` - Will update all the dependencies of your library to the latest version.
* In the last step, select the pre-installed build of your library.

## Test libraries

### Locally
To test your libraries locally, in the Playground app find `package.json` file and add the dependency:

```
"dependencies": {
  "@your-prefix/component-name": "file:../../libraries/component-name"
},
```

Then in the Playground app run:

```
npm i
```

Now you can test your libraries as if you installed them from NPM.