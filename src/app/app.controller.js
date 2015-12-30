export default class AppController {
  /* @ngInject */
  constructor(AppService, $scope) {
    this.appService = AppService;
    this.scope = $scope;
    let mobileView = 992;
    let IsToggle = true;

    this.scope.$watch(this.getWidth, function(newValue, oldValue) {
      if (newValue >= mobileView) {
        if (angular.isDefined(IsToggle)) {
          this.toggle = !IsToggle ? false : true;
        }
        else {
          this.toggle = true;
        }
      }
      else {
        this.toggle = false;
      }
      console.log(this.toggle);
    }.bind(this));



    // .initialize();
  }

  getWidth() {
    return window.innerWidth;
  }

  onresize() {
    console.log('resize');
    this.scope.$apply();
  }

  /**/

  toggleSidebar() {
    console.log('toggleSidebar');
    this.toggle = !this.toggle;
  }


  initialize() {

    this.appService.resolvePromise().then((response) => {
      this.data = response.data;
    });

  }
}
