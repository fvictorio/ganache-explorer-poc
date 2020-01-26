import React from 'react'
import ethers from 'ethers'
import { Card, CardContent, Typography } from '@material-ui/core'

import { useCardStyles } from './styles'
import { useConf } from './ConfProvider'

type Props = {
  transaction: TransactionResponse
  receipt: Maybe<TransactionReceipt>
}

const parseLog = (abis: any[], log: ethers.providers.Log): string => {
  for (const abi of abis) {
    try {
      const iface = new ethers.utils.Interface(abi)
      const parsedLog = iface.parseLog(log)
      return `${parsedLog.name}(${parsedLog.args.join(', ')})`
    } catch (e) {
      continue
    }
  }
  return log.data
}

export const Transaction: React.FC<Props> = ({ transaction, receipt }) => {
  const classes = useCardStyles()
  const { conf } = useConf()

  const showAddress = (address?: string) => {
    if (!address) return address
    const addressName = conf.addressBook[address.toLowerCase()]
    return addressName || address
  }

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
      {transaction.hash}
      </Typography>
      <p>From: {showAddress(transaction.from)}</p>
      <p>To: {showAddress(transaction.to)}</p>
      <p>
        Data:{' '}
        <span title={transaction.data}>
          {transaction.data.length > 10 ? `${transaction.data.slice(0, 10)}...` : transaction.data}
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
