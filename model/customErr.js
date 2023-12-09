module.exports = class customErr {
    constructor(sc, mess, des) {
        this.sc = sc;
        this.mess = mess;
        this.des = des;
    }

    getSc() {
        return this.sc;
    }
    getMess() {
        return this.mess;
    }
    getDes() {
        return this.des;
    }
}