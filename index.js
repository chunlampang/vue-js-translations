let _code, _locales;

const translation = {
    get locale() {
        return _locales[_code];
    },
    set locale(code) {
        _code = code;
    },
    install(Vue, { alias = '$translation', locales }) {
        _locales = locales;
        Vue.prototype.__defineGetter__(alias, this.__lookupGetter__('locale'));
        Vue.prototype.__defineSetter__(alias, this.__lookupSetter__('locale'));
    },
};
export default translation;