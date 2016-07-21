/* eslint-disable */
import angular from 'angular';
import * as emcm from './cuc.mobile';

let setVal = (obj, path, val) => {
  if (path === '') {
    return;
  }
  var i = 0;
  path = path.split('.');
  for (var len = path.length; i + 1 < len; i++) {
    obj = obj[path[i]];
  }

  obj[path[i]] = val;
};

let findVal = (obj, path) => {
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, '');           // strip a leading dot
  var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
};

let getVal = (obj, path) => {
  var i = 0;
  if (path) {
    path = path.split('.');
    for (var len = path.length; i + 1 < len; i++) {
      obj = obj[path[i]];
    }
    return obj[path[i]] == undefined ? '' : obj[path[i]];
  }
  return '';
};

let watchProps = (watchDepth, scope, watchExpressions, listener) => {
  if (watchDepth === 'collection' && angular.isFunction(scope.$watchCollection)) {
    watchExpressions.forEach((expr) => {
      scope.$watchCollection(expr, listener);
    });
  } else if (watchDepth === 'reference') {
    if (angular.isFunction(scope.$watchGroup)) {
      scope.$watchGroup(watchExpressions, listener);
    } else {
      watchExpressions.forEach((expr) => {
        scope.$watch(expr, listener);
      });
    }
  } else {
    watchExpressions.forEach(function (expr) {
      scope.$watch(expr, listener, true);
    });
  }
};

let cucm = angular.module('cucm', []);

cucm.directive('emcm', () => {
  return {
    restrict: 'A',
    replace: true,
    link: (scope, elem, attrs) => {
      var elementName = attrs.emcm + '_' + Math.random().toString(36).slice(2);
      if (getVal(scope, attrs.options) != '') {
        setVal(scope, (attrs.control || elementName), new emcm[attrs.emcm](elem[0], getVal(scope, attrs.options)));
      }
      else {
        setVal(scope, (attrs.control || elementName), new emcm[attrs.emcm](elem[0]));
      }
      scope.$watch(attrs.options, function () {
        getVal(this.scope, (this.attrs.control || elementName)).options = getVal(this.scope, this.attrs.options);
      }.bind({scope: scope, attrs: attrs}), true);
      watchProps(attrs.watchdepth, scope, [(attrs.control || elementName) + '.options'],
        attrs.reinit ? getVal(scope, attrs.reinit).bind(scope) : (getVal(scope, (attrs.control || elementName)).reinit || function () {
        }).bind(getVal(scope, (attrs.control || elementName))));
    }
  };
});

// Directive for formatting input in currency format.
cucm.directive('format', ['$filter', ($filter) => {
  return {
    require: '?ngModel',
    link: function (scope, elem, attrs, ctrl) {
      if (!ctrl) {
        return;
      }

      ctrl.$formatters.unshift((a) => {
        return $filter(attrs.format)(ctrl.$modelValue)
      });

      let formatNumber = (plainNumber, format)=> {
        return $filter(format)(plainNumber) === '0' ? '' : $filter(format)(plainNumber);
      };

      elem.bind('blur', (event) => {
        let plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        elem.val(formatNumber(plainNumber, attrs.format));
      });

      elem.bind('keyup', (event) => {
        let plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        let key = event.keyCode;
        //Checking for '.'(dot)
        if (key === 190) {
          if (plainNumber.split('.').length === 2) {
            elem.val(plainNumber);
          }
          else {
            event.preventDefault();
          }
        }
        else {
          if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
            return;
          }
          else {
            elem.val(formatNumber(plainNumber, attrs.format));
          }
        }
      });
    }
  };
}]);

// Directive for formatting US mobile number with and without extension.
// <input type="text" ng-model="Phone" em-format-phone extension="true"/>
// Result : 982-346-6168 1234
// <input type="text" ng-model="Phone" em-format-phone extension="false"/>
// Result : 982-346-6168
cucm.directive('emFormatPhone', ['$filter', '$browser', ($filter, $browser)=> {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: ($scope, $element, $attrs, ngModelCtrl)=> {
      let isExtension = $attrs.extension === 'true';
      var listener = ()=> {
        let value = $element.val().replace(/[^0-9]/g, '');
        $element.val($filter('emPhone')(value, isExtension, false));
      };

      ngModelCtrl.$parsers.push((viewValue)=> {
        let len = isExtension ? 14 : 10;
        return viewValue.replace(/[^0-9]/g, '').slice(0, len);
      });

      // This runs when the model gets updated on the scope directly and keeps our view in sync
      ngModelCtrl.$render = ()=> {
        $element.val($filter('emPhone')(ngModelCtrl.$viewValue.replace(/[^0-9]/g, ''), isExtension, false));
      };

      $element.bind('change', listener);
      $element.bind('keydown', (event)=> {
        let key = event.keyCode;
        // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
        // This lets us support copy and paste too
        if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          return;
        }
        $browser.defer(listener); // Have to do this or changes don't get picked up properly
      });

      $element.bind('paste cut', () => {
        $browser.defer(listener);
      });
    }
  }
}]);

cucm.filter('emPhone', ()=> {
  return (phone, type) => {
    if (!phone) {
      return '';
    }

    let number = phone.replace(/[^0-9]/g, '');

    if (number.length > 10 && type) {
      number = `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)} ${number.slice(10, 14)}`;
    }
    else if (number.length > 6) {
      number = `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
    }
    else if (number.length > 3) {
      number = `${number.slice(0, 3)}-${number.slice(3, 6)}`;
    }
    return number;
  };
});

export {cucm};
