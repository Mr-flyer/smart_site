export default {
    /**
     * @function {function} checkName --真实姓名验证
     * @param {string} name --姓名
     */
    checkName(name) {
        var regName = /^[\u4e00-\u9fa5]{2,4}$/;
        if(!regName.test(name)){
            return false;
        }
        return true;
    },
    /**
     * @function {function} checkPhone --手机号验证
     * @param {number} phone --手机号
     */
    checkPhone(phone) {
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            return false; 
        }
        return true;
    },
    checkEmail(email) {
        var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
        if(!regEmail.test(email)) {
            return false;
        }
        return true;
    },
    /**
     * @function {function} checkCode --验证码
     * @param {number} code --验证码
     */
    checkCode(code) {
        var regCode = /^[0-9]*[1-9][0-9]*$/;
        if(!regCode.test(code)) {
            return false;
        }
        if(code.length<6) {
            return false;
        }
        return true;
    },
    // Y-M-D
    YMD(str) {
        let time= new Date(str * 1000);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        return y+'-'+this.add0(m)+'-'+this.add0(d);
    },
    add0(m){
        return m<10 ? '0'+m : m;
    },
    // 日期转换时间戳
    DateParse(date) {
        let dateValue = date.replace(/-/g, '/');
        return Date.parse(dateValue)/1000;
    },
    // Y-M-D H:M:S
    formatTimestamp_min(nS) {
        var d = new Date(parseInt(nS) * 1000); //根据时间戳生成的时间对象
        var seconds = d.getSeconds();
        var minutes = d.getMinutes();
        var hours = d.getHours();
        if (seconds < 10) seconds = '0' + seconds;
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        return (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (hours) + ":" + (minutes) + ":" + (seconds);
    }
}