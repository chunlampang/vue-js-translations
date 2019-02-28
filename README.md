# vue-translation
Extremely simple code and flexible translation plugin for Vue

# Usage
import Vue from 'vue';
import en from '@/locales/en';
import zh from '@/locales/zh';

Vue.use(translation, {
    alias: '$t',
    locales: { en, zh }
});

#locales/en.js
export default {
    error:{
        '404':'Page Not Found',
    }
}
#dom
<p>{{$t.error['404']}}</p>