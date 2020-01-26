import React from 'react'

import { useConf } from '../ConfProvider'

export const ConfPage: React.FC = () => {
  const { conf, updateConf } = useConf()
  const [newAbi, setNewAbi] = React.useState('')
  const [newRpcUrl, setNewRpcUrl] = React.useState(conf.rpcUrl)

  const addNewAbi = () => {
    try {
      const parsed = JSON.parse(newAbi)
      updateConf({ abis: conf.abis.concat([parsed]) })
      setNewAbi('')
    } catch (e) {
      window.alert('invalid abi')
    }
  }

  const changeRpcUrl = () => {
    updateConf({ rpcUrl: newRpcUrl })
  }

  return (
    <>
      <div>
        <textarea value={newAbi} onChange={e => setNewAbi(e.currentTarget.value)} />
        <button onClick={addNewAbi}>Add ABI</button>
      </div>

      <div>
        <input value={newRpcUrl} onChange={e => setNewRpcUrl(e.currentTarget.value)} />
        <button onClick={changeRpcUrl}>Change RPC URL</button>
      </div>
    </>
  )
}
