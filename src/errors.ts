export class ChainUnsupportedError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'ChainUnsupportedError'
    this.message = message
  }
}

export class ChainUnknownError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'ChainUnknownError'
    this.message = message
  }
}

export class ConnectorUnsupportedError extends Error {
  constructor(connectorId: string, ...params: any[]) {
    super(...params)
    this.name = 'ConnectorUnsupportedError'
    this.message = `Unsupported connector: ${connectorId}.`
  }
}

export class ConnectionRejectedError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = 'ConnectionRejectedError'
    this.message = `The activation has been rejected by the provider.`
  }
}

export class ConnectorConfigError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'ConnectorConfigError'
    this.message = message
  }
}

export class NetworkChangedError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'NetworkChangedError'
    this.message = message
  }
}

export class WalletProviderError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'WalletProviderError'
    this.message = message
  }
}

export class TransactionError extends Error {
  hash: string
  constructor(message: string, hash: string, ...params: any[]) {
    super(...params)
    this.name = 'TransactionError'
    this.message = message
    this.hash = hash
  }
}
