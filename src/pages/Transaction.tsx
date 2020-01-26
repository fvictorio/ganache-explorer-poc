import React from 'react'
import { RouteComponentProps } from 'react-router'

import { TransactionContainer as Transaction } from '../TransactionContainer'

interface RouteParams {
  tx: string
}

export const TransactionPage: React.FC<RouteComponentProps<RouteParams>> = props => (
  <Transaction hash={props.match.params.tx} />
)
