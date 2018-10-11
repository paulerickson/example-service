import winston from 'winston'

import EntityResource from '../abstract/EntityResource'

export default class SampleEntityResource extends EntityResource {

  constructor() {
    super()
    this.pathSegment = '/:sampleId'
    this.samples = {
      '1': 'foobar'
    }
  }

  async createEntity(json, id) {
    winston.info(`Creating sample entity ${id}: ${json}`)
    this.samples[id] = json
  }

  async retrieveEntity(id) {
    winston.info(`Creating sample entity ${id}`)
    return this.samples[id]
  }

  async updateEntity(json, id) {
    winston.info(`Updating sample entity ${id}: ${json}`)
    Object.assign(this.samples[id], json)
  }

  async deleteEntity(id) {
    winston.info(`Deleting sample entity ${id}`)
    delete this.samples[id]
  }

}
