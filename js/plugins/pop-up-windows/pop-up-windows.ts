/**
 * Created by f on 2018/5/22.
 */
import { Component, Prop, Watch } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import template from './pop-up-windows.vue';
@Component({
  mixins: [template],
  name: 'PopUpWindows',
  components: {},
})
export default class PopUpWindows extends WiseVue {
  @Prop({ default: true })
  show!: boolean;

  @Prop({ default: '' })
  height!: Number;

  @Prop({ default: '' })
  width!: Number;

  @Prop({ default: '' })
  tlitle!: String;

  @Prop({ default: true })
  isSubmit!: boolean;

  @Prop({ default: true })
  overflow!: boolean;

  @Prop({ default: false })
  isSave!: boolean;

  options: any = {};

  @Watch("show")
  getIsShow() {

  }

  cancel(event: any): void {
    this.$emit('cancel');
  }

  mounted() {
  }
}




