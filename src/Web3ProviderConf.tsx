import React from 'react'
import Web3Provider, { Connectors } from 'web3-react'

import { useConf } from './ConfProvider'

const { NetworkOnlyConnector } = Connectors

export const Web3ProviderConf: React.FC = ({ children }) => {
  const { conf } = useConf()

  const LocalNetwork = new NetworkOnlyConnector({
    providerURL: conf.rpcUrl,
  })

  const connectors = { LocalNetwork }

  return (
    <Web3Provider connectors={connectors} libraryName="ethers.js">
      {children}
    </Web3Provider>
  )
}
