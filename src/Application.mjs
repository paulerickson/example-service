import express from 'express'
import winston from 'winston'

import config from './config'
import RootResource from './resource/RootResource'

export default class Application {

  constructor() {
    this.expressApp = express()
    this.rootResource = new RootResource()
  }

  start() {
    this.rootResource.attach(this.expressApp)
    this.expressApp
      .listen(config.port, () => winston.info(`Listening on port ${config.port}`))
  }

}
