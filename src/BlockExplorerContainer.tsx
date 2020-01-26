import React from 'react'
import { ethers } from 'ethers'
import useInterval from '@use-it/interval'
import { CircularProgress } from '@material-ui/core'

import { BlockExplorer, Block } from './BlockExplorer'
import { useConf } from './ConfProvider'

export const BlockExplorerContainer: React.FC = () => {
  const { conf } = useConf()
  const [blocks, setBlocks] = React.useState<Maybe<Block[]>>(null)
  const [blockNumber, setBlockNumber] = React.useState<number | null>(null)

  useInterval(() => {
    const run = async () => {
      const provider = new ethers.providers.JsonRpcProvider(conf.rpcUrl)
      const blockNumber = await provider.getBlockNumber()

      setBlockNumber(blockNumber)
    }
    run()
  }, 1000)

  const lastBlockNumber = blocks && blocks.length ? blocks[blocks.length - 1].number : 1

  React.useEffect(() => {
    const run = async () => {
      if (blockNumber === null) return
      if (blockNumber === 0) {
        setBlocks([])
        return
      }

      const provider = new ethers.providers.JsonRpcProvider(conf.rpcUrl)

      let newBlocks: Block[] = []
      for (let i = blockNumber; i >= lastBlockNumber; i--) {
        try {
          const block = await provider.getBlock(i)
          newBlocks.push(block)
        } catch (e) {
          console.error(`Failed to fetch block ${i}`)
        }
      }
      setBlocks(newBlocks)
    }
    run()
  }, [blockNumber, lastBlockNumber, conf.rpcUrl])

  return blocks ? <BlockExplorer blocks={blocks} /> : <CircularProgress />

}
