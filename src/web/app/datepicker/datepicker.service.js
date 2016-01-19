import {emsApi} from 'ems';

class DatepickerService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('app.json');
  }
}

export default DatepickerService;
