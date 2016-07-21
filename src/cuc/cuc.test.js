/**
 * Created by kmurudkar on 7/20/2016.
 */

import {cuc} from './cuc.angular.js';
import angular from 'angular';

describe('Directive:', ()=> {
  let compile, scope, directiveElem;
  beforeEach(window.module(cuc.name));
  beforeEach(inject((_$rootScope_, _$compile_) => {
    scope = _$rootScope_.$new();
    compile = _$compile_;
    directiveElem = (ele)=> {
      let element = angular.element(ele);
      let compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }
  }));
  describe('Mobile Format Directive:', ()=> {
    it('should have element', function () {
      scope.mobile = 1234;
      let ele = directiveElem('<input type="text" ng-model="mobile" em-format-phone extension="true">');
      expect(ele).to.be.isDefined;
    });

    it('should fail if ngModel is not specified', function () {
      scope.mobile = 1234;
      expect(function () {
        directiveElem('<input type="text" em-format-phone extension="true">');
      }).to.throw(Error);
    });

    describe('Mobile number with extension', ()=> {
      it('should format mobile number from 12345678901234 to 123-456-7890 1234', () => {
        scope.mobile = 12345678901234;
        let ele = directiveElem('<input type="text" ng-model="mobile" em-format-phone extension="true">');
        expect(ele.val()).to.equal('123-456-7890 1234');
      });
      it('should format already formatted mobile number correctly. i.e. 123-456-7890 1234 to 123-456-7890 1234', () => {
        scope.mobile = '123-456-7890 1234';
        let ele = directiveElem('<input type="text" ng-model="mobile" em-format-phone extension="true">');
        expect(ele.val()).to.equal('123-456-7890 1234');
      });
    });

    describe('Mobile number without extension', ()=> {
      it('should format mobile number from 12345678901234 to 123-456-7890', () => {
        scope.mobile = 12345678901234;
        let ele = directiveElem('<input type="text" ng-model="mobile" em-format-phone extension="false">');
        expect(ele.val()).to.equal('123-456-7890');
      });
      it('should format already formatted mobile number correctly. i.e. 123-456-7890 to 123-456-7890', () => {
        scope.mobile = '123-456-7890';
        let ele = directiveElem('<input type="text" ng-model="mobile" em-format-phone extension="false">');
        expect(ele.val()).to.equal('123-456-7890');
      });
    });
  });

  describe('Currency Format Directive:', ()=> {
    it('should have element', function () {
      scope.currency = 1234;
      let ele = directiveElem('<input type="text" ng-model="currency" format="number" />');
      expect(ele).to.be.isDefined;
    });

    it('should not fail if ngModel is not specified', function () {
      expect(function () {
        directiveElem('<input type="text" format="number">');
      }).to.not.throw(Error);
    });

    describe('Currency without dot', ()=> {
      it('should format currency from 1234567890 to 1,234,567,890', () => {
        scope.currency = 1234567890;
        let ele = directiveElem('<input type="text" ng-model="currency" format="number" >');
        expect(ele.val()).to.equal('1,234,567,890');
      });
    });

    describe('Currency with dot', ()=> {
      it('should format currency number 1234567890.12345 to 1,234,567,890.123', () => {
        scope.currency = 1234567890.12345;
        let ele = directiveElem('<input type="text" ng-model="currency" format="number" >');
        expect(ele.val()).to.equal('1,234,567,890.123');
      });
    });
  });

  describe('emPhone filter', ()=> {
    let filter;

    beforeEach(inject((_$filter_) => {
      filter = _$filter_;
    }));

    describe('Mobile number with extension', ()=> {
      it('should return 123 when 123 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('123', true)).to.equal('123');
      });

      it('should return 123-456 when 123456 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('123456', true)).to.equal('123-456');
      });

      it('should return 123-456-7890 when 1234567890 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('1234567890', true)).to.equal('123-456-7890');
      });

      it('should return 123-456-7890 1234 when 12345678901234 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('12345678901234', true)).to.equal('123-456-7890 1234');
      });

      it('should return 123-456-7890 1234 when 12345678901234567890 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('12345678901234567890', true)).to.equal('123-456-7890 1234');
      });
    });
    describe('Mobile number without extension', ()=> {
      it('should return 123 when 123 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('123', false)).to.equal('123');
      });

      it('should return 123-456 when 123456 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('123456', false)).to.equal('123-456');
      });

      it('should return 123-456-7890 when 1234567890 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('1234567890', false)).to.equal('123-456-7890');
      });

      it('should return 123-456-7890 when 12345678901234 is provided', ()=> {
        let emPhoneFilter = filter('emPhone');
        expect(emPhoneFilter('12345678901234', false)).to.equal('123-456-7890');
      });
    });
  });
});


