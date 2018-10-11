import HttpErrors from 'http-errors'

import Resource from './Resource'

export default class EntityResource extends Resource {

  constructor() {
    super()
  }

  /**
   * @private
   */
  async createEntity(json, ...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async retrieveEntity(...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async updateEntity(json, ...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @private
   */
  async deleteEntity(...ids) {
    throw HttpErrors.MethodNotAllowed()
  }

  /**
   * @override
   * @private
   */
  async handleDelete(req, res) {
    await this.deleteEntity(...this.getOrderedParams(req))
    res.sendStatus(204)
  }

  /**
   * @override
   * @private
   */
  async handleGet(req, res) {
    const entity = await this.retrieveEntity(...this.getOrderedParams(req))
    if (entity === undefined) {
      throw HttpErrors.NotFound()
    }
    res.json(entity)
  }

  /**
   * @override
   * @private
   */
  async handlePatch(req, res) {
    const entity = await this.updateEntity(req.body, ...this.getOrderedParams(req))
    if (entity === undefined) {
      res.sendStatus(204)
    }
    else {
      res.json(entity)
    }
  }

  /**
   * @override
   * @private
   */
  async handlePut(req, res) {
    const entity = await this.createEntity(req.body, ...this.getOrderedParams(req))
    if (entity === undefined) {
      res.sendStatus(201)
    }
    else {
      res.status(201).json(entity)
    }
  }

}

