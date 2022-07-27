/**
 * Created by f on 2018/5/22.
 */
import { Component, Prop, Watch } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import template from './popup-head.vue';
@Component({
  mixins: [template],
  name: 'PopupHead',
  components: {},
})
export default class PopupHead extends WiseVue {
  @Prop({ default: false })
  show!: boolean;
  options: any = {};

  @Watch("show")
  isErrorshow() {
    let tim: any;
    if (this.show && this.options.autoClose ) {
      tim = setTimeout(() => {
        this.show = false;
        setTimeout(() => {
          let node = document.querySelector('.popup-head-box');
          if (node && node.parentNode) {
            node.parentNode.removeChild(node);
          }
        }, 200);
      }, this.options.closeTime);
    }
     if (!this.show) clearTimeout(tim);
  }

  filtersErr() {
        if (typeof this.options.msg === "string" && this.options.state == 'error') {
            return this.options.msg;
        }
        else {
            let errMsg: any;
            if (this.options.msg && this.options.msg.response) {
                let response = this.options.msg.response;
                errMsg = response.error || response.data ? response.data.error : "Server Interal Error.";
                let xrequestID = response.headers["x-request-id"];
                if (xrequestID) {
                    errMsg = errMsg + ` (Request ID: ${xrequestID})`;
                }
            }
            if (errMsg) {
                return errMsg;
            } else {
                return "Internal Server Error";
            }

        }


    }


  cancelBtn(event: any): void {
    this.show = false;
    setTimeout(() => {
      let node = document.querySelector('.popup-head-box');
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }, 200);
  }
}




