
/**
 * Created by tonychan on 1/11/2015.
 */

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;


// import corresponding page object javascript file(s)
var CreateDropdown = require('../test/dropdown.pageobject.js');
// import corresponding test data json file(s)
var TestData = require('../test/dropdown.testdata.json');

describe('cuic-427 dropdown functional test suite ->', function(){
  beforeEach(function () {
    browser.get('#/dropdown');
    browser.ignoreSynchronization = false;
    browser.waitForAngular();
  });

  afterEach(function () {
    browser.driver.sleep(2000);
  });

  describe('dropdown panel ->', function() {

    it('cuic-428 should show when dropdown selector box is clicked', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdownselector.click();

      expect(dropdown.dropdownmenu.isDisplayed()).to.eventually.equal(true);

    });

    it('cuic-430 should show when dropdown caret is clicked', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdowncaret.click();

      expect(dropdown.dropdownmenu.isDisplayed()).to.eventually.equal(true);

    });

    it('cuic-429 default Placeholder text should be Select One', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdownselector.click();

      expect(dropdown.dropdownselector.getText()).to.eventually.equal(TestData.DefaultPlaceholderText);

    });

    it('cuic-432 should show the selected list-item when the item is selected', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdownselector.click();

      browser.wait(function(){
        return dropdown.selectedlistitem.isPresent();
      }, 3000);

      dropdown.selectedlistitem.click();

      expect(dropdown.dropdownselector.getText()).to.eventually.equal(TestData.Country);

    });

    it('cuic-441 should close without making any selection when the ESC key is pressed', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdownselector.click();
      browser.wait(function(){
        return dropdown.selectedlistitem.isPresent();
      }, 3000);

      browser.actions().sendKeys(protractor.Key.ESCAPE).perform();

      expect(dropdown.dropdownmenu.isDisplayed()).to.eventually.equal(false);
      expect(dropdown.dropdownselector.getText()).to.eventually.equal(TestData.DefaultPlaceholderText);
    });

    it('cuic-438 should NOT be able to type/enter any string in the selector field', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdownselector.click();
      browser.actions().sendKeys(TestData.AnyText).perform();

      expect(dropdown.dropdownselector.getText()).to.eventually.not.equal(TestData.AnyText);

    });

    it.skip('default sort order should be from A-Z', function () {

      var dropdown = new CreateDropdown();

      dropdown.dropdownselector.click();

      browser.driver.sleep(3000);

      var tabs = element.all(by.css('.dropdown-menu.large')).map(function (elm) {
        return elm.getText();
      });

      tabs.then(function (result) {
        console.log("result.length = " + result.length);
        console.log("result = " + result);
      });

      /*
      var ele = element.all(by.css ('.dropdown-menu.large'));
      ele.map(function(eachName){
        return eachName.getText().then(function(unSorted){
          return unSorted;
        });
      }).then(function(unSorted){
        var sorted = unSorted.slice();
        sorted = sorted.sort(); //sort the array
        expect(sorted).to.eventually.equal(unSorted); //check if both sorted and unsorted arrays are same
      });
      */

    });

  });
});

