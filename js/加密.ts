/**
 * Created by f on 2023/4/25.
 */
import { Base64 } from 'js-base64';
import { forEach, isArray } from 'lodash-es';

export class BaseUtil {
    Base64EncodetoString(data: any) {
        return this.encryption(data, this.fiterKey());
    }
    Base64DncodetoString(data: any) {
        return this.decryption(data, this.fiterKey());
    }
    Base64Encode(data: any) {
        let fiterCode: any = {};
        forEach(data, (value: any, key: any) => {
            fiterCode[this.Base64EncodetoString(key)] = this.Base64EncodetoString(value);
        });
        return fiterCode;
    }
    Base64Dncode(data: any) {
        let fiterCode: any = {};
        forEach(data, (value: any, key: any) => {
            fiterCode[this.Base64DncodetoString(key)] = this.Base64DncodetoString(value);
        });
        return fiterCode;
    }
    Base64EncodeForArray(data: any) {
        let fiterData: any = [];
        forEach(data, (value: any) => {
            fiterData.push(this.Base64Encode(value));
        });
        return fiterData;
    }
    Base64DncodeForArray(data: any) {
        let fiterData: any = [];
        forEach(data, (value: any) => {
            fiterData.push(this.Base64Dncode(value));
        });
        return fiterData;
    }

    encryption(str: any, key: any) {
        if(str == null || str == undefined ) return str;
        let strpr = (typeof str === 'string') ? str : str.toString();
        let l = key.length;
        let a = key.split("");
        let s = "", b, bl, b2, b3;
        for (let i = 0; i < strpr.length; i++) {
            b = strpr.charCodeAt(i);
            bl = b % l;
            b = (b - bl) / l;
            b2 = b % l;
            b = (b - b2) / l;
            b3 = b % l;
            s += a[b3] + a[b2] + a[bl];
        }
        return s;

    }

    decryption(str: any, key: any) {
        if(str == null || str == undefined ) return str;
        let strpr = (typeof str === 'string') ? str : str.toString();
        let l = key.length;
        let b, bl, b2, b3, d = 0, s;
        s = new Array(Math.floor(strpr.length/3));
        b = s.length;
        for (let i = 0; i < b; i++) {
            bl = key.indexOf(strpr.charAt(d));
            d++;
            b2 = key.indexOf(strpr.charAt(d));
            d++;
            b3 = key.indexOf(strpr.charAt(d));
            d++;
            s[i] = bl * l * l + b2 * l + b3
        }
        b = eval("String.fromCharCode(" + s.join(',') + ")");
        return b;
    }
    fiterKey() {
        return "0l23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

}

export default new BaseUtil();