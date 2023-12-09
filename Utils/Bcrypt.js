const Bcrypt = require('bcryptjs')
module.exports =
{
    getHash: async (password) => {
        // console.log(password)
        Bcrypt.genSalt(10, async (err, salt) => {

            Bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;

                console.log(hash);
                return hash;
            });
        });
    },
    compareHash: async (password, hash) => {
        //  return Bcrypt.compare(password, hash);
        Bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) throw err;
            return isMatch;
        })
    }

}