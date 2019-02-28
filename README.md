# vue-translations
Extremely simple code, flexible, and Javascript friendly translations plugin for Vue
# Installation
Just download and place it inside your project. No npm.
# Usage
## Set locale
```javascript
this.$t = 'en';
```
## dom
```vue
<p>{{$t.message.welcome('guest')}}</p>
<p>{{$t.error['404']}}</p>
```
## In pure Javascript
```javascript
import translations from 'your-path';
//set
translations.locale = 'en';
//get
translations.locale.message.welcome('guest');
translations.locale.error['404'];
```
## Import
```javascript
import translations from 'your-path';
import en from '@/locales/en';
import zh from '@/locales/zh';

Vue.use(translations, {
    alias: '$t',
    locales: { en, zh }
});
```
### or use Webpack require.context
```javascript
import translations from 'your-path';

let locales = [];
let req = require.context("@/locales", true, /\.js$/);
req.keys().forEach(key => {
    locales[key.match(/^.\/(.*).js$/)[1]] = req(key).default
});

Vue.use(translations, {
    alias: '$t',
    locales
});
```
## /locales/en.js
```javascript
export default {
    message: {
        'welcome': (name) => `Welcome ${name}.`,
    },
    error: {
        '404': 'Page Not Found',
    }
}
```
## /locales/zh.js
```javascript
export default {
    message: {
        'welcome': (name) => `歡迎，${name}。`,
    },
    error: {
        '404': '找不到頁面',
    }
}
```
