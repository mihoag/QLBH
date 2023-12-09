const product = require('../model/Products');
const cate = require('../model/Categories');
class productController {
    // first page is cateogry
    async showProducts(req, res, next) {
        try {
            let idCate = req.query.formSelect;
            let listProduct = ''
            if (idCate === undefined || idCate == "all") {
                listProduct = await product.selectAll();
            }
            else {
                //console.log("ok");
                listProduct = await product.selectByCat(idCate);
            }
            let listCate = await cate.selectAllCate();

            console.log(listProduct);
            res.render('listProduct', { listProduct: listProduct, listCate: listCate, name: req.session.name, idCate: idCate });
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new productController;