const Cate = require('../model/Categories');
const customErrors = require('../model/customErr')
class homeController {
    // first page is cateogry
    async showHome(req, res, next) {
        try {
            let listcate = await Cate.selectAllCate();
            // console.log(listcate)
            let changeDM = "";
            let changeSWDM = "";
            let changeIconDM = "";
            if (!req.session.DM) {
                changeIconDM = "fa-sun"
            }
            else if (req.session.DM == "sun") {
                changeIconDM = "fa-sun"
            }
            else {
                changeDM = "bg-gradient-dark";
                changeSWDM = "checked";
                changeIconDM = "fa-moon";
            }
            //console.log(s.b);
            res.render('home', { listcate: listcate, name: req.session.name, changeDM: changeDM, changeSWDM: changeSWDM, changeIconDM: changeIconDM });
        } catch (error) {
            let err = new customErrors(500, "SERVER ERROR", "Home")
            next(err);
        }
    }
    async addCate(req, res, next) {
        try {
            await Cate.insertCate(req.body);
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    async deleteCate(req, res, next) {
        try {
            let id = req.query.id;
            await Cate.deleteCate(id);
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    async updateCate(req, res, next) {
        try {
            await Cate.updateCate(req.body);
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    async changeDM(req, res, next) {
        try {
            if (!req.session.DM) {
                req.session.DM = "sun";
            }
            else if (req.session.DM == "sun") {
                req.session.DM = "moon";
            }
            else {
                req.session.DM = "sun";
            }
            res.redirect('/');
        } catch (error) {
            next(error)
        }
    }


}
module.exports = new homeController;