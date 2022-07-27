/**
 * Created by f on 2019/4/4.
 */
import popupHead from '../components/common/popup-head/popup-head';
import popupForDetermine from '../components/common/secondary-popup-win/secondary-popup-win';
import Vue from 'vue';
declare module 'vue/types/vue' {
  interface Vue {
    error: any;
    succeed: any;
    popups: any;
  }
}
const plugins = {
  install: function (vue: any) {
    Vue.prototype.error = (msg: string, config: any = {}) => {
      let instance: any;
        if (!instance) {
        const LoadingPlugin = Vue.extend(popupHead);
        instance = new LoadingPlugin({
          el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
      }
      instance.show = false;
      let options: any = {
        msg: msg,
        state: 'error',
        autoClose: config.autoClose ? config.autoClose : false,
        closeTime: config.closeTime ? config.closeTime : 3000,
      };
      Object.assign(instance.options, options);
      instance.show = true;
    };
    Vue.prototype.succeed = (msg: string) => {
      let instance: any;
      if (!instance) {
        const LoadingPlugin = Vue.extend(popupHead);
        instance = new LoadingPlugin({
          el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
      }
      instance.show = false;
      let options: any = {
        msg: msg,
        state: 'succeed',
        autoClose: true,
        closeTime: 3000,
      };
      Object.assign(instance.options, options);
      instance.show = true;
    };
    Vue.prototype.popups = (options: any) => {
        let prioptions = options;
        prioptions.cancel = options.cancel ? options.cancel : 'Cancel';
        prioptions.confirm = options.confirm ? options.confirm : 'YES';
      let instance: any;
      if (!instance) {
        const LoadingPlugin = Vue.extend(popupForDetermine);
        instance = new LoadingPlugin({
          el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
      }
      instance.show = false;
      Object.assign(instance.options, prioptions);
      return new Promise((resolve, reject) => {
        instance.show = true;
        let successBtn = instance.successBtn;
        let cancelBtn = instance.cancelBtn;
        instance.successBtn = () => {
          successBtn();
          resolve('ok');
        };
        instance.cancelBtn = () => {
          cancelBtn();
          reject();
        };
      });
    };
  },

};

export default plugins;
