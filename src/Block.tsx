import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  block: Block
}

export const Block: React.FC<Props> = ({ block }) => (
  <li>
    #{block.number}: {block.hash}
    <ul>
      {block.transactions.map(tx => (
        <li key={tx}><Link to={`/tx/${tx}`}>{tx}</Link></li>
      ))}
    </ul>
  </li>
)
