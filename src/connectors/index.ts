import { ConnectorInit } from '../types'
import initInjected from './InjectedConnector'
import initWalletConnect from './WalletConnectConnector'

export function getConnectors(initsOrConfigs: { [key: string]: ConnectorInit | {} } = {}) {
  const connectors: {
    [key: string]: [ConnectorInit, {} | null]
  } = {
    injected: [initInjected, null],
    walletconnect: [initWalletConnect, null]
  }

  for (const [id, initOrConfig] of Object.entries(initsOrConfigs)) {
    // If initOrConfig is a function, it is an initializer.
    if (typeof initOrConfig === 'function') {
      connectors[id] = [initOrConfig as ConnectorInit, null]
      continue
    }

    // Otherwise it is a config
    if (connectors[id]) {
      connectors[id][1] = initOrConfig as {}
    }
  }

  return connectors
}
