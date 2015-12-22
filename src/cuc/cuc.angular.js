/* eslint-disable */
import {angular} from 'ems';
import * as emc from './cuc';

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

let cuc = angular.module('cuc', []);

cuc.directive('emc', () => {
  return {
    restrict: 'A',
    replace: true,
    link: (scope, elem, attrs) => {
      if (getVal(scope, attrs.options) !== '') {
        setVal(scope, (attrs.control || ''), new emc[attrs.emc](elem[0], getVal(scope, attrs.options)));
      } else {
        setVal(scope, (attrs.control || ''), new emc[attrs.emc](elem[0]));
      }
      if (attrs.watchdepth !== undefined)
        watchProps(attrs.watchdepth, scope, [attrs.options], getVal(scope, attrs.reinit || 'vm.reinit')
          .bind(scope));
    }
  };
});

cuc.directive('uiGridPrint', function () {
  return {
    link: function (scope, element, attrs) {
      document.querySelector(attrs.uiGridPrint).addEventListener('click', function () {
        scope._body = '';
        scope._head = '';
        var rows = scope.gridApi.core.getVisibleRows();
        scope.gridApi.grid.columns.map(function (col) {
          if (typeof rows[0].entity[col.field] !== 'undefined' && typeof rows[0].entity[col.field] !== 'object') {
            scope._head += '<td>' + col.displayName + '</td>';
          }
        });
        rows.forEach(function (row) {
          scope._body += '<tr>';

          scope.gridApi.grid.columns.map(function (col) {
            if (typeof row.entity[col.field] !== 'undefined' && typeof row.entity[col.field] !== 'object')
              scope._body += '<td>' + row.entity[col.field] + '</td>';
          });
          scope._body += '</tr>';
        });

        window._mywindow = window.open('', '', '');
        window._mywindow_mywindow.document.write('<table>' + scope._head + scope._body + '</table>');
        window._mywindow_mywindow.document.close();
        window._mywindow_mywindow.print();
      }.bind(this));
      window.onafterprint = function () {
        window._mywindow_mywindow.close();
        scope._body = '';
      };
    },
    restrict: 'A'
  };
});

export {cuc};
