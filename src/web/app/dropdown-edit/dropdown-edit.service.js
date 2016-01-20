import {emsApi} from 'ems';

class DropdownEditService {
  /* @ngInject */
  constructor() {
  }
  resolvePromise() {
    return emsApi.fetch('http://restcountries.eu/rest/v1/all');
  }
}

export default DropdownEditService;
