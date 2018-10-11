import HttpErrors from 'http-errors'

import Resource from './Resource'

// TODO: implement a Page class, check for it and handle in the handler methods
// TODO: implement a Range class and handle Range header
export default class CollectionResource extends Resource {

  constructor() {
    super()
  }

  async createEntity(json, ...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  async removeAll(query, ...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  async replaceAll(query, ...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  async retrieveAll(query, ...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @override
   * @private
   */
  async handleDelete(req, res) {
    await this.removeAll(req.query, ...this.getOrderedParams(req))
    res.sendStatus(204)
  }

  /**
   * @override
   * @private
   */
  async handleGet(req, res) {
    const entities = await this.retrieveAll(req.query, ...this.getOrderedParams(req))
    if (entities === undefined) {
      throw HttpErrors.NotFound()
    }
    res.json(entities)
  }

  /**
   * @override
   * @private
   */
  async handlePost(req, res) {
    const id = await this.createEntity(req.body, ...this.getOrderedParams(req))
    if (id !== undefined) {
      res.location(id)
    }
    res.sendStatus(201)
  }

  /**
   * @override
   * @private
   */
  async handlePut(req, res) {
    await this.replaceAll(req.body, ...this.getOrderedParams(req))
    res.sendStatus(201)
  }

}

