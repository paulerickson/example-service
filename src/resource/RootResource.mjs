import Resource from './abstract/Resource'
import SampleCollectionResource from './sample/SampleCollectionResource'

// TODO: generate API doc
export default class RootResource extends Resource {

  constructor() {
    super()
    this.pathSegment = '/'
    this.resources = [
      new SampleCollectionResource()
    ]
  }

  /**
   * @override
   * @private
   */
  async handleGet(req, res) {
    res.json('root!')
  }

}
