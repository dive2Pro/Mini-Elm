const shopCartChange = '_shop_cart_change';
const replaceCart = '_replace_cart';
const addFood = '_add_food';
const minusFood = '_minus_food';
export default class ShopCart {
  constructor(options = {}) {
    /**
     *
     */
    this.options = options;
    this.db = {};
  }

  init = async Vue => {
    if (ShopCart.initialed) {
      return;
    }
    ShopCart.initialed = true;
    this.initialEventBus(Vue);
    const { options } = this;
    const { initial = () => ({}) } = options;
    const response = await initial();
    this.EventBus.$emit(replaceCart, response);
  };

  initialEventBus(Vue) {
    this.Vue = Vue;
    const ev = new Vue();
    this.EventBus = ev;
    const self = this;
    const { afterUpdate } = self.options;
    ev.$on(replaceCart, data => {
      Vue.set(this, 'db', data);
      ev.$emit(shopCartChange);
    });

    ev.$on(addFood, (rId, foodId) => {
      ev.$emit(shopCartChange);
      let exitsCount = self.db[rId][foodId];
      exitsCount = exitsCount <= 0 ? 1 : exitsCount + 1;
      self.db[rId][foodId] = exitsCount;
      console.log(self.db[rId][foodId]);
    });

    ev.$on(minusFood, (rId, foodId) => {
      ev.$emit(shopCartChange);
      let exitsCount = self.db[rId][foodId];
      exitsCount = exitsCount <= 0 ? 0 : exitsCount - 1;
      self.db[rId][foodId] = exitsCount;
      ev.$emit(shopCartChange);
    });

    ev.$on(shopCartChange, () => {
      if (afterUpdate) {
        afterUpdate(self.db);
      }
    });
  }

  initFood = (rId, foodId) => {
    const self = this;
    const { db, Vue } = self;
    if (!db[rId]) {
      // Vue.set(db, rId, {});
      Vue.util.defineReactive(db, rId, {});
    }
    if (!!db[rId][foodId] === false) {
      // Vue.set(db[rId], foodId, 0);
      // db[rId][foodId] = 0;
      // db[rId] = Object.assign({}, db[rId], { [foodId]: 0 });
      Vue.set(db[rId], foodId, 1);
      console.log(db[rId]);
    }
  };
  add(...args) {
    this.EventBus.$emit(addFood, ...args);
  }
  minus(...args) {
    this.EventBus.$emit(minusFood, ...args);
  }
  on(...args) {
    this.EventBus.on(...args);
  }
  off(...args) {
    this.EventBus.off(...args);
  }
}

export const shopcart = new ShopCart();
function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      const sc = shopcart;
      // console.log(this.$root);
      if (sc) {
        this.$sc = sc;
        sc.init(Vue);
      } else {
        this.$sc = this.$parent && this.$parent.$sc;
      }
    },
  });

  // Vue.component('shopcart-operator', require('./Operator'));
}

ShopCart.install = install;
