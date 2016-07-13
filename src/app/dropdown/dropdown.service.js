
class DropdownService {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }
  resolvePromise() {
    return this.$http.get('branches.json');
  }
}

export default DropdownService;
