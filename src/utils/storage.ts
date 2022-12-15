const ACCOUNT_KEY = 'LAST_ACTIVE_ACCOUNT'
const CONNECTOR_KEY = 'LAST_WALLET_CONNECTOR'

export const setLastActiveAccount = (account: string) => {
  localStorage?.setItem(ACCOUNT_KEY, account)
}

export const clearLastActiveAccount = () => {
  localStorage?.removeItem(ACCOUNT_KEY)
}

export const getLastActiveAccount = (): string | null => {
  return localStorage?.getItem(ACCOUNT_KEY)
}

export const setLastConnector = (connector: string) => {
  localStorage?.setItem(CONNECTOR_KEY, connector)
}

export const getLastConnector = (): string | null => {
  return localStorage?.getItem(CONNECTOR_KEY)
}
