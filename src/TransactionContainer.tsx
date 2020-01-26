import React from 'react'
import { CircularProgress } from '@material-ui/core'

import { Transaction } from './Transaction'
import { useWrappedWeb3 } from './WrappedWeb3Provider'

type Props = {
  hash: string
}

export const TransactionContainer: React.FC<Props> = props => {
  const [transaction, setTransaction] = React.useState<Maybe<TransactionResponse>>(null)
  const [receipt, setReceipt] = React.useState<Maybe<TransactionReceipt>>(null)
  const { library } = useWrappedWeb3()

  React.useEffect(() => {
    const run = async () => {
      library.getTransaction(props.hash).then(setTransaction)
      library.getTransactionReceipt(props.hash).then(setReceipt)
    }

    run()
  }, [props.hash, library])

  return transaction ? <Transaction transaction={transaction} receipt={receipt} /> : <CircularProgress />
}
