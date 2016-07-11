import {toggleSwitchModule} from './toggle-switch.module';
import ToggleswitchController from './toggle-switch.controller';
import toggleSwitchTemplate from './toggle-switch.html';

describe('Toggleswitch', () => {
  let $rootScope, makeController; // eslint-disable-line no-unused-vars

  beforeEach(window.module(toggleSwitchModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ToggleswitchController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a label property [REMOVE]', () => { // erase if removing this.label from the controller
      let controller = makeController();
      expect(controller).to.have.property('label');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has label in template [REMOVE]', () => {
      expect(toggleSwitchTemplate).to.match(/{{\s?::\s?vm\.label\s?}}/g);
    });
  });
});
