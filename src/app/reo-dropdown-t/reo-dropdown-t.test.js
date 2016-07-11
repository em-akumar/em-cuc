import {reoDropdownTModule} from './reo-dropdown-t.module';
import ReodropdowntController from './reo-dropdown-t.controller';
import reoDropdownTTemplate from './reo-dropdown-t.html';

describe('Reodropdownt', () => {
  let $rootScope, makeController; // eslint-disable-line no-unused-vars

  beforeEach(window.module(reoDropdownTModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ReodropdowntController();
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
      expect(reoDropdownTTemplate).to.match(/{{\s?::\s?vm\.label\s?}}/g);
    });
  });
});
