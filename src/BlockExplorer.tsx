import React from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Box, Button } from '@material-ui/core'

import { Block } from './Block'
import { useConf } from './ConfProvider'

export type Block = ethers.providers.Block

type Props = {
  blocks: Blocks
  onShowMore: () => void
}

export const BlockExplorer: React.FC<Props> = ({ blocks, onShowMore }) => {
  const { conf } = useConf()

  const mine = async () => {
    const now = new Date().valueOf()

    try {
      await axios.post(conf.rpcUrl, {
        id: 1337,
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [now],
      })
    } catch (e) {
      console.error(e)
    }
  }

  const sortedBlocks = Object.entries(blocks)
    .sort((a, b) => +b[0] - +a[0])
    .map(x => x[1])

  return (
    <div className="BlockExplorer">
      <Box marginY={2}>
        <Button onClick={mine} variant="contained" size="small">
          Mine new block
        </Button>
      </Box>
      {sortedBlocks.length ? (
        <TransitionGroup>
          {sortedBlocks.map(block => (
            <CSSTransition key={block.hash} timeout={500} classNames="block">
              <Block block={block} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p>No blocks</p>
      )}
      <Button variant="contained" onClick={onShowMore}>
        Show more
      </Button>
    </div>
  )
}
