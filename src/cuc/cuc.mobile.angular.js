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
            if (!ctrl) return;

            ctrl.$formatters.unshift((a) => {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('keyup', (event) => {
            var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
            if ($filter(attrs.format)(plainNumber) === '0') {
              elem.val('');
            }
            else {
              elem.val($filter(attrs.format)(plainNumber));
            }
          });
        }
    };
}]);


export {cucm};
