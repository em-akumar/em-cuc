/*eslint-disable */

import {angular} from 'ems';
import 'ems/dist/ems.test';

let context = require.context('.', true, /\.test\.js/);
context.keys().forEach(context);

/*eslint-enable */