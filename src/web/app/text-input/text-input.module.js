import angular from 'angular';
import {uiRouter} from 'ems/core';

import textInputComponent from './text-input.component';
import TextInputService from './text-input.service';

import sizeTemplate from './templates/text-input-size.html';
import statesTemplate from './templates/text-input-states.html';
import errorHandlingTemplate from './templates/text-input-error-handling.html';
import withLabelTemplate from './templates/text-input-with-label.html';
import withIconTemplate from './templates/text-input-with-icon.html';
import labelWrappingTemplate from './templates/text-input-label-wrapping.html';
import maskingTemplate from './templates/text-input-masking.html';
import symbolsTemplate from './templates/text-input-symbols.html';
import lockTemplate from './templates/text-input-lock.html';

let textInputModule = angular.module('textInput', [uiRouter]);

textInputModule.config(($stateProvider) => {
  $stateProvider.state('text-input', {
    url: '/text-input',
    template: '<text-input-component></text-input-component>'
  });
});

textInputModule.directive('textInputComponent', textInputComponent);
textInputModule.service('TextInputService', TextInputService);

textInputModule.directive('textInputSize', () => {
  return {
    template: sizeTemplate
  };
});

textInputModule.directive('textInputStates', () => {
  return {
    template: statesTemplate
  };
});

textInputModule.directive('textInputErrorHandling', () => {
  return {
    template: errorHandlingTemplate
  };
});

textInputModule.directive('textInputLabel', () => {
  return {
    template: withLabelTemplate
  };
});

textInputModule.directive('textInputWithIcon', () => {
  return {
    template: withIconTemplate
  };
});

textInputModule.directive('textInputLabelWrapping', () => {
  return {
    template: labelWrappingTemplate
  };
});

textInputModule.directive('textInputMasking', () => {
  return {
    template: maskingTemplate
  };
});

textInputModule.directive('textInputSymbols', () => {
  return {
    template: symbolsTemplate
  };
});

textInputModule.directive('textInputLock', () => {
  return {
    template: lockTemplate
  };
});

textInputModule.directive('decimalOnly', function () {
    return {
      restrict: 'EA',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
           scope.$watch(attrs.ngModel, function(newValue, oldValue) {
             var spiltArray = String(newValue).split("");

              /*To allow only positive decimals*/
              if(attrs.allowNegative == "false") {
                if(spiltArray[0] == '-') {
                  newValue = newValue.replace("-", "");
                  ngModel.$setViewValue(newValue);
                  ngModel.$render();
                }
             }

              /*to restrict number of digits after decimal points*/
              if (attrs.decimalUpto == 0) {
                if (newValue) {
                  newValue = newValue.replace(".", "");
                  console.log(newValue);
                  ngModel.$setViewValue(newValue);
                  ngModel.$render();
                }

              }else {
                   var n = String(newValue).split(".");
                   if(n[1]) {
                      var n2 = n[1].slice(0, attrs.decimalUpto);
                      newValue = [n[0], n2].join(".");
                      ngModel.$setViewValue(newValue);
                      ngModel.$render();
                   }
              }


              if (spiltArray.length === 0) return;
              if (spiltArray.length === 1 && (spiltArray[0] == '-' || spiltArray[0] === '.' )) return;
              if (spiltArray.length === 2 && newValue === '-.') return;

                /*Check it is number or not.*/
                if (isNaN(newValue)) {
                  ngModel.$setViewValue(oldValue || '');
                  ngModel.$render();
                }
            });
        }
    };
});

export default textInputModule;
