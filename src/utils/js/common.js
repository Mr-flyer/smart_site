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
    /**
     * @function {function} checkIdCard --身份证号验证
     * @param {string | number} idNo --身份证号
     * @param {boolean} required --是否必填项
     */
    checkIdCard(idNo) {
        var regIdNo = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;;  
        if(!regIdNo.test(idNo)){  
            // Toast('请输入正确的身份证号');
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
    },
    // bytes自适应转换到KB,MB,GB
    formatFileSize(fileSize) {
        if (fileSize < 1024) {
            return fileSize + 'B';
        } else if (fileSize < (1024*1024)) {
            var temp = fileSize / 1024;
            temp = temp.toFixed(2);
            return temp + 'KB';
        } else if (fileSize < (1024*1024*1024)) {
            var temp = fileSize / (1024*1024);
            temp = temp.toFixed(2);
            return temp + 'MB';
        } else {
            var temp = fileSize / (1024*1024*1024);
            temp = temp.toFixed(2);
            return temp + 'GB';
        }
    },
    // 设定输入的文件长度的参数的原始单位
    fileLengthFormat(total, n) {
        var format;
        var len = total / (1024.0);
        if (len > 1000) {
            return arguments.callee(len, ++n);
        } else {
            switch (n) {
                case 1:
                    format = len.toFixed(2) + "KB";
                    break;
                case 2:
                    format = len.toFixed(2) + "MB";
                    break;
                case 3:
                    format = len.toFixed(2) + "GB";
                    break;
                case 4:
                    format = len.toFixed(2) + "TB";
                    break;
            }
            return format;
        }
    }
}