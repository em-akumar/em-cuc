/* Functional Testing configuration by using protractor */
/*eslint-disable */

//let context = require.context('./src/cuc', true, /\.ftest\.js/);
let context = require.context('./src/cuc/controls', true, /^\.\/.*\.ftest.js$/);
context.keys().forEach(context);
console.log(context.keys());

/*eslint-enable */
