/* eslint-disable */
import angular from 'angular';
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

let cuc = angular.module('cuc', []);

cuc.directive('emc', () => {
  return {
    restrict: 'A',
    replace: true,
    link: (scope, elem, attrs) => {
      var elementName = attrs.emc + '_' + Math.random().toString(36).slice(2);
      if (getVal(scope, attrs.options) != '') {
        setVal(scope, (attrs.control || elementName), new emc[attrs.emc](elem[0], getVal(scope, attrs.options)));
      }
      else {
        setVal(scope, (attrs.control || elementName), new emc[attrs.emc](elem[0]));
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

cuc.directive('ckEditor', () => {
  return {
    require: '?ngModel',
    scope: {'configOptions': '=config'},
    link: function ($scope, elm, attr, ngModel) {

      var ck = CKEDITOR.replace(elm[0], $scope.configOptions);

      ck.on('pasteState', function () {
        $scope.$apply(function () {
          ngModel.$setViewValue(ck.getData());
        });
      });

      ngModel.$render = function (value) {
        ck.setData(ngModel.$modelValue);
      };
    }
  };
});

cuc.directive('uiGridPrint', function ($compile, $timeout) {
  return {
    link: function (scope, element, attrs, uiGridctrl) {
      uiGridctrl.grid.api.core.on.rowsRendered(scope, function () {
        if (uiGridctrl.grid.renderContainers.body.visibleRowCache.length === 0) {
          return;
        }
        scope._head = '';
        var rows = uiGridctrl.grid.api.core.getVisibleRows();
        uiGridctrl.grid.api.grid.columns.map(function (col) {
          if (col.displayName !== '')
            scope._head += '<td>' + col.displayName + '</td>';
        });
        scope._body = [];
        rows.forEach(function (row, rowindex) {
          scope._body[rowindex] = [];
          uiGridctrl.grid.api.grid.columns.map(function (col, colindex) {
            var rowScope = scope.$new(true);
            rowScope.row = row;
            rowScope.col = col;

            if (col.displayName !== '') {
              if (col.cellTemplate.indexOf('COL_FIELD') == -1) {
                var temp = $compile(col.cellTemplate)(rowScope);

                $timeout(() => {
                  if (scope._body[rowindex])
                    scope._body[rowindex][colindex] = '<td>' + angular.element(temp[0]).html() + '</td>';
                }, 100);
              }
              else {
                var colValue = '';
                if (!row.entity[col.field] && col.field) {
                  colValue = findVal(row.entity, col.field);
                } else {
                  colValue = row.entity[col.field];
                }
                scope._body[rowindex][colindex] = '<td>' + colValue + '</td>';

              }
            }
          });
        });

      });
      document.querySelector(attrs.uiGridPrint).addEventListener('click', function () {
        let body = '<tr>';
        scope._body.forEach((rowitem) => {
          body += rowitem.join('') + '</tr><tr>';
        });
        body += '</tr>';
        //var str = element[0].querySelector('.ui-grid-canvas').innerHTML;
        window._mywindow = window.open('', '', '');
        _mywindow.document.write('<table>' + scope._head + body + '</table>');
        _mywindow.document.close();
        _mywindow.print();
      }.bind(this));
      window.onafterprint = function () {
        // clean the print section before adding new content
        _mywindow.close();
        scope._body = "";
      }

    },
    restrict: 'A',
    require: '^uiGrid'
  };
});

cuc.directive('uiGridCustomPaging', function ($compile, $timeout) {
  return {
    link: function (scope, element, attrs, uiGridctrl) {
      uiGridctrl.grid.options.enablePaginationControls = false;
      scope._initfirst = true;
      uiGridctrl.grid.api.core.on.rowsRendered(scope, function () {
        if (uiGridctrl.grid.renderContainers.body.visibleRowCache.length === 0) {
          return;
        }
        if (scope._initfirst) {
          initPage(scope);
          scope._initfirst = false;
        }
      });

      uiGridctrl.grid.api.core.on.filterChanged(scope, () => {
        $timeout(() => {
          initPage(scope);
        }, 200);
      });
      function initPage(scope) {

        var divPage = document.createElement('div');
        divPage.innerHTML = '<div class="em-complex-table-footer">' +
        '<span class="em-pageview" style="display:none">' +
        '<select ng-model="_selectedVal" ng-change="_pageOnClickSelect()"> ' +
        '<option ng-selected="$first" ng-repeat="item in _pageListItems"  value="{{item.value}}">{{item.text}}</option> ' +
        '</select>' +
        '<label class="em-pageview-arrow"></label>' +
        '<span>&nbsp; of {{_pageTotalCount}}</span>' +
        '<label class="em-pageview-arrow"></label>' +
        '</span>' +
        '<span class="em-pageview" ng-mouseover="_onPageSelectOver()" ng-mouseleave="_onPageSelectLeave()" >' +
        '<div class="em-page-ddl" ng-click="_onPageSelectClick()" options="pagingSelectOptions" emc="Dropdown"></div> ' +
        '<label class="em-pageview-arrow"></label>' +
        '<span>&nbsp; per page</span>' +
        '</span>' +
        '<nav class="em-pagination" style="display:">' +
        '<span class="em-left-arrow" style="display:">' +
        '<a style="opacity:0" ng-click="_leftArrow_click()">0</a>' +
        '</span>' +
        '<ul class="pagination">' +
        '<li class="active" ng-click="_pageOnClick($event)" style="display:"><a>0</a></li>' +
        '<li style="display:"><i>...</i></li>' +
        '<li ng-click="_pageOnClick($event)"><a>1</a></li> <li class="" ng-click="_pageOnClick($event)"><a>2</a></li> <li ng-click="_pageOnClick($event)" class=""><a>3</a></li>' +
        '<li style="display:"><i>...</i></li>' +
        '<li style="display:" ng-click="_pageOnClick($event)"><a>20</a></li>' +
        '</ul>' +
        '<span class="em-right-arrow" style="display:">' +
        '<a style="opacity:0" ng-click="_rightArrow_click()">2</a>' +
        '</span>' +
        '</nav>' +
        '</div>';
        if (element[0].querySelector('.em-complex-table-footer')) {
          let elementToRemove = element[0].querySelector('.em-complex-table-footer').parentNode;
          elementToRemove.parentNode.removeChild(elementToRemove);
        }
        element[0].appendChild(divPage);
        var perpageRow = uiGridctrl.grid.options.paginationPageSize;
        var totalRow = uiGridctrl.grid.options.totalItems;
        var maxPage = Math.ceil(totalRow / perpageRow);
        var selectPage = element[0].querySelector('.em-pageview select');
        var leftArrow = element[0].querySelector('.em-left-arrow');
        var rightArrow = element[0].querySelector('.em-right-arrow');
        var pageMaster = element[0].querySelectorAll('.pagination');
        var pageList = element[0].querySelectorAll('.pagination li');
        var html = '';
        var pageListItems = [];
        for (var i = 0; i < maxPage; ++i) {
          pageListItems.push({
            value: i,
            text: (perpageRow * i + 1) + '-' + (maxPage - 1 == i ? totalRow : (perpageRow * (i + 1)))
          });
        }
        scope._pageListNumItems = uiGridctrl.grid.options.paginationPageSizes.map((val) => {
          return {value: val.toString(), text: val.toString()};
        });
        scope.pagingSelectOptions = {
          sortFieldType: 'number',
          defaultText: uiGridctrl.grid.options.paginationPageSize,
          onChange: function (e) {
            scope._onPageSelectLeave();
            scope._selectedPageVal = e.target.getAttribute('value');
            scope._pageOnNumSelect();
          },
          defaultSize: 'xs',
          itemList: scope._pageListNumItems
        };
        scope._selectedPageVal = String(uiGridctrl.grid.options.paginationPageSize);
        scope._pageListItems = pageListItems;
        //selectPage.innerHTML = (html);
        scope._pageTotalCount = totalRow;
        scope._selectedVal = '0';
        var pageArray = null;
        try {
          pageArray = Array.prototype.slice.call(pageList, 0); //non-IE and IE9+
        } catch (ex) {
          pageArray = new Array();
          for (var i = 0, len = pageList.length; i < len; i++) {
            pageArray.push(pageList[i]);
          }
        }
        var startPage = pageArray[0];
        var startExt = pageArray[1];
        var endPage = pageArray[6];
        var endExt = pageArray[5];
        $compile(divPage)(scope);
        function changePage(val) {
          var changedAct = false;
          startPage.classList.remove('active');
          endPage.classList.remove('active');
          if (val == 1) {
            startPage.classList.add('active');
          }
          if (val == maxPage) {
            endPage.classList.add('active');
          }

          pageMiddle.forEach(function (item) {
            item.classList.remove('active');
            if (Number(item.innerText) == val) {
              item.classList.add('active');
              changedAct = true;
            }
          });
          if (val < maxPage) {
            rightArrow.classList.remove('disable');
          }
          else {
            rightArrow.classList.add('disable');
          }
          if (val > 1) {
            leftArrow.classList.remove('disable');
          }
          else {
            leftArrow.classList.add('disable');
          }
          if (changedAct)
            return;
          if (val < maxPage - 2 && val > 2) {
            startExt.style.display = '';
            endExt.style.display = '';
            leftArrow.classList.remove('disable');
            rightArrow.classList.remove('disable');
          }
          if (val >= maxPage - 2) {
            endExt.style.display = 'none';
            if (val == maxPage)
              rightArrow.classList.add('disable');
          }
          else {
            if (maxPage > 4) {
              if (maxPage > 5)
                endExt.style.display = '';
              rightArrow.classList.remove('disable');
            }
          }
          if (val < 4) {
            startExt.style.display = 'none';
            if (val == 1)
              leftArrow.classList.add('disable');
          }
          else {
            if (maxPage > 4) {
              if (maxPage > 5)
                startExt.style.display = '';
              leftArrow.classList.remove('disable');
            }
          }
          var initMd = val;

          if (initMd < 4)
            initMd = 2;
          if (initMd > maxPage - 3)
            initMd = maxPage - 3;
          if (initMd < 2)
            initMd = 2;
          pageMiddle.forEach(function (el) {
            el.childNodes[0].innerHTML = initMd;
            if (val === initMd)
              el.classList.add('active');
            initMd++;
          });
          if (val < maxPage) {
            rightArrow.classList.remove('disable');
          }
          else {
            rightArrow.classList.add('disable');
          }
          if (val > 1) {
            leftArrow.classList.remove('disable');
          }
          else {
            leftArrow.classList.add('disable');
          }

        }

        var pageOnclick = function (e) {
          var val = e.target.innerText;
          changePage(val);
          selectPage.value = val - 1;

          selectPage.style.width = ( selectPage.options[selectPage.selectedIndex].text.length * 10) + 'px';
          uiGridctrl.grid.api.pagination.seek(Number(val));
        };

        scope._pageOnClick = pageOnclick;
        var pageMiddle = pageArray.slice(2, 5);
        scope._pageOnClickSelect = function () {
          var val = Number(scope._selectedVal) + 1;
          changePage(val);
          selectPage.style.width = ( selectPage.options[selectPage.selectedIndex].text.length * 10) + 'px';
          uiGridctrl.grid.api.pagination.seek(Number(val));
        }
        scope._pageOnNumSelect = (e)=> {
          // uiGridctrl.grid.api.pagination
          uiGridctrl.grid.options.paginationPageSize = scope._selectedPageVal;
          initPage(scope);
        }
        scope._onPageSelectLeave = (e)=> {
          element[0].querySelector('.em-complex-table-footer .em-page-ddl').classList.remove('hover');
        }
        scope._onPageSelectClick = (e)=> {
          element[0].querySelector('.em-complex-table-footer .em-page-ddl').classList.remove('hover');
        }
        scope._onPageSelectOver = (e) => {
          if (!element[0].querySelector('.em-complex-table-footer .em-page-ddl').classList.contains('open'))
            element[0].querySelector('.em-complex-table-footer .em-page-ddl').classList.add('hover');
        }
        selectPage.onchange = function (e) {
          var val = Number(e.target.value) + 1;
          changePage(val);
          //bad fix.. need to fins solution
          selectPage.style.width = ( selectPage.options[selectPage.selectedIndex].text.length * 10) + 'px';
          uiGridctrl.grid.api.pagination.seek(Number(val));
        };
        scope._leftArrow_click = function () {
          if (leftArrow.classList.contains('disable'))
            return;
          if (uiGridctrl.grid.api.pagination.getPage() == 1)
            return;
          uiGridctrl.grid.api.pagination.previousPage();
          selectPage.value = uiGridctrl.grid.api.pagination.getPage() - 1;
          selectPage.style.width = ( selectPage.options[selectPage.selectedIndex].text.length * 10) + 'px';
          var activeEl = element[0].querySelector('.pagination .active');
          var middel = pageMiddle.indexOf(activeEl);
          if (middel > -1) {
            if (middel == 0) {
              var initMd = Number(activeEl.childNodes[0].innerHTML) - 1;
              if (!(initMd - 1 <= 0)) {
                endExt.style.display = '';
                rightArrow.classList.remove('disable');
                pageMiddle.forEach(function (el) {
                  el.childNodes[0].innerHTML = initMd;
                  initMd++;
                });
                if ((initMd - 5 <= 0))
                  startExt.style.display = 'none';
              }
              else {

                if (maxPage === 5)
                  rightArrow.classList.remove('disable');
                pageMiddle[middel].classList.remove('active');
                startPage.classList.add('active');
                leftArrow.classList.add('disable');
              }
            }
            else {
              pageMiddle[middel].classList.remove('active');
              pageMiddle[middel - 1].classList.add('active');
            }
          }
          else if (activeEl == endPage) {
            activeEl.classList.remove('active');
            pageMiddle[2].classList.add('active');
          }
          else
            leftArrow.classList.add('disable');
          var val = uiGridctrl.grid.api.pagination.getPage();
          if (val < maxPage) {
            rightArrow.classList.remove('disable');
          }
          else {
            rightArrow.classList.add('disable');
          }
          if (val > 1) {
            leftArrow.classList.remove('disable');
          }
          else {
            leftArrow.classList.add('disable');
          }
        };
        scope._rightArrow_click = function () {
          if (rightArrow.classList.contains('disable'))
            return;
          if (uiGridctrl.grid.api.pagination.getPage() == (maxPage))
            return;
          uiGridctrl.grid.api.pagination.nextPage();
          selectPage.value = uiGridctrl.grid.api.pagination.getPage() - 1;
          selectPage.style.width = ( selectPage.options[selectPage.selectedIndex].text.length * 10) + 'px';
          var activeEl = element[0].querySelector('.pagination .active');
          var middel = pageMiddle.indexOf(activeEl);
          if (middel > -1) {
            if (middel == 2) {
              var initMd = Number(activeEl.childNodes[0].innerHTML) - 1;
              if (initMd <= maxPage - 3) {
                startExt.style.display = '';
                leftArrow.classList.remove('disable');
                pageMiddle.forEach(function (el) {
                  el.childNodes[0].innerHTML = initMd;
                  initMd++;
                });
                if (initMd >= maxPage)
                  endExt.style.display = 'none';
              }
              else {
                if (maxPage === 5)
                  leftArrow.classList.remove('disable');
                pageMiddle[middel].classList.remove('active');
                endPage.classList.add('active');
                rightArrow.classList.add('disable');
              }
            }
            else {
              pageMiddle[middel].classList.remove('active');
              pageMiddle[middel + 1].classList.add('active');
            }
          }
          else if (activeEl == startPage) {
            activeEl.classList.remove('active');
            pageMiddle[0].classList.add('active');
          }
          else
            rightArrow.classList.remove('disable');
          var val = uiGridctrl.grid.api.pagination.getPage();
          if (val < maxPage) {
            rightArrow.classList.remove('disable');
          }
          else {
            rightArrow.classList.add('disable');
          }
          if (val > 1) {
            leftArrow.classList.remove('disable');
          }
          else {
            leftArrow.classList.add('disable');
          }

        };
        //startPage.onclick = pageOnclick;
        //endPage.onclick = pageOnclick;
        pageMiddle.forEach(function (val) {
          //val.onclick = pageOnclick;
        });

        var settings = loadPage(maxPage);
        if (!settings.pageStartExt)
          startExt.style.display = "none";
        else
          startExt.style.display = "";

        startPage.childNodes[0].innerHTML = settings.pageStart;

        if (settings.pageEndExt)
          endExt.style.display = "";
        else
          endExt.style.display = "none";
        if (typeof settings.pageEnd === 'undefined')
          endPage.style.display = "none";
        else
          endPage.childNodes[0].innerHTML = settings.pageEnd;
        var initMd = settings.pageMiddle;
        pageMiddle.forEach(function (el) {
          if (initMd <= maxPage)
            el.childNodes[0].innerHTML = initMd;
          else
            el.style.display = 'none';
          initMd++;
        });
        if (!settings.prvArr)
          leftArrow.classList.add('disable');
        else
          leftArrow.classList.remove('disable');
        if (!settings.nxtArr)
          rightArrow.classList.add('disable');
        else
          rightArrow.classList.remove('disable');
        if (maxPage !== 1) {
          rightArrow.classList.remove('disable');
        }
      }
    },
    restrict: 'A',
    require: '^uiGrid'
  };
});
//basic paging settings
function loadPage(pageNumber) {
  var pageStruct = {
    pageStart: 1,
    pageStartExt: false,
    pageMiddle: 2,
    pageEndExt: true,
    pageEnd: pageNumber,
    prvArr: false,
    nxtArr: true
  };
  if (pageNumber === 5) {
    pageStruct.pageEndExt = false;
  }
  if (pageNumber < 5) {
    pageStruct.pageEndExt = false;
    delete pageStruct.pageEnd;
  }
  if (pageNumber < 5)
    pageStruct.nxtArr = false;
  return pageStruct;
}
// Grid settings directive
cuc.directive('uiGridColumnSettings', function ($timeout) {
  return {
    link: function (scope, element, attrs, uiGridctrl) {
      //required config for this feature
      uiGridctrl.grid.options.enableGridMenu = true;
      uiGridctrl.grid.options.exporterMenuPdf = false;
      uiGridctrl.grid.options.exporterMenuCsv = false;
      uiGridctrl.grid.options.onRegisterApi = function (gridApi) {
        //To save changes to local storage
        scope.gridApi = gridApi;
        if (scope.gridApi.colMovable)
          scope.gridApi.colMovable.on.columnPositionChanged(scope, saveState);
        if (scope.gridApi.colResizable)
          scope.gridApi.colResizable.on.columnSizeChanged(scope, saveState);
        scope.gridApi.core.on.columnVisibilityChanged(scope, ()=> {
          setLastColDisable(saveState());
        });
        scope.gridApi.core.on.filterChanged(scope, saveState);
        scope.gridApi.core.on.sortChanged(scope, saveState);
        //scope.gridApi.grouping.on.aggregationChanged(scope, saveState);
        //scope.gridApi.grouping.on.groupingChanged(scope, saveState);

        restoreState();
      };
      scope._initMenuFirst = true;
      //restoring grid state when new row added to grid
      uiGridctrl.grid.registerDataChangeCallback(restoreState);
      //call when grid rendred
      uiGridctrl.grid.api.core.on.rowsRendered(scope, function () {
        //todo: need to find some better way to do it, if possible
        //add tooltip to column when text is greater than width
        [].forEach.call(element[0].querySelectorAll('.ui-grid-cell-contents'), function (el, index) {
          el.addEventListener('mouseover', (e) => {
            if (e.target.offsetWidth < e.target.scrollWidth) {
              e.target.title = e.target.innerHTML;
            }
          });
        });

        if (uiGridctrl.grid.renderContainers.body.visibleRowCache.length === 0) {
          return;
        }
        if (scope._initMenuFirst) {
          initMenu(scope);
          scope._initMenuFirst = false;
        }
      });
      //init menu chnages as per spec
      function initMenu(scope) {
        element[0].querySelector('.ui-grid-menu-button div').onclick = function () {
          //todo: need to find some better way to do it, if possible
          [].forEach.call(element[0].querySelectorAll('.ui-grid-menu-inner li'), function (el, index) {
            el.addEventListener('click', function (e) {
              if (e.offsetX < el.offsetWidth) {
                if (!e)
                  e = window.event;
                if (e.stopPropagation) {
                  e.stopPropagation();
                }
                else {
                  e.cancelBubble = true;
                }
              }
            });
            //change col header
            if (el.querySelector('button').innerText.trim() == 'Columns:') {
              let elMain = el.querySelector('button');
              elMain.childNodes[1].nodeValue = "View Columns";
              elMain.classList.add('em-manu-col-header');
              el.classList.add('em-menu-sec-header');
              scope._headerIndex = index;
            }
            el.querySelector('button').onclick = function () {
              let menuClose = element[0].querySelector('.ui-grid-menu .ui-grid-menu-close-button');
              if (menuClose)
                menuClose.classList.remove('ui-grid-sr-only');
            };
            if (el.querySelector('button').innerText.trim() == 'Clear all filters') {
              el.style.display = 'none';
            }
          });
          setLastColDisable(scope.gridApi.saveState.save());
        };
      }

      //last col selection disabled in mune
      function setLastColDisable(state) {
        let cols = state.columns;
        let visIndx = -1;
        let hiddenCols = cols.filter((val, index) => {
          if (!val.visible) {
            return true;
          }
          else {
            visIndx = index;
          }
        });
        let colDiff = (cols.length - hiddenCols.length);
        [].forEach.call(element[0].querySelectorAll('.ui-grid-menu-inner li'), (item)=> {
          item.classList.remove('readonly');
        });
        if (colDiff < 2) {
          let ele = element[0].querySelectorAll('.ui-grid-menu-inner li');
          let elIndex = ele.length - ((cols.length - (visIndx + 1)) * 2);
          ele[elIndex - 1].classList.add('readonly');//info: 2 li item per col.(checked & unchecked).it's ui-grid lib implementation.
          ele[elIndex - 2].classList.add('readonly');
        }
      }

      //save state in LS
      function saveState() {
        var state = scope.gridApi.saveState.save();
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("gridState", JSON.stringify(state));
        }
        return state;
      }

      // get state from LS
      function restoreState() {
        $timeout(function () {
          var state = localStorage.getItem("gridState");
          if (state) scope.gridApi.saveState.restore(scope, JSON.parse(state));
        });
      }

    },
    restrict: 'A',
    require: '^uiGrid'
  };
});

cuc.directive('emTxtDecimalUpto', function () {
  return {
    restrict: 'EA',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      scope.$watch(attrs.ngModel, function (newValue, oldValue) {
        var spiltArray = String(newValue).split("");

        /*To allow only positive decimals*/
        if (attrs.emAllowNegative == "false") {
          if (spiltArray[0] == '-') {
            newValue = newValue ? newValue.replace("-", "") : "";
            ngModel.$setViewValue(newValue);
            ngModel.$render();
          }
        }

        /*to restrict number of digits after decimal points*/
        if (attrs.emTxtDecimalUpto == 0) {
          if (newValue) {
            newValue = newValue.replace(".", "");
            ngModel.$setViewValue(newValue);
            ngModel.$render();
          }

        } else {
          var n = String(newValue).split(".");
          if (n[1]) {
            var n2 = n[1].slice(0, attrs.emTxtDecimalUpto);
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

// Directive for formatting input in currency format.
cuc.directive('format', ['$filter', ($filter) => {
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

// Directive for formatting US mobile number with and without extension.
// <input type="text" ng-model="Phone" format-phone extension="true"/>
// Result : 982-346-6168 1234
// <input type="text" ng-model="Phone" format-phone extension="false"/>
// Result : 982-346-6168
cuc.directive('formatPhone', ['$filter', '$browser', ($filter, $browser)=> {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: ($scope, $element, $attrs, ngModelCtrl)=> {
      let isExtension = $attrs.extension === 'true';
      var listener = ()=> {
        let value = $element.val().replace(/[^0-9]/g, '');
        $element.val($filter('phone')(value, isExtension, false));
      };

      ngModelCtrl.$parsers.push((viewValue)=> {
        let len = isExtension ? 14 : 10;
        return viewValue.replace(/[^0-9]/g, '').slice(0, len);
      });

      // This runs when the model gets updated on the scope directly and keeps our view in sync
      ngModelCtrl.$render = ()=> {
        $element.val($filter('phone')(ngModelCtrl.$viewValue.replace(/[^0-9]/g, ''), isExtension, false));
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

cuc.filter('phone', ()=> {
  return (tel, type) => {
    if (!tel) {
      return '';
    }

    let number = tel.replace(/[^0-9]/g, '');

    if (number.length > 10 && type) {
      number = number.slice(0, 3) + '-' + number.slice(3, 6) + '-' + number.slice(6, 10) + ' ' + number.slice(10, 14);
    }
    else if (number.length > 6) {
      number = number.slice(0, 3) + '-' + number.slice(3, 6) + '-' + number.slice(6, 10);
    }
    else if (number.length > 3) {
      number = number.slice(0, 3) + '-' + number.slice(3, 6);
    }
    return number;
  };
});

export {cuc};
