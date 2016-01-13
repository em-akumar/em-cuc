/* Unit Testing configuration */
/*eslint-disable */

import {angular} from 'ems';
import 'ems/dist/ems.test';

let context = require.context('../src/cuc', true, /\.utest\.js/);
context.keys().forEach(context);

/*eslint-enable */
