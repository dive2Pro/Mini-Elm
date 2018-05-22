const shopCartChange = '_shop_cart_change';
const replaceCart = '_replace_cart';
const addFood = '_add_food';
const minusFood = '_minus_food';
const SHOPCART_COUNT = '_shop_cart_count';
const INNER_UPDATER = '_inner_updater';

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

    ev.$on(addFood, (rId, food) => {
      let exitsCount = this.getCount(rId, food);
      exitsCount = exitsCount <= 0 ? 1 : exitsCount + 1;
      this.limitCountOperation(rId, food, exitsCount);
      ev.$emit(shopCartChange, rId);
    });

    ev.$on(minusFood, (rId, food) => {
      let exitsCount = this.getCount(rId, food);
      exitsCount = exitsCount <= 0 ? 0 : exitsCount - 1;
      this.limitCountOperation(rId, food, exitsCount);
      ev.$emit(shopCartChange, rId);
    });

    ev.$on(shopCartChange, rId => {
      if (afterUpdate) {
        afterUpdate(self.db);
      }
      // Vue.set(db[rId], '_inner_updater', 0);
      if (rId) {
        self.db[rId][INNER_UPDATER] += 1;
      }
    });
  }
  // 这里可以限制个数
  limitCountOperation(rId, food, updater) {
    const { item_id } = food;
    const changed = updater;
    this.db[rId][item_id][SHOPCART_COUNT] = changed;
  }
  initRestaurant = rId => {
    const { db, Vue } = this;
    if (!db[rId]) {
      // Vue.set(db, rId, {});
      Vue.util.defineReactive(db, rId, {});
      Vue.util.defineReactive(db[rId], INNER_UPDATER, 0);
      Object.defineProperty(db[rId], INNER_UPDATER, {
        enumerable: false,
      });
      Vue.set(db[rId], INNER_UPDATER, 0);
    }
  };
  initFood = (rId, food) => {
    const { db, Vue } = this;
    this.initRestaurant(rId);
    const { item_id } = food;
    if (!!db[rId][item_id] === false) {
      Vue.util.defineReactive(db[rId], item_id, food);
      Vue.set(db[rId][item_id], SHOPCART_COUNT, 0);
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

  getCount(rId, food) {
    return this.db[rId][food.item_id][SHOPCART_COUNT];
  }
  getTotalCount = rId => {
    const r = this.db[rId];
    if(r[INNER_UPDATER]){
    }
    const result = Object.keys(r).reduce((p, item_id) => {
      const food = r[item_id];
      return p + (food[SHOPCART_COUNT] || 0);
    }, 0);
    return result;
  };

  getTotalPrice(rId) {
    const r = this.db[rId];
    // /* eslint-disable */ if (this.db[rId][INNER_UPDATER]) {
    // }
    if (!r) {
      return 0;
    }
    return Object.keys(r).reduce((p, food) => food[SHOPCART_COUNT] || 0 + p, 0);
  }
}

export const shopcart = new ShopCart();

function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      const sc = shopcart;
      if (sc) {
        this.$sc = sc;
        sc.init(Vue);
      } else {
        this.$sc = this.$parent && this.$parent.$sc;
      }
    },
  });
}

ShopCart.install = install;
