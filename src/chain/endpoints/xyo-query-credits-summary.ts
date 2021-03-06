/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class XyoAccountsResolver {
  public static query = 'queryAccountsSummary(): '
  public static queryName = 'accountsSummary'
  private totalCredits: number

  constructor(total: number) {
    this.totalCredits = total
  }

  public async resolve(obj: any, args: any): Promise<any> {
    return {
      totalCredits: this.totalCredits
    }
  }
}
