import React from 'react'
import { CircularProgress } from '@material-ui/core'

import { BlockExplorer } from './BlockExplorer'
import { useState } from './StateProvider'

export const BlockExplorerContainer: React.FC = () => {
  const state = useState()

  return state.blocks ? <BlockExplorer blocks={state.blocks} /> : <CircularProgress />
}
