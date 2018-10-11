import uuidv4 from 'uuid/v4'
import winston from 'winston'

import CollectionResource from '../abstract/CollectionResource'
import SampleEntityResource from './SampleEntityResource'

export default class SampleCollectionResource extends CollectionResource {

  constructor() {
    super()
    this.entityResource = new SampleEntityResource()
    this.pathSegment = '/samples?'
    this.resources = [this.entityResource]
  }

  async createEntity(json, id) {
    if (id === undefined) {
      id = uuidv4()
    }
    this.entityResource.createEntity(json, id)
    return id
  }

  async retrieveAll(query) {
    winston.info(`Retrieving sample entities ${JSON.stringify(query)}`)
    return Object.values(this.entityResource.samples)
  }

  async removeAll(query) {
    winston.info(`Removing all sample entities`)
    this.entityResource.samples = {}
  }

}
