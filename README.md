# express-api-controller

```javascript
'use strict'

var path = require('path')
var app = require('express')()
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var controller = require('express-api-controller')
var controllers = controller(path.resolve(__dirname, '../controllers'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

app
  .route('/api/v1/accounts')
    .get(controllers.api.v1.accounts.index)
    .post(controllers.api.v1.accounts.create)

app.listen(3000)

```

```javascript
/**
 * Controller: accounts
 * Action:     create
 * Method:     POST
 * Path:       api/v1/accounts
 */

var Account = require('../models/account')

module.exports = {

  // Validattion middleware
  validations: function * (req, res, next) {
    req.checkBody('email', 'Invalid postparam').notEmpty().isEmail()
    req.checkBody('password', 'Invalid postparam').notEmpty()

    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    req.sanitizeBody('email').normalizeEmail()

    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {

    // Getting request data
    var { email, password } = req.body

    // Create new account
    var account = new Account({
      email,
      password
    })

    // Save account to database
    const data = yield account.save()

    // Response data with json
    res.json(data)
  }

}

```
