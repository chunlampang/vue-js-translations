# vue-translations
Extremely simple code, flexible, and Javascript friendly translations plugin for Vue
# Example
## Set locale
<pre>
this.$t = 'en';
</pre>
## dom
```html
<p>{{$t.message.welcome('guest')}}</p>
<p>{{$t.error['404']}}</p>
```
## pure Javascript
<pre>
import translations from 'your-path';
//set
translations.locale = 'en';
//get
translations.locale.message.welcome('guest');
translations.locale.error['404'];
</pre>
## Import
<pre>
import translations from 'your-path';
import en from '@/locales/en';
import zh from '@/locales/zh';

Vue.use(translations, {
    alias: '$t',
    locales: { en, zh }
});
</pre>
### or use Webpack require.context
<pre>
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
</pre>
## locales/en.js
<pre>
export default {
    message: {
        'welcome': (name) => `Welcome ${name}.`,
    },
    error: {
        '404': 'Page Not Found',
    }
}
</pre>
## locales/zh.js
<pre>
export default {
    message: {
        'welcome': (name) => `歡迎，${name}。`,
    },
    error: {
        '404': '找不到頁面',
    }
}
</pre>
