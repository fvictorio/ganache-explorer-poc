import React from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import { Box, Button } from '@material-ui/core'

import { Block } from './Block'
import { useConf } from './ConfProvider'

export type Block = ethers.providers.Block

type Props = {
  blocks: Block[]
}

export const BlockExplorer: React.FC<Props> = ({ blocks }) => {
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


  return (
    <div className="BlockExplorer">
      <Box marginY={2}>
      <Button onClick={mine} variant="contained" size="small">Mine new block</Button>
    </Box>
    {blocks.length ? blocks.map(block => (
      <Block key={block.hash} block={block} />
      )) : <p>No blocks</p>}
    </div>
  )
}
