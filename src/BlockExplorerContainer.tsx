import React from 'react'
import { CircularProgress } from '@material-ui/core'

import { BlockExplorer } from './BlockExplorer'
import { useState } from './StateProvider'

export const BlockExplorerContainer: React.FC = () => {
  const { state, dispatch } = useState()

  const showMore = () => {
    dispatch({ type: 'ShowMoreBlocks' })
  }

  return state.blocks ? <BlockExplorer blocks={state.blocks} onShowMore={showMore} /> : <CircularProgress />
}
