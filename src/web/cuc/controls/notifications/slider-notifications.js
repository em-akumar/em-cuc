/* eslint-disable */
class SliderNotifications {

  constructor(el, options = {}) {

    this.options = {};
    this.options.contentTmpl = options.contentTmpl || '';
    this.options.contentPosition = (options.containerEl) ? 'alert-container' : 'alert-page';
    //check wheather container element is passes in options else use page level notofication
    this.options.containerEl = document.querySelector(options.containerEl) || document.querySelector('body');
    this.options.fadeOutTimeout = options.fadeOutTimeout || 5000;
    this.options.fadeOutSpeed = options.fadeOutSpeed || 50;
    this.options.closeButton = options.closeButton === 'false' ? false : true;
    this.options.sliderIconFlag = options.sliderIconFlag === 'false' ? false : true;
    this.options.sliderBtnFlag = options.sliderBtnFlag === 'true' ? true : false;
    this.options.sliderBtnText = options.sliderBtnText ? options.sliderBtnText : 'Default';
    this.options.sliderChkFlg = options.sliderChkFlg === 'true' ? true : false;
    this.options.chkBoxLable = options.chkBoxLable ? options.chkBoxLable : 'Mauris vel lacus vitae felis vestibulum volutpat.';
    this.options.headerText = options.headerText || '';
    this.options.bodyContent = options.bodyContent || '';
    this.options.sliderType = options.sliderType || 'success';
    this.options.sliderAutoClose = options.sliderAutoClose === 'false' ? false : true;

    this.options.isComplex = options.isComplex || '';
    this.options.complexTmpl = options.complexTmpl || '';

    //slider-lock
    this.options.sliderPosition = (options.sliderPosition && options.sliderPosition ==='fixed' && !options.containerEl)?  'slider-fixed' : 'slider-relative';
    this.init();
  }

  init() {
    this.initTempl();
    this.render();
    if (this.options.sliderAutoClose === true) { this.destroy(); }
  }

  initTempl() {
    this.options.closeDiv = document.createElement('div');
    this.options.closeDiv.setAttribute('class', 'close-slider');
    this.options.closeDiv.addEventListener('click', this.closeNoti);
    this.options.closeDiv.innerHTML = '<a href="" class="close">&times;</a>';
    this.iconTmpl = (this.options.sliderIconFlag === true) ? `<div class="noti-slider-icon"><span class="alert-${this.options.sliderType}-slider-icon"></span></div>` : ` `;

    /*this.contentTmpl = `<span class="alert-text-header">${ this.options.headerText}</span><span class="alert-text-body">&nbsp;${ this.options.bodyContent}</span>`;
    this.buttonTmpl = (this.options.sliderBtnFlag === true)? `<button type="button" class="btn btn btn-default btn-sm-var-height">${ this.options.sliderBtnText}</button>`: ` `;
    this.checkboxTmpl = (this.options.sliderChkFlg === true)? `<div class="checkbox check-slider"> <input type="checkbox" id="chk25"><label for="chk25" class="checkbox-slider-noti">${this.options.chkBoxLable}</label></div>`: ` `;*/
  }

  renderContent() {
    var notiDiv = document.createElement('div');
    notiDiv.setAttribute('class', 'alert alert-slide-down alert-'+ this.options.sliderType +' '+this.options.contentPosition+' '+this.options.sliderPosition);
    //notiDiv.innerHTML = this.iconTmpl + this.contentTmpl +  this.buttonTmpl + this.checkboxTmpl;
    notiDiv.innerHTML = this.iconTmpl + '' + this.options.contentTmpl;

    if (this.options.closeButton === true) {
      notiDiv.insertBefore(this.options.closeDiv, notiDiv.firstChild);
    }
    this.options.sliderEl = notiDiv;
    this.options.containerEl.insertBefore(notiDiv, this.options.containerEl.firstChild);

    if (this.options.isComplex === 'true') {
      var notiDetailDiv = document.createElement('div');
      notiDetailDiv.setAttribute('class', 'noti-details-div');
      notiDetailDiv.innerHTML = this.options.complexTmpl;
      this.options.containerEl.insertBefore(notiDetailDiv, notiDiv.nextSibling);
    }
  }

  render() {
    this.renderContent();
   // this.renderEvent();
  }

  closeNoti(e) {
    let ele = e.target.parentNode.parentNode;
    ele.parentNode.removeChild(ele);
  }

  fadeOutNoti() {
     /* let op = 1;
      let ele = this.options.sliderEl;
      let timer = setInterval(function () {
        if (op <= 0.1){
          clearInterval(timer);
          ele.parentNode.removeChild(ele);
        }
       ele.style.opacity = op;
       ele.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      },  this.options.fadeOutSpeed);*/
  }

  destroy() {
    var self = this;
    var startTimeOut = setTimeout(function(){self.fadeOutNoti()}, self.options.fadeOutTimeout);
   /* this.mainEl.addEventListener('mouseover', function(e) {
      clearTimeout(startTimeOut);
    });
    this.mainEl.addEventListener('mouseout', function(e) {
      startTimeOut = setTimeout(function(){self.fadeOutNoti()}, self.options.onMouseoverFadeOut);
    });*/
  }
}
export {SliderNotifications};