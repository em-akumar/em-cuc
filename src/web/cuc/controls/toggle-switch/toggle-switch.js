/* eslint-disable */
class ToggleSwitch {
  constructor(element, options = {}) {
      this.main = element;
      this.options = options;
      this.reinit();
  }
  reinit() {
     let defaultTemplate = {
        positiveTemplate: `<div class="em-on-switch" type="switch-on"></div>`,
        negativeTemplate: `<div class="em-off-switch" type="switch-off"></div>`,
        switchTemplate: `<div class="em-switch" type="switch"><div class="em-switch-icon"></div></div>`,
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
    this.main.innerHTML = this.startHtml + this.options.positiveTemplate + this.options.negativeTemplate + this.options.switchTemplate + this.notEditableHtml + this.endHtml;
  }
  switcher() {
    var item = this.main.querySelector('[type="switch"]');
    if(item && item!=null){
      item.classList.toggle('em-off');
      this.main.querySelector('[name="switch"][value="off"]').checked = item.classList.contains('em-off');
      this.main.querySelector('[name="switch"][value="on"]').checked = !item.classList.contains('em-off');
      if (item.classList.contains('em-off')){
        item.style.left = this.options.switchStateDistence;
        this.main.querySelector('[type="switch-off"]').style.display = 'none';
        this.main.querySelector('.em-off-opt-switch').style.display = 'none';
        this.main.querySelector('[type="switch-on"]').style.display = ''}
      else{
        this.main.querySelector('[type="switch-on"]').style.display = 'none';
        this.main.querySelector('.em-on-opt-switch').style.display = 'none';
        this.main.querySelector('[type="switch-off"]').style.display = '';
        item.style.left = '0px';}
      if (typeof this.options.onChange === 'function') {
          this.options.onChange(!this.main.querySelector('[name="switch"][value="on"]').checked);
        }
    }
  }
  setSwitch(val) {
    var item = this.main.querySelector('[type="switch"]');
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
         this.main.querySelector('[type="switch-off"]').style.display = 'none';
        this.main.querySelector('.em-off-opt-switch').style.display = 'none';
        this.main.querySelector('[type="switch-on"]').style.display = ''}
      else{
        this.main.querySelector('[type="switch-on"]').style.display = 'none';
        this.main.querySelector('.em-on-opt-switch').style.display = 'none';
        this.main.querySelector('[type="switch-off"]').style.display = '';
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