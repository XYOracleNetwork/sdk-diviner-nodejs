/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  XyoBoundWitness,
  XyoObjectSchema,
  XyoHumanHeuristicResolver,
  addAllDefaults
} from '@xyo-network/sdk-core-nodejs'
import bs58 from 'bs58'
import { IXyoMutator, IXyoMutatorCreater } from '..'

class LocationMutator implements IXyoMutator {
  public async mutate(from: Buffer[]): Promise<any> {
    return from.map(block => this.getLocation(block))
  }

  private getLocation(boundWitness: Buffer): any {
    const block = new XyoBoundWitness(boundWitness)

    for (const set of block.getHeuristics()) {
      for (const h of set) {
        if (h.getSchema().id === XyoObjectSchema.GPS.id) {
          return XyoHumanHeuristicResolver.resolve(h.getAll().getContentsCopy())
            .value
        }
      }
    }

    return undefined
  }
}

export const locationMutator: IXyoMutatorCreater = {
  name: 'MUTATOR_LOCATION',
  create: (config: any, creators: Map<string, IXyoMutatorCreater>) => {
    addAllDefaults()
    return new LocationMutator()
  }
}
