
export default {
    install(Vue, { alias = '$t', defaultLocale = Object.keys(locales)[0], locales }) {
        const t = new Translations(locales, defaultLocale),
            getter = function () {
                return t.locale;
            },
            setter = function (key) {
                t.locale = key;
            };

        this.__defineGetter__(alias, getter);
        this.__defineSetter__(alias, setter);

        Vue.prototype.__defineGetter__(alias, getter);
        Vue.prototype.__defineSetter__(alias, setter);
    }
};

class Translations {

    constructor(locales, defaultLocale) {
        this.locales = locales;
        this.defaultLocale = defaultLocale;
        this.currLocale = defaultLocale;
        this.localeKeys = Object.keys(locales);
        //append fixed value
        for (let localeKey in locales) {
            let locale = locales[localeKey];
            locale.locale = localeKey;
            locale.instance = this;
        }
    }

    get locale() {
        return this.locales[this.currLocale];
    }

    set locale(key) {
        this.currLocale = this.locales[key] ? key : this.defaultLocale;
    }
}