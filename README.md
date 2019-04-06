# vue-translations
Extremely simple code, flexible, and Javascript friendly translations plugin for Vue.
# Installation
npm install require git (https://git-scm.com/)
```
npm install chunlampang/vue-translations
```
Or just download zip
# Usage
## Set locale
```javascript
this.$t = 'en';
```
## Vue dom
```vue
<p>{{$t.lang}}</p>
<p>{{$t.messages.welcome('guest')}}</p>
<p>{{$t.errors['404']}}</p>
```
## In pure Javascript
```javascript
import translations from 'vue-translations';
//set
translations.locale = 'en';
//get
translations.locale.lang;
translations.locale.messages.welcome('guest');
translations.locale.errors['404'];
```
## Import
```javascript
import translations from 'vue-translations';
import en from '@/locales/en';
import zhHant from '@/locales/zh-hant';

Vue.use(translations, {
    alias: '$t',
    defaultLocale: 'en',
    locales: { en, "zh-hant": zhHant }
});
```
### or use Webpack require.context
```javascript
import Vue from 'vue';
import translations from 'vue-translations';

let locales = [];
let req = require.context("@/locales", true, /\.js$/);
req.keys().forEach(key => {
    locales[key.match(/^.\/(.*).js$/)[1]] = req(key).default
});

Vue.use(translations, {
    alias: '$t',
    defaultLocale: 'en',
    locales
});
```
## /locales/en.js
```javascript
export default {
    lang: 'en', // <-- You can use {{$t.lang}} to get current language code now
    pages: { // For menus
        home: 'Home',
    },
    actions: { // For buttons
        login: 'Login',
        logout: 'Logout',
    },
    keywords: {
        development: 'Development',
    },
    messages: {
        welcome: (name) => `Welcome ${name}.`,
    },
    validations: {
    },
    errors: {
        '404': 'Page Not Found',
    }
}
```
## /locales/zh.js
```javascript
export default {
    lang: 'zh',
    pages: {
        home: '首頁'
    },
    actions: {
        login: '登入',
        logout: '登出',
    },
    keywords: {
        development: '開發'
    },
    messages: {
        welcome: (name) => `歡迎，${name}。`,
    },
    validations: {
    },
    errors: {
        '404': '找不到頁面',
    }
}
```
## With vue-router
If you use URL to control the locale, e.g. http://localhost/en/path
### VueRouter config
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/en' //default
    },
    {
      path: '/:locale',
      component: () => import('@/components/AppFrame'), // component which contains child router-view
      children: routes // your routes
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (!['en','zh'].includes(to.params.locale)) {
    next('en' + to.fullPath);
    return;
  }
  translations.locale = to.params.locale; //update locale
  next();
});
```
### Root router-view
You should add a key into the router-view tag for updating the locale.
```vue
<router-view :key="$route.params.locale"/>
```
