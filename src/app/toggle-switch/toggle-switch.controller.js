class ToggleSwitchController {
  /* @ngInject */
  constructor(ToggleSwitchService, $timeout) {
    this.toggleSwitchService = ToggleSwitchService;
    // this.initialize();
    this.optionsBase = {
        onChange: function (val) {
          console.log(val);
        }
    };
    this.optionsMd = {
        switchStateDistence: '45%',
        size: 'md',
        onChange: function (val) {
          console.log(val);
        }
    };
    this.optionsMdText = {
        positiveTemplate: `<div class="em-on-switch" >On</div>`,
        negativeTemplate: `<div class="em-off-switch" >Off</div>`,
        switchTemplate: `<div class="em-switch" ><div class="switch-cust-icon"></div></div>`,
        switchStateDistence: '45%',
        size: 'md',
        onChange: function (val) {
          console.log(val);
        }
    };
    this.optionsSmFlex = {
        positiveTemplate: `<div class="em-on-switch" ><div class="switch-cust-on">Good one</div></div>`,
        negativeTemplate: `<div class="em-off-switch" ><div class="switch-cust-on">Bad one</div></div>`,
        switchStateDistence: '75%',
        size: 'flex-sm',
        onChange: function (val) {
          console.log(val);
        }
    };
     this.optionsCustom = {
        positiveTemplate: `<div class="em-sunshine" >GM</div>`,
        negativeTemplate: `<div class="em-evening" >GN</div>`,
        switchTemplate: `<div class="em-sun" ></div>`,
        switchStateDistence: '55%',
        size: 'flex-md',
        onChange: function (val) {
          console.log(val);
        }
    };
     this.optionsDisabled = {
        positiveTemplate: `<div class="em-on-switch" ><div class="switch-cust-on">Good one</div></div>`,
        negativeTemplate: `<div class="em-off-switch" ><div class="switch-cust-on">Bad one</div></div>`,
        switchStateDistence: '75%',
        size: 'flex-sm',
       mode: 'disable'
     };
     this.optionsReadOnly = {
       positiveTemplate: `<div class="em-on-switch" ><div class="switch-cust-on">Good one</div></div>`,
       negativeTemplate: `<div class="em-off-switch" ><div class="switch-cust-on">Bad one</div></div>`,
       switchStateDistence: '75%',
       size: 'flex-sm',
       mode: 'readonly'
     };
    $timeout(() => {
      this.switch.setSwitch(false);
    });

  }
  initialize() {
    this.toggleSwitchService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ToggleSwitchController;
