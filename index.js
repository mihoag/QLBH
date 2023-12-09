require('dotenv').config();
const express = require('express')
const app = express()
const expressHandleBar = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const route = require('./routes/index.r');

app.engine('handlebars', expressHandleBar.engine({
    helpers:
    {
        showError: (errors) => {
            let data = '';
            if (typeof errors !== 'undefined') {
                for (let i = 0; i < errors.length; i++) {
                    data += `<div class="alert alert-danger" role="alert">
                ${errors[i].msg}
                </div>`
                }
            }
            return data;
        },
        formatValue: (value) => {
            if (typeof value === undefined) {
                return '';
            }
            return value;
        },
        showSuccess: (success) => {
            let data = '';
            if (typeof success !== 'undefined') {
                for (let i = 0; i < success.length; i++) {
                    data += `<div class="alert alert-success" role="alert">
                      ${success[i].msg}
                </div>`
                }
            }
            //console.log(data);
            return data;
        },
        compare: (id1, id2) => {
            if (id2 === undefined) {
                return "selected";
            }
            else {
                return id1 === id2 ? "selected" : "";
            }
        }
    }
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
///
//console.log(path.join(__dirname, 'resources/public
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'thisissecret',
    cookie: { maxAge: 1000000 } // 100s
}));



route(app);


app.listen(process.env.PORT_SERVER);
