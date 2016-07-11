/*eslint-disable */

import {angular} from 'angular';
import 'ems/dist/web/ems.test';

let context = require.context('.', true, /\.test\.js/);
context.keys().forEach(context);

/*eslint-enable */
