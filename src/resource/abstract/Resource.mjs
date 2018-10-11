import HttpErrors from 'http-errors'
import bodyParser from 'body-parser'
import express from 'express'
import winston from 'winston'

// TODO: consolidated exception handling via wrapper methods
export default class Resource {

  constructor() {
    this.resources = []
    this.router = express.Router({mergeParams: true})
      .use(bodyParser.json({strict: false}))
      .use(this.handleError.bind(this))
      .delete('/', this.wrapHandler(this.handleDelete.bind(this)).bind(this))
      .get('/', this.wrapHandler(this.handleGet.bind(this)).bind(this))
      .head('/', this.wrapHandler(this.handleHead.bind(this)).bind(this))
      .options('/', this.wrapHandler(this.handleOptions.bind(this)).bind(this))
      .patch('/', this.wrapHandler(this.handlePatch.bind(this)).bind(this))
      .post('/', this.wrapHandler(this.handlePost.bind(this)).bind(this))
      .put('/', this.wrapHandler(this.handlePut.bind(this)).bind(this))
  }

  // TODO: attach logger
  // TODO: attach nedb
  // TODO: attach rest webservice (viz. one that follows the same semantics this framework defines)
  // TODO: attach socket.io app
  // TODO: attach mongo
  // TODO: attach redis (as datastore)
  // TODO: attach redis (as pub/sub broker)
  // TODO: attach rabbitmq

  attach(router) {
    if (!this.pathSegment) {
      this.pathSegment = `/${this.constructor.name}`
      winston.warn(`pathSegment not defined!  Defaulting to ${this.pathSegment}`)
    }
    router.use(this.pathSegment, this.router)
    if (this.resources) {
      this.resources.map(resource => resource.attach(this.router))
    }
    return this.router
  }

  /**
   * @private
   */
  async handleDelete(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async handleGet(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async handleHead(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async handleOptions(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async handlePatch(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async handlePost(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async handlePut(req, res) {
    throw HttpErrors.MethodNotAllowed()
  }

  handleError(err, req, res, next) {
    winston.warn(err)
    res.status(err.status || err.statusCode || 500).json(err)
  }

  // FIXME: params appear to be ordered, but this is probably unsafe.  cf. req.path
  getOrderedParams(req) {
    return Object.values(req.params)
  }

  wrapHandler(handler) {
    return async (req, res) => {
      try {
        await handler(req, res)
      }
      catch (err) {
        this.handleError(err, req, res)
      }
    }
  }

}
