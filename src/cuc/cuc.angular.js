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
      var elementName = attrs.emc+'_'+Math.random().toString(36).slice(2);
      if (getVal(scope, attrs.options) != '') {
        setVal(scope, (attrs.control || elementName), new emc[attrs.emc](elem[0], getVal(scope, attrs.options)));
      }
      else {
        setVal(scope, (attrs.control || elementName), new emc[attrs.emc](elem[0]));
      }
      scope.$watch(attrs.options, function(){
        getVal(this.scope, (this.attrs.control || elementName)).options= getVal(this.scope,this.attrs.options);
      }.bind({scope:scope,attrs:attrs}), true);
      watchProps(attrs.watchdepth, scope, [(attrs.control || elementName)+'.options'],
      attrs.reinit ? getVal(scope, attrs.reinit ).bind(scope): (getVal(scope,(attrs.control || elementName)).reinit||function(){}).bind(getVal(scope,(attrs.control || elementName))));
    }
  };
});
cuc.directive('uiGridPrint', function () {
  return {
    link: function (scope, element, attrs, uiGridctrl) {
      document.querySelector(attrs.uiGridPrint).addEventListener('click', function () {
        scope._body = '';
        scope._head = '';
        var rows = uiGridctrl.grid.api.core.getVisibleRows();
        uiGridctrl.grid.api.grid.columns.map(function (col) {
          if (typeof rows[0].entity[col.field] !== 'undefined' && typeof rows[0].entity[col.field] !== 'object')
            scope._head += '<td>' + col.displayName + '</td>';
        });
        rows.forEach(function (row) {
          scope._body += '<tr>';

          uiGridctrl.grid.api.grid.columns.map(function (col) {
            if (typeof row.entity[col.field] !== 'undefined' && typeof row.entity[col.field] !== 'object')
              scope._body += '<td>' + row.entity[col.field] + '</td>';
          });
          scope._body += '</tr>';
        });
        var str = element[0].querySelector('.ui-grid-canvas').innerHTML;
        window._mywindow = window.open('', '', '');
        _mywindow.document.write('<table>' + scope._head + scope._body + '</table>');
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
cuc.directive('uiGridCustomPaging', function ($compile) {
  return {
    link: function (scope, element, attrs, uiGridctrl) {

scope._initfirst = true;
uiGridctrl.grid.api.core.on.rowsRendered(scope, function() {
    if (uiGridctrl.grid.renderContainers.body.visibleRowCache.length === 0) { return; }
    if(scope._initfirst)
      {initPage(scope);
    scope._initfirst = false;}
});
function initPage(scope){
      var divPage = document.createElement('div');
      divPage.innerHTML='<div class="em-complex-table-footer">'+
	'<span class="em-pageview">'+
		'<select ng-model="_selectedVal" ng-change="_pageOnClickSelect()"> '+
			'<option ng-selected="$first" ng-repeat="item in _pageListItems"  value="{{item.value}}">{{item.text}}</option> '+
		'</select>'+
		'<label class="em-pageview-arrow"></label>'+
		'<span>&nbsp; of 100</span>'+
		'<label class="em-pageview-arrow"></label>'+
	'</span>'+
	'<nav class="em-pagination" style="display:">'+
		'<span class="em-left-arrow" style="display:">'+
			'<a style="opacity:0" ng-click="_leftArrow_click()">0</a>'+
		'</span>'+
		'<ul class="pagination">'+
			'<li class="active" ng-click="_pageOnClick($event)" style="display:"><a>0</a></li>'+
			'<li style="display:"><i>...</i></li>'+
			'<li ng-click="_pageOnClick($event)"><a>1</a></li> <li class="" ng-click="_pageOnClick($event)"><a>2</a></li> <li ng-click="_pageOnClick($event)" class=""><a>3</a></li>'+
			'<li style="display:"><i>...</i></li>'+
			'<li style="display:" ng-click="_pageOnClick($event)"><a>20</a></li>'+
		'</ul>'+
		'<span class="em-right-arrow" style="display:">'+
			'<a style="opacity:0" ng-click="_rightArrow_click()">2</a>'+
		'</span>'+
	'</nav>'+
'</div>';
      element[0].appendChild(divPage);
      var perpageRow = uiGridctrl.grid.options.paginationPageSize;
      var totalRow = uiGridctrl.grid.options.totalItems;
       var maxPage = Math.ceil( totalRow/perpageRow);
      var selectPage =  element[0].querySelector('.em-pageview select');
      var leftArrow = element[0].querySelector('.em-left-arrow');
      var rightArrow = element[0].querySelector('.em-right-arrow');
      var pageMaster = element[0].querySelectorAll('.pagination');
      var pageList = element[0].querySelectorAll('.pagination li');
      var html = '';
      var pageListItems=[];
        for (var i = 0 ; i < maxPage; ++i) {
           pageListItems.push({value:i,text:(perpageRow *i+1) +'-'+ (maxPage-1==i?totalRow: (perpageRow *(i+1)))}) ;
        }

      scope._pageListItems = pageListItems;
      //selectPage.innerHTML = (html);

      scope._selectedVal = '0';
      var pageArray = null;
      try {
            pageArray = Array.prototype.slice.call(pageList, 0); //non-IE and IE9+
      } catch (ex) {
          pageArray = new Array();
          for (var i=0, len=pageList.length; i < len; i++){
              pageArray.push(pageList[i]);
          }
      }
      var startPage = pageArray[0];
      var startExt = pageArray[1];
      var endPage = pageArray[6];
      var endExt = pageArray[5];
     $compile(divPage)(scope);
      function changePage(val){
        var changedAct = false;
          startPage.classList.remove('active');
          endPage.classList.remove('active');
          if(val == 1){
            startPage.classList.add('active');}
           if(val == maxPage){
            endPage.classList.add('active');}

          pageMiddle.forEach(function(item){
            item.classList.remove('active');
           if(Number( item.innerText)==val){
             item.classList.add('active');
              changedAct = true;
             }
          });
          if(changedAct)
            return;
          if(val<maxPage-2 && val>2)
          {
            startExt.style.display = '';
            endExt.style.display = '';
            leftArrow.classList.remove('disable');
             rightArrow.classList.remove('disable');
          }
          if(val>=maxPage-2 )
          {
            endExt.style.display = 'none';
            if(val == maxPage)
              rightArrow.classList.add('disable');
          }
          else{
            if( maxPage > 4){
              if(maxPage > 5)
                endExt.style.display = '';
            rightArrow.classList.remove('disable');}
          }
          if(val<4 )
          {
            startExt.style.display = 'none';
            if(val==1)
              leftArrow.classList.add('disable');
          }
          else{
            if( maxPage > 4){
              if(maxPage > 5)
                startExt.style.display = '';
              leftArrow.classList.remove('disable');
            }
          }
            var initMd = val;

            if(initMd < 4)
                initMd = 2;
            if(initMd > maxPage - 3)
                initMd = maxPage - 3;
            if(initMd === 1)
                initMd++;
            pageMiddle.forEach(function(el){
                    el.childNodes[0].innerHTML = initMd;
                    if(val === initMd)
                      el.classList.add('active');
                    initMd++;
            });

      }
      var pageOnclick = function(e){
         var val =  e.target.innerText;
         changePage(val);
         selectPage.value= val-1;

         selectPage.style.width=( selectPage.options[selectPage.selectedIndex].text.length * 10)+'px';
        uiGridctrl.grid.api.pagination.seek(Number(val));
      };

      scope._pageOnClick = pageOnclick;
      var pageMiddle = pageArray.slice(2, 5);
      scope._pageOnClickSelect = function(){
         var val =  Number( scope._selectedVal)+1;
          changePage(val);
          selectPage.style.width=( selectPage.options[selectPage.selectedIndex].text.length * 10)+'px';
        uiGridctrl.grid.api.pagination.seek(Number(val));
      }
      selectPage.onchange=function(e){
          var val =  Number( e.target.value)+1;
          changePage(val);
          //bad fix.. need to fins solution
           selectPage.style.width=( selectPage.options[selectPage.selectedIndex].text.length * 10)+'px';
        uiGridctrl.grid.api.pagination.seek(Number(val));
      };
      scope._leftArrow_click = function () {
        if (uiGridctrl.grid.api.pagination.getPage() == 1)
          return;
        uiGridctrl.grid.api.pagination.previousPage();
        selectPage.value = uiGridctrl.grid.api.pagination.getPage()-1;
        selectPage.style.width=( selectPage.options[selectPage.selectedIndex].text.length * 10)+'px';
        var activeEl = element[0].querySelector('.pagination .active');
        var middel = pageMiddle.indexOf(activeEl);
       if(middel >-1)  {
          if(middel ==0) {
             var initMd = Number(activeEl.childNodes[0].innerHTML)-1;
              if(!(initMd-1<=0)){
                endExt.style.display='';
                rightArrow.classList.remove('disable');
                pageMiddle.forEach(function(el){
                    el.childNodes[0].innerHTML = initMd;
                    initMd++;
                });
                if((initMd-5<=0))
                  startExt.style.display = 'none';
                }
              else{

                if(maxPage === 5)
                   rightArrow.classList.remove('disable');
                pageMiddle[middel].classList.remove('active');
                startPage.classList.add('active');
                 leftArrow.classList.add('disable');}
          }
          else{
            pageMiddle[middel].classList.remove('active');
             pageMiddle[middel-1].classList.add('active');
          }
      }
      else if(activeEl == endPage){
        activeEl.classList.remove('active');
        pageMiddle[2].classList.add('active');
      }
      else
        leftArrow.classList.add('disable');

      };
      scope._rightArrow_click=function(){
        if(uiGridctrl.grid.api.pagination.getPage() == (maxPage))
          return;
        uiGridctrl.grid.api.pagination.nextPage();
        selectPage.value = uiGridctrl.grid.api.pagination.getPage() - 1;
        selectPage.style.width=( selectPage.options[selectPage.selectedIndex].text.length * 10)+'px';
        var activeEl = element[0].querySelector('.pagination .active');
        var middel = pageMiddle.indexOf(activeEl);
       if(middel >-1)  {
          if(middel ==2) {
             var initMd = Number(activeEl.childNodes[0].innerHTML)-1;
              if(initMd<=maxPage-3 ){
                startExt.style.display='';
                 leftArrow.classList.remove('disable');
                pageMiddle.forEach(function(el){
                    el.childNodes[0].innerHTML = initMd;
                    initMd++;
                });
                if(initMd>=maxPage)
                  endExt.style.display = 'none';
                }
              else{
                if(maxPage === 5)
                   leftArrow.classList.remove('disable');
                pageMiddle[middel].classList.remove('active');
                endPage.classList.add('active');
                 rightArrow.classList.add('disable');}
          }
          else{
            pageMiddle[middel].classList.remove('active');
             pageMiddle[middel+1].classList.add('active');
          }
      }
      else if(activeEl == startPage){
        activeEl.classList.remove('active');
        pageMiddle[0].classList.add('active');
      }
      else
          rightArrow.classList.remove('disable');


      };
      //startPage.onclick = pageOnclick;
      //endPage.onclick = pageOnclick;
      pageMiddle.forEach(function(val){
        //val.onclick = pageOnclick;
      });

      var settings = loadPage(maxPage);
      if(!settings.pageStartExt)
        startExt.style.display = "none";
      else
       startExt.style.display = "";

      startPage.childNodes[0].innerHTML  = settings.pageStart;

      if(settings.pageEndExt)
        endExt.style.display = "";
      else
         endExt.style.display = "none";
      if(typeof settings.pageEnd === 'undefined')
        endPage.style.display = "none";
      else
         endPage.childNodes[0].innerHTML  = settings.pageEnd;
        var initMd = settings.pageMiddle;
      pageMiddle.forEach(function(el){
        if(initMd<=maxPage)
          el.childNodes[0].innerHTML = initMd;
         else
          el.style.display='none';
        initMd++;
      });
       if(!settings.prvArr)
        leftArrow.classList.add('disable');
       else
        leftArrow.classList.remove('disable');
       if(!settings.nxtArr)
        rightArrow.classList.add('disable');
       else
        rightArrow.classList.remove('disable');
}
    },
    restrict: 'A',
    require: '^uiGrid'
  };
});
function loadPage(pageNumber){
  var pageStruct={pageStart:1,
  pageStartExt:false,
  pageMiddle:2,
  pageEndExt:true,
  pageEnd:pageNumber,
  prvArr:false,
  nxtArr:true};
   if(pageNumber===5){
     pageStruct.pageEndExt = false;
   }
   if(pageNumber<5){
     pageStruct.pageEndExt = false;
     delete pageStruct.pageEnd;
   }
   if(pageNumber<5)
      pageStruct.nxtArr = false;
  return pageStruct;
}


export {cuc};
