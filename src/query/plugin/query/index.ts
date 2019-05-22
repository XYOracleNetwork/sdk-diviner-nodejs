import { IXyoPlugin, IXyoGraphQlDelegate } from '@xyo-network/sdk-base-nodejs'
import { XyoQuery } from '../../xyo-query'
import { XyoChainScanEndpoint } from './xyo-scan-resolver'
import { intersectionFilter } from '../../filters/intersection'
import { locationMutator } from '../../mutators/location'
import { humanMutator } from '../../mutators/human'
import { XyoSupportedResolver } from './xyo-supported-resolver'

class XyoChainScanPlugin implements IXyoPlugin {
  public QUERY: XyoQuery | undefined

  public getName(): string {
    return 'query'
  }

  public getProvides(): string[] {
    return ['QUERY']
  }

  public getPluginDependencies(): string[] {
    return []
  }

  public async initialize(deps: { [key: string]: any; }, config: any, graphql?: IXyoGraphQlDelegate | undefined): Promise<boolean> {
    const scanner = new XyoQuery()
    const endpoint = new XyoChainScanEndpoint(scanner)
    const supportedResolver = new XyoSupportedResolver(scanner)

    if (!graphql) {
      throw new Error('XyoChainScanPlugin expecting graphql')
    }

    scanner.addMutator(locationMutator)
    scanner.addFilter(intersectionFilter)
    scanner.addMutator(humanMutator)

    graphql.addQuery(XyoChainScanEndpoint.query)
    graphql.addResolver(XyoChainScanEndpoint.queryName, endpoint)

    graphql.addQuery(XyoSupportedResolver.query)
    graphql.addResolver(XyoSupportedResolver.queryName, supportedResolver)

    this.QUERY = scanner

    return true
  }

}

export = new XyoChainScanPlugin()