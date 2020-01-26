import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'

import { useCardStyles } from './styles'

type Props = {
  block: Block
}

const useStyles = makeStyles({
  link: {
    '&:visited': {
      color: 'inherit'
    }
  }
})

export const Block: React.FC<Props> = ({ block }) => {
  const cardClasses = useCardStyles()
  const classes = useStyles()

  return (
    <Card variant="outlined" className={cardClasses.card}>
      <CardContent>
        <Typography className={cardClasses.title} color="textSecondary" gutterBottom>
          #{block.number}
        </Typography>
        <p>Hash: {block.hash}</p>
        {block.transactions.length ? (
          <>
            Transactions:
            <ul>
              {block.transactions.map(tx => (
                <li key={tx}>
                  <Link className={classes.link} to={`/tx/${tx}`}>{tx}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          "This block doesn't have transactions"
        )}
      </CardContent>
    </Card>
  )
}
