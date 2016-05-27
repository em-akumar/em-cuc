/* eslint-disable */
class SliderNotifications {
  constructor(el, options = {}) {
    this.options = {};
    this.options.contentTmpl = options.contentTmpl || '';
    this.options.contentPosition = (options.containerEl) ? 'alert-container' : 'alert-page';
    this.options.containerEl = document.querySelector(options.containerEl) || document.querySelector('body'); //check container/page notifi
    this.options.fadeOutTimeout = options.fadeOutTimeout || 5000;
    this.options.fadeOutSpeed = options.fadeOutSpeed || 50;
    this.options.closeButton = options.closeButton === 'false' ? false : true; // close icon
    this.options.sliderIconFlag = options.sliderIconFlag === 'false' ? false : true; //notification icon
    this.options.sliderType = options.sliderType || 'success'; //notification type 'error', 'success', 'warning'
    this.options.sliderAutoClose = options.sliderAutoClose === 'false' ? false : true; // notification auto close
    this.options.isComplex = options.isComplex || ''; // Notification complex, by default it is simple
    this.options.complexTmpl = options.complexTmpl || ''; //Notiifcation detail template
    this.options.sliderPosition = (options.sliderPosition && options.sliderPosition ==='fixed' && !options.containerEl)?  'slider-fixed' : 'slider-relative'; // Notification sticky 'fixed', by default 'relative'
    this.init();
  }

  init() {
    this.render();
    if (this.options.sliderAutoClose === true) { this.destroy(); }
  }

  render() {
    var notiDiv = document.createElement('div'); //notification div
    notiDiv.setAttribute('class', 'alert alert-slide-down alert-' + this.options.sliderType + ' ' + this.options.contentPosition + ' ' + this.options.sliderPosition);

    var closeDiv = document.createElement('div'); //close div
    closeDiv.setAttribute('class', 'close-slider');
    closeDiv.addEventListener('click', this.closeNoti);
    closeDiv.innerHTML = '<a class="close">&times;</a>';

    var iconTmpl = (this.options.sliderIconFlag === true) ? `<div class="noti-slider-icon"><span class="alert-${this.options.sliderType}-slider-icon"></span></div>` : ` `; // notification image icon div

    notiDiv.innerHTML = iconTmpl + '' + this.options.contentTmpl;

    if (this.options.closeButton === true) { //check for close icon
      notiDiv.insertBefore(closeDiv, notiDiv.firstChild);
    }
    this.options.sliderEl = notiDiv;
    this.options.containerEl.insertBefore(notiDiv, this.options.containerEl.firstChild);

    if (this.options.isComplex === 'true') { // check wheather complex notification
      var notiDetailDiv = document.createElement('div');
      notiDetailDiv.setAttribute('class', 'noti-details-div');
      notiDetailDiv.innerHTML = this.options.complexTmpl;
      this.options.sliderElDetail = notiDetailDiv;
      this.options.containerEl.insertBefore(notiDetailDiv, notiDiv.nextSibling);
    }
  }

  closeNoti(e) { //on click of close icon
    let ele = e.target.parentNode.parentNode;
    let eleDetail = ele.parentNode.querySelector('.noti-details-div');
    if (eleDetail) {
      eleDetail.parentNode.removeChild(eleDetail);
    }
    ele.parentNode.removeChild(ele);
  }

  fadeOutNoti() {
      var op = 1;
      var ele = this.options.sliderEl;
      var eleDetail = this.options.sliderElDetail;

      let timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          ele.parentNode.removeChild(ele);
          if (eleDetail) {
            eleDetail.parentNode.removeChild(eleDetail);
          }
        }
       ele.style.opacity = op;
       ele.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      },  this.options.fadeOutSpeed);
  }

  destroy() { //destroy notification if autoclose is true
    var self = {options:this.options};
    setTimeout(this.fadeOutNoti.bind(self), this.options.fadeOutTimeout);
  }
}
export {SliderNotifications};