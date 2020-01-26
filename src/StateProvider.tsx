import React, { Dispatch } from 'react'
import useInterval from '@use-it/interval'

import { useWrappedWeb3 } from './WrappedWeb3Provider'

type State = {
  blocks: Maybe<Blocks>
  blocksRange: Maybe<[number, number]>
}

const StateContext = React.createContext<Maybe<{ state: State; dispatch: Dispatch<ActionType> }>>(
  null,
)

export const useState = () => {
  const context = React.useContext(StateContext)

  if (!context) {
    throw new Error('useState must be used within a StateProvider')
  }

  return context
}

type ActionType =
  | {
      type: 'ShowMoreBlocks'
    }
  | { type: 'NewBlockNumber'; blockNumber: number }
  | { type: 'AddBlocks'; newBlocks: Blocks }

function reducer(state: State, action: ActionType): State {
  if (action.type === 'ShowMoreBlocks') {
    if (!state.blocksRange) return state
    return {
      ...state,
      blocksRange: [Math.max(state.blocksRange[0] - 10, 1), state.blocksRange[1]],
    }
  }
  if (action.type === 'NewBlockNumber') {
    if (!state.blocksRange) {
      return {
        ...state,
        blocksRange: [Math.max(action.blockNumber - 9, 1), action.blockNumber]
      }
    }
    if (state.blocksRange[1] !== action.blockNumber) {
      return {
        ...state,
        blocksRange: [state.blocksRange[0], action.blockNumber],
      }
    }
  }
  if (action.type === 'AddBlocks') {
    if (!state.blocks) {
      return {
        ...state,
        blocks: action.newBlocks
      }
    }
    if (Object.keys(action.newBlocks).length) {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          ...action.newBlocks,
        }
      }
    }
  }

  return state
}

const range = ([start, end]: [number, number]): number[] => {
  if (start > end) return []

  return [...Array(end - start + 1)].map((x, i) => start + i)
}

export const StateProvider: React.FC = ({ children }) => {
  const { library } = useWrappedWeb3()

  const initialState: State = { blocks: null, blocksRange: null }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  useInterval(() => {
    const run = async () => {
      const blockNumber = await library.getBlockNumber()

      dispatch({ type: 'NewBlockNumber', blockNumber })
    }
    run()
  }, 1000)

  React.useEffect(() => {
    const run = async () => {
      if (!state.blocksRange) return

      const newBlocks: Blocks = {}
      for (const blockNumber of range(state.blocksRange)) {
        if (!state.blocks || !state.blocks[blockNumber]) {
          try {
            newBlocks[blockNumber] = await library.getBlock(blockNumber)
          } catch (e) {
            console.error(`Failed to fetch block ${blockNumber}`)
          }
        }
      }

      dispatch({ type: 'AddBlocks', newBlocks })
    }
    run()
  }, [state, library])

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}
