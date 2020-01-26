import React from 'react'
import ethers from 'ethers'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'

import { useCardStyles } from './styles'
import { useConf } from './ConfProvider'

type Props = {
  transaction: TransactionResponse
  receipt: Maybe<TransactionReceipt>
}

const parseLog = (abis: any[], log: ethers.providers.Log): string => {
  for (const abi of abis) {
    const iface = new ethers.utils.Interface(abi)
    try {
      const parsedLog = iface.parseLog(log)
      return `${parsedLog.name}(${parsedLog.args.join(',')})`
    } catch (e) {
      continue
    }
  }
  return log.data
}

export const Transaction: React.FC<Props> = ({ transaction, receipt }) => {
  const classes = useCardStyles()
  const { conf } = useConf()

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
      {transaction.hash}
      </Typography>
      <p>From: {transaction.from}</p>
      <p>To: {transaction.to}</p>
      <p>
        Data:{' '}
        <span title={transaction.data}>
          {transaction.data.length > 8 ? `${transaction.data.slice(0, 8)}...` : transaction.data}
        </span>
      </p>
      {receipt && (
        <>
          Events:{' '}
          {receipt.logs.length ? (
            <ul>
              {receipt.logs.map((log, index) => (
                <li key={index}>{parseLog(conf.abis, log)}</li>
              ))}
            </ul>
          ) : (
            'No events'
          )}
        </>
      )}
    </CardContent>
    </Card>
  )
}
