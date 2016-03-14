'use strict'

var api = require('express-api-helper')
var wrap = require('co-express')
var requireDirectory = require('require-directory')

function * checkErrors (req, res, next) {
  var errors = req.validationErrors(true)
  if (errors) api.badRequest(req, res, errors)
  next()
}

function getMiddlewares (middlewares) {
  var order = ['validations', 'checkErrors', 'sanitize', 'action']

  var result = []

  order.forEach((name) => {
    var middleware = middlewares[name]

    if (middleware) result.push(wrap(middleware))
    else if (name === 'checkErrors') result.push(wrap(checkErrors))
  })

  return result
}

function controller (dir) {
  var controllers = requireDirectory(module, dir, {
    visit (obj) {
      return getMiddlewares(obj)
    }
  })
  return controllers
}

module.exports = controller
