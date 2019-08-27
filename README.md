# [Vue Paper Dashboard](https://www.creative-tim.com/product/vue-paper-dashboard-pro)

> Admin dashboard based on paper dashboard UI template + vue-router

This project is a vue version of [Paper-dashboard-pro](https://www.creative-tim.com/product/paper-dashboard-pro)
designed for Vue js. The dashboard includes vue-router

Check the [Live Demo here](https://cristijora.github.io/paper-dashboard-pro/#/admin/overview).

![](http://i.imgur.com/3iC1hOs.gif)

## Documentation
Link to [Documentation](https://cristijora.github.io/paper-dashboard-pro/documentation.html?selectedKind=Buttons&selectedStory=Default&full=0&down=1&left=1&panelRight=0&downPanel=tuchk4%2Freadme%2Fpanel)

## Build Setup

### install dependencies
`yarn install`
### serve with hot reload at localhost:8080
`yarn run dev`
### build for testing with minification
`yarn run build-testing`
### build for production with minification
`yarn run build`
### run unit tests (skip this command, we don`t have any unit tests here)
`yarn run unit`
### run and watch unit tests (skip this command, we don`t have any unit tests here)
`yarn run unit:watch`

## Env setting

### vue environment file
`.env` for global setting

`.env.development` for dev and testing.

`.env.production` for production only.
### keycloak environment file
`environments/keycloak/development/keycloak.json` for dev and testing.

`environments/keycloak/production/keycloak.json` for production only.

## NOTE
If use `npm` command before, we suggest remove 'node_modules' folder and run `yarn install` to setup components and `yarn run dev` to startup project.

DON`T update/upgrade components version unless you know what your want and keep current functions work normally.

### Guide
(Yarn)[https://yarnpkg.com/en/]

[CHANGELOG]: ./CHANGELOG.md
