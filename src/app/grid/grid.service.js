
class GridService {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }
  resolvePromise() {
    return this.$http.get('http://www.json-generator.com/api/json/get/cqcrdXPTci');
  }
}

export default GridService;
