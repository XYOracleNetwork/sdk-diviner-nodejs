/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { IXyoSelector, IXyoSelecterCreator } from '..'
import bs58 from 'bs58'
import { IXyoOriginBlockGetter } from '@xyo-network/sdk-core-nodejs'

export interface IXyoPageConfig {
  cursor: string | undefined
  limit: number
}

class XyoPageSelector implements IXyoSelector {
  private config: IXyoPageConfig
  private getter: IXyoOriginBlockGetter

  constructor(config: IXyoPageConfig, getter: IXyoOriginBlockGetter) {
    this.config = config
    this.getter = getter
  }

  public async select(): Promise<{ result: Buffer[]; meta: any }> {
    const offsetHash =
      (this.config.cursor && bs58.decode(this.config.cursor)) || undefined
    const blocks = await this.getter.getOriginBlocks(
      this.config.limit,
      offsetHash
    )
    return {
      meta: {},
      result: blocks.items
    }
  }
}

export const createPageSelector = (
  getter: IXyoOriginBlockGetter
): IXyoSelecterCreator => {
  return {
    name: 'SELECTOR_PAGE',
    create: (config: any, creators: Map<string, IXyoSelecterCreator>) => {
      return new XyoPageSelector(config, getter)
    }
  }
}
