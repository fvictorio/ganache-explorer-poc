import React from 'react'
import erc20 from './abis/ERC20.json'

const VERSION = 1

type Conf = {
  version: number
  abis: any[]
  rpcUrl: string
  addressBook: {[address: string]: string}
}

const defaultConf: Conf = {
  version: VERSION,
  rpcUrl: 'http://localhost:8545',
  abis: [erc20],
  addressBook: {
    '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1': 'ganache1'
  }
}

const ConfContext = React.createContext<{ conf: Conf; updateConf: any } | null>(null)

export const useConf = () => {
  const context = React.useContext(ConfContext)

  if (!context) {
    throw new Error('useConf must be used within a ConfProvider')
  }

  return context
}

function parseOr<T>(json: string, defaultValue: T): T {
  try {
    const parsed = JSON.parse(json)
    if (parsed.version !== VERSION) {
      console.warn('Saved conf is not compatible')
      return defaultValue
    }
    return {
      ...defaultValue,
      ...parsed,
    }
  } catch (e) {
    console.warn('Could not parse saved conf')
    return defaultValue
  }
}

export const ConfProvider = (props: any) => {
  const savedConf = localStorage.getItem('conf')
  const initialConf = savedConf ? parseOr(savedConf, defaultConf) : defaultConf
  const [conf, setConf] = React.useState(initialConf)

  React.useEffect(() => {
    localStorage.setItem('conf', JSON.stringify(conf))
  }, [conf])

  const updateConf = React.useMemo(
    () => (newConf: Partial<Conf>) => {
      setConf(conf => ({
        ...conf,
        ...newConf,
      }))
    },
    [],
  )

  const value = React.useMemo(() => ({ conf, updateConf }), [conf, updateConf])
  return <ConfContext.Provider value={value} {...props} />
}
