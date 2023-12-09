const Bcrypt = require('bcryptjs');
const user = require('../model/Users')

class signinController {
    async showLogin(req, res, next) {
        try {
            res.render('login', { layout: false });
        } catch (error) {
            next(error);
        }
    }

    async processLogin(req, res, next) {
        try {
            console.log(req.body);
            const { username, password } = req.body;
            console.log(req.body)
            let data = []
            data = await user.selectByUsername(username);
            let errors = [];
            //console.log(data);
            // console.log(data);
            // Neu khong co email hop le, thi data la mot mang rong
            if (!data) {
                errors.push({ msg: 'Username not found' });
                res.render('login', { errors, username, password, layout: false });
            }
            else {
                console.log(data);
                Bcrypt.compare(password, data.Password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) {
                        errors.push({ msg: 'Password is incorrect' });
                        res.render('login', { errors, username, password, layout: false });
                    } else {
                        //return done(null, false, { message: 'Password incorrect' });
                        // 
                        if (req.body.remember == 'on') {
                            req.session.cookie.maxAge = 10 * 24 * 60 * 60 * 1000; // 10 ngay
                        }

                        let sess = req.session;
                        sess.isAuthenticated = true;
                        sess.username = username;
                        sess.name = data.Name;
                        res.redirect('/');
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new signinController;