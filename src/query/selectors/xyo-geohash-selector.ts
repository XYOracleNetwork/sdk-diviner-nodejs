import { IXyoSelector, IXyoSelecterCreator } from '..'
import { IXyoBlocksByGeohashRepository } from '@xyo-network/sdk-core-nodejs'

export interface IXyoGeohashConfig {
  geohash: string,
  limit: number,
}

class GeohashSelector implements IXyoSelector {
  private config: IXyoGeohashConfig
  private repo: IXyoBlocksByGeohashRepository

  constructor(config: IXyoGeohashConfig, geohash: IXyoBlocksByGeohashRepository) {
    this.config = config
    this.repo = geohash
  }

  public async select(): Promise<{result: Buffer[], meta: any}> {
    return {
      meta: {},
      result: await this.repo.getOriginBlocksByGeohash(this.config.geohash, this.config.limit),
    }
  }
}

export const createGeohashSelectorCreator = (tracer: IXyoBlocksByGeohashRepository): IXyoSelecterCreator => {
  return {
    name: 'SELECTOR_GEOHASH',
    create: (config: any, creators: Map<string, IXyoSelecterCreator>) => {
      return new GeohashSelector(config, tracer)
    }
  }
}
