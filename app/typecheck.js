export default {
    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}