import React from 'react'
import useInterval from '@use-it/interval'

import { useWrappedWeb3 } from './WrappedWeb3Provider'

type State = {
  blocks: Maybe<Block[]>
}

const StateContext = React.createContext<Maybe<State>>(null)

export const useState = () => {
  const context = React.useContext(StateContext)

  if (!context) {
    throw new Error('useState must be used within a StateProvider')
  }

  return context
}

export const StateProvider: React.FC = ({ children }) => {
  const { library } = useWrappedWeb3()
  const [blocks, setBlocks] = React.useState<Maybe<Block[]>>(null)
  const [blockNumber, setBlockNumber] = React.useState<number | null>(null)

  useInterval(() => {
    const run = async () => {
      const blockNumber = await library.getBlockNumber()

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

      let newBlocks: Block[] = []
      for (let i = blockNumber; i >= lastBlockNumber; i--) {
        try {
          const block = await library.getBlock(i)
          newBlocks.push(block)
        } catch (e) {
          console.error(`Failed to fetch block ${i}`)
        }
      }
      setBlocks(newBlocks)
    }
    run()
  }, [blockNumber, lastBlockNumber, library])

  const state = { blocks }

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>
}
