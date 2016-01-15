/**
 * Created by tonychan on 1/11/2015.
 */

var TestData = require('../test/dropdown.testdata.json');
//var DropDown = function(){

module.exports = function(){

  // --------------------------------------------------------------------//
  var dropdownselector_cssLocator = '.selectedText.pull-left.large';
  var dropdowncaret_cssLocator = '.caret';
  var dropdownmenu_cssLocator = '.dropdown-menu.large';
  var listitem_cssLocator = '[class="dropdown-menu large"]>LI>A';

  this.dropdownselector = element(by.css(dropdownselector_cssLocator));
  this.dropdowncaret = element(by.css(dropdowncaret_cssLocator));
  this.dropdownmenu = element(by.css(dropdownmenu_cssLocator));
  this.selectedlistitem = element(by.cssContainingText(listitem_cssLocator,TestData.Country));
  this.menulist = element(by.css('.dropdown-menu.large')).all(by.tagName('li'));

};

//module.exports = DropDown();
