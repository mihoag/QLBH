const user = require('../model/Users')
const Bcrypt = require('bcryptjs')
class RegisterController {
    async showRegister(req, res, next) {
        try {
            res.render('signup', { layout: false });
        } catch (error) {
            next(error);
        }
    }

    async processSignUp(req, res, next) {
        try {
            let errors = [];
            //console.log(req.body);
            const { username, name, email, dob, password } = req.body;
            let checkExistUsername = await user.checkExistUsername(username);
            // console.log(checkExistUsername)

            if (checkExistUsername) {
                errors.push({ msg: 'Username existed' });
                res.render('signup', {
                    errors,
                    username,
                    name,
                    email,
                    dob,
                    password, layout: false
                });
            }
            else {
                //let success = 
                // let u = new user(email, name, password);
                var u = '';
                let id = await user.selectMaxID();
                if (!id) {
                    u = new user(1, username, password, name, email, dob, 1)
                }
                else {
                    u = new user(id + 1, username, password, name, email, dob, 1)
                }

                // u.password = await Bcrypt.getHash(u.password);
                //console.log(u.password);
                Bcrypt.genSalt(10, async (err, salt) => {

                    Bcrypt.hash(u.Password, salt, async (err, hash) => {
                        if (err) throw err;
                        u.Password = hash;
                        //console.log(hash);
                        //return hash;
                        let check = await user.insertAccount(u);
                        // console.log(check);
                        if (check > 0) {
                            let success = [];
                            success.push({ msg: 'Register success! Please login to enter dashboard' });
                            res.render('login', { success, layout: false });
                        }

                    });
                });

            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new RegisterController;