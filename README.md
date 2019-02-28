# vue-translation
Extremely simple code and flexible translation plugin for Vue

# Usage
<pre>
import Vue from 'vue';
import en from '@/locales/en';
import zh from '@/locales/zh';

Vue.use(translation, {
    alias: '$t',
    locales: { en, zh }
});
</pre>
## locales/en.js
<pre>
export default {
    error:{
        '404':'Page Not Found',
    }
}
</pre>
## locales/en.js
<pre>
export default {
    error:{
        '404': '找不到頁面',
    }
}
</pre>
## dom
<pre>
<p>{{$t.error['404']}}</p>
</pre>
