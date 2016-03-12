# express-api-controller

```javascript
'use strict'

var path = require('path')
var router = require('express').Router()
var controller = require('express-api-controller')
var controllers = controller(path.resolve(__dirname, '../controllers'))

router
  .route('/api/v1/accounts')
    .get(controllers.api.v1.accounts.index)
    .post(controllers.api.v1.accounts.create)

module.exports = router
```

```javascript
/**
 * Controller: accounts
 * Action:     index
 * Method:     GET
 * Path:       api/v1/accounts
 */

var Account = require('../models/account')

module.exports = {

  // Validations middleware
  validations: function * (req, res, next) {
    console.log('api/v1/accounts:index:validations')
    next()
  },

  // Sanitization middleware
  sanitize: function * (req, res, next) {
    console.log('api/v1/accounts:index:sanitize')
    next()
  },

  // Action logic middleware
  action: function * (req, res, next) {
    console.log('api/v1/accounts:index:action')
    // Getting accounts from database
    const data = yield Account.without('password').limit(10).execute()

    // Response data with json
    res.json(data)
  }

}
```