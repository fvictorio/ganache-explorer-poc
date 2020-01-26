import React from 'react'

import { ConfProvider } from './ConfProvider'
import { Web3ProviderConf } from './Web3ProviderConf'

export const MetaProvider: React.FC = ({ children }) => {
  return (
    <ConfProvider>
      <Web3ProviderConf>{children}</Web3ProviderConf>
    </ConfProvider>
  )
}
