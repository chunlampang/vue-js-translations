let _code, _locales, _defaultLocale;

const translations = {
    get locale() {
        return _locales[_code];
    },
    set locale(code) {
        _code = _locales[code] ? code : _defaultLocale;
    },
    install(Vue, { alias = '$t', defaultLocale, locales }) {
        _locales = locales;
        _defaultLocale = defaultLocale;
        Vue.prototype.__defineGetter__(alias, this.__lookupGetter__('locale'));
        Vue.prototype.__defineSetter__(alias, this.__lookupSetter__('locale'));
    },
};
export default translations;