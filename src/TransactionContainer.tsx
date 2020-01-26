import React from 'react'
import { ethers } from 'ethers'
import { CircularProgress } from '@material-ui/core'

import { Transaction } from './Transaction'
import { useConf } from './ConfProvider'

type Props = {
  hash: string
}

export const TransactionContainer: React.FC<Props> = props => {
  const { conf } = useConf()
  const [transaction, setTransaction] = React.useState<Maybe<TransactionResponse>>(null)
  const [receipt, setReceipt] = React.useState<Maybe<TransactionReceipt>>(null)

  React.useEffect(() => {
    const run = async () => {
      const provider = new ethers.providers.JsonRpcProvider(conf.rpcUrl)

      provider.getTransaction(props.hash).then(setTransaction)
      provider.getTransactionReceipt(props.hash).then(setReceipt)
    }

    run()
  }, [props.hash, conf.rpcUrl])

  return transaction ? <Transaction transaction={transaction} receipt={receipt} /> : <CircularProgress />
}
