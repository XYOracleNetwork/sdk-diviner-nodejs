/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { IXyoSelector, IXyoSelecterCreator } from '..'
import bs58 from 'bs58'
import { IXyoChainTracer } from '../../chain'

export interface IHashIndexRangeConfig {
  up: boolean
  index: number
  amount: number
  publicKey: string
}

class XyoIndexSelector implements IXyoSelector {
  private config: IHashIndexRangeConfig
  private tracer: IXyoChainTracer

  constructor(config: IHashIndexRangeConfig, tracer: IXyoChainTracer) {
    this.config = config
    this.tracer = tracer
  }

  public async select(): Promise<{ result: Buffer[]; meta: any }> {
    const bytePublicKey = bs58.decode(this.config.publicKey)
    const blocks = await this.tracer.traceChain(
      bytePublicKey,
      this.config.amount,
      this.config.index,
      this.config.up
    )
    return {
      meta: {},
      result: blocks
    }
  }
}

export const createIndexSelectorCreator = (
  tracer: IXyoChainTracer
): IXyoSelecterCreator => {
  return {
    name: 'SELECTOR_INDEX',
    create: (config: any, creators: Map<string, IXyoSelecterCreator>) => {
      return new XyoIndexSelector(config, tracer)
    }
  }
}
