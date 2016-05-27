/* eslint-disable */
class ToggleSwitch {
  constructor(element, options = {}) {
      this.main = element;
      this.options = options;
      this.reinit();
  }
  reinit() {
     let defaultTemplate = {
        positiveTemplate: `<div class="em-on-switch" ></div>`,
        negativeTemplate: `<div class="em-off-switch" ></div>`,
        switchTemplate: `<div class="em-switch" ><div class="em-switch-icon"></div></div>`,
        switchStateDistence: '40%',
        mode:'normal',
        size: 'sm'
      };
      this.options.positiveTemplate = (this.options.positiveTemplate || defaultTemplate.positiveTemplate);
      this.options.negativeTemplate = (this.options.negativeTemplate || defaultTemplate.negativeTemplate);
      this.options.switchTemplate = (this.options.switchTemplate || defaultTemplate.switchTemplate);
      this.options.switchStateDistence = (this.options.switchStateDistence || defaultTemplate.switchStateDistence);
      this.options.mode = (this.options.mode || defaultTemplate.mode);
      this.options.size = (this.options.size || defaultTemplate.size);

      this.startHtml = `<div class="em-ctrl-switch-${this.options.size} em-switch-${this.options.mode}">`;
      this.endHtml = `</div>`;
      this.notEditableHtml = `<label class="em-on-opt-switch" >
                              <input type="radio"  name="switch" value="on" checked="checked">
                            </label>
                            <label class="em-off-opt-switch">
                              <input type="radio"  name="switch" value="off">
                            </label>`;
      this.render();
      this.actions();
  }
  render() {
    this.main.innerHTML = "";
    this.parentObj = this._getDomObj(this.startHtml + this.endHtml);
    this.parentObj.innerHTML = this.notEditableHtml;

    this.positiveObj = this._getDomObj( this.options.positiveTemplate);
    this.negativeObj = this._getDomObj(this.options.negativeTemplate);
    this.switchObj = this._getDomObj(this.options.switchTemplate);

    this.parentObj.appendChild(this.positiveObj);
    this.parentObj.appendChild(this.negativeObj);
    this.parentObj.appendChild(this.switchObj);

    this.main.appendChild(this.parentObj);

  }
  _getDomObj(html) {
    let divObj = document.createElement('div');
    divObj.innerHTML = html;
    return divObj.childNodes[0];
  }
  switcher() {
    var item = this.switchObj;
    if(item && item!=null){
      item.classList.toggle('em-off');
      this.main.querySelector('[name="switch"][value="off"]').checked = item.classList.contains('em-off');
      this.main.querySelector('[name="switch"][value="on"]').checked = !item.classList.contains('em-off');
      if (item.classList.contains('em-off')){
        item.style.left = this.options.switchStateDistence;
        this.negativeObj.style.display = 'none';
        this.main.querySelector('.em-off-opt-switch').style.display = 'none';
        this.positiveObj.style.display = ''}
      else{
        this.positiveObj.style.display = 'none';
        this.main.querySelector('.em-on-opt-switch').style.display = 'none';
        this.negativeObj.style.display = '';
        item.style.left = '0px';}
      if (typeof this.options.onChange === 'function') {
          this.options.onChange(!this.main.querySelector('[name="switch"][value="on"]').checked);
        }
    }
  }
  setSwitch(val) {
    var item = this.switchObj;
    if (!val) {
      item.classList.remove('em-off');
    }
    else {
      if(!item.classList.contains('em-off'))
        item.classList.add('em-off');
      }
    this.main.querySelector('[name="switch"][value="off"]').checked = item.classList.contains('em-off');
    this.main.querySelector('[name="switch"][value="on"]').checked = !item.classList.contains('em-off');
    if (item.classList.contains('em-off')){
        item.style.left = this.options.switchStateDistence;
        this.negativeObj.style.display = 'none';
        this.main.querySelector('.em-off-opt-switch').style.display = 'none';
        this.positiveObj.style.display = ''}
      else{
        this.positiveObj.style.display = 'none';
        this.main.querySelector('.em-on-opt-switch').style.display = 'none';
        this.negativeObj.style.display = '';
        item.style.left = '0px';}
  }

  actions() {

    if (this.options.mode === 'normal') {
      this.main.querySelector(`.em-ctrl-switch-${this.options.size}`).onclick = () => { this.switcher(); };
      [].forEach.call(this.main.querySelectorAll('[name="switch"]'), (val) => {
        val.onclick = (e) => {
          this.switcher();
        };
      });
    }
   this.setSwitch(true);
 }
}

export {ToggleSwitch};