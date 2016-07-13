/* eslint-disable */
class Incremental {
  constructor(element, options = {}) {
       element = (typeof element === 'object') ? element : document.getElementById(element);
       this.plus = element.querySelector('.em-plus');
       this.minus = element.querySelector('.em-minus');
       this.numberIncremental = element.querySelector('.em-incremental');
       if (this.numberIncremental !== null && this.numberIncremental.value ==='') {
         this.numberIncremental.value = 0;
       }
       this.options = options;
       this.onPlusChange = options.onPlusChange || function(e){};
       this.onMinusChange = options.onMinusChange || function (e) { };
       this.plus.addEventListener('click', () => {
          this.addOne();
       });
       this.minus.addEventListener('click', () => {
          this.minusOne();
        });
       this.reinit();
  }
  reinit() {

  }

  addOne() {
    if (this.numberIncremental && this.numberIncremental.value>=0) {
      this.numberIncremental.value = parseInt(this.numberIncremental.value) + 1
    };
  }
  minusOne() {
    if (this.numberIncremental && this.numberIncremental.value>0) {
      this.numberIncremental.value = parseInt(this.numberIncremental.value) - 1
    };
  }
}

export {Incremental};