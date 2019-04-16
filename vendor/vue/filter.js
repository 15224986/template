
/**
 * 反向排序
 */
Vue.filter('reverse', function (value) {
    return value.split('').reverse().join('');
});

/**
 * 所有字母小写
 */
Vue.filter('lowercase', function (value) {
    return value.toLowerCase();
});

/**
 * 所有字母大写
 */
Vue.filter('uppercase', function (value) {
    return value.toUpperCase();
});















