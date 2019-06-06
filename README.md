# vue-translations
Support multiple translations instance and Javascript friendly translations plugin for Vue.
# Installation
npm install require git (https://git-scm.com/)
```
npm install chunlampang/vue-translations-multiple
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
import translations from 'your/path';
//set
translations.$t = 'en';
//get
translations.$t.lang;
translations.$t.messages.welcome('guest');
translations.$t.errors['404'];
```
## Static variables
```javascript
$t.locale;// current locale key
$t.instance;// get translations instance
```
## Import
```javascript
import translations from 'your/path';
import en from '@/locales/en';
import zh from '@/locales/zh';

Vue.use(translations, {
    alias: '$t', //default $t
    defaultLocale: 'en',
    locales: { en, zh }
});

// Can support multiple translations instance in one application
import en2 from '@/locales2/en';
import zhHant2 from '@/locales2/zh-hant';
Vue.use(translations, {
    alias: '$t2',// use alias to identify each instance
    defaultLocale: 'en',
    locales: { 'en': en2, 'zh-hant': zhHant2 }
});
```
### or get ALL locales from directory
```javascript
import Vue from 'vue';
import translations from 'your/path';

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
    /*
     * Since "locale", "instance" are static variables,
     * the value set to them will be overrided!
     */
    locale: 'will be overrided',
    instance: 'will be overrided',

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
import translations from 'your/path';
const instanceT = translations.$t.instance;

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/' + instanceT.defaultLocale // default
    },
    {
      path: '/:locale',
      component: () => import('@/components/AppFrame'), // component which contains child router-view
      children: routes // your routes
    },
  ]
});

router.beforeEach((to, from, next) => {
  let locale = to.params.locale;
  if (!instanceT.localeKeys.includes(locale)) {
    next('/' + instanceT.defaultLocale + to.fullPath);
    return;
  }
  translations.$t = locale; //update locale
  next();
});
```
### Root router-view
You should add a key into the router-view tag for updating the locale.
```vue
<router-view :key="$route.params.locale"/>
```
