import { IXyoPlugin, IXyoGraphQlDelegate } from '@xyo-network/sdk-base-nodejs'
import { XyoQuery } from '../../xyo-query'
import { IXyoBlocksByGeohashRepository } from '@xyo-network/sdk-core-nodejs'
import { createGeohashSelectorCreator } from '../../selectors/xyo-geohash-selector'

class XyoGeohashQuery implements IXyoPlugin {
  public getName(): string {
    return 'query-geohash'
  }

  public getProvides(): string[] {
    return []
  }

  public getPluginDependencies(): string[] {
    return [
      'BLOCK_REPOSITORY_PUBLIC_GEOHASH',
      'QUERY'
    ]
  }

  public async initialize(deps: { [key: string]: any; }, config: any, graphql?: IXyoGraphQlDelegate | undefined): Promise<boolean> {
    const geohash = deps.BLOCK_REPOSITORY_PUBLIC_GEOHASH as IXyoBlocksByGeohashRepository
    const query = deps.QUERY as XyoQuery
    const selector = createGeohashSelectorCreator(geohash)

    query.addSelector(selector)

    return true
  }

}

export = new XyoGeohashQuery()