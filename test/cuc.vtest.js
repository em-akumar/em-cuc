/* Visual Testing configuration along with capturing screenshots and comparsion by using Protractor*/
/*eslint-disable */

import {angular} from 'ems';
import 'ems/dist/ems.test';

let context = require.context('../src/cuc', true, /\.vtest\.js/);
context.keys().forEach(context);

/*eslint-enable */
