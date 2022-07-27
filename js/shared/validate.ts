import validate, { Validator } from 'vee-validate';
const messagesCn = {
  after: (field: any, [target]: Array<any>) => ` ${field}aaaaa${target}aaaa`,
  in: (field: any) => ` ${field} aaaaaaaaa.`,
  ip: (field: any) => ` ${field} asdsad.`,
  max: (field: any, [length]: Array<any>) => ` ${field} sdds${length}ccd.`,
  min: (field: any, [length]: Array<any>) => ` ${field} asdwww${length}asdsad.`,
  size: (field: any, [size]: Array<any>) => ` ${field} asdasf ${size} KB.`,
  url: (field: any) => ` ${field}不是有效的url.`,
};
Validator.extend('phone', {
  getMessage: (field: any) => field + 'ssss',
  validate: (value: any) => !!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)
});
Validator.extend('opinionArray', {
  getMessage: function () {
    return 'ssss';
  },
  validate: (value: Array<any>) => {
    return value.length > 0;
  }
});
export const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors',
  events: 'input|blur',
  fieldsBagName: 'fieldBags',
  i18n: null,
  i18nRootKey: 'validations',
  inject: true,
  locale: 'en',
  strict: true,
  validity: false,

};
export default validate;
