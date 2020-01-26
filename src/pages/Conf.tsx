import React from 'react'
import { Grid, Button, TextareaAutosize, TextField } from '@material-ui/core'

import { useConf } from '../ConfProvider'

export const ConfPage: React.FC = () => {
  const { conf, updateConf } = useConf()
  const [newAbi, setNewAbi] = React.useState('')
  const [newRpcUrl, setNewRpcUrl] = React.useState(conf.rpcUrl)
  const [addressBookEntry, setAddressBookEntry] = React.useState({ address: '', name: '' })

  const setAddressBookEntryAddress = (address: string) =>
    setAddressBookEntry(entry => ({
      ...entry,
      address,
    }))
  const setAddressBookEntryName = (name: string) =>
    setAddressBookEntry(entry => ({
      ...entry,
      name,
    }))

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

  const addAddressBookEntry = () => {
    updateConf({
      addressBook: {
        ...conf.addressBook,
        [addressBookEntry.address.toLowerCase()]: addressBookEntry.name,
      },
    })
    setAddressBookEntry({ address: '', name: '' })
  }

  const validAbi = newAbi.length > 0
  const validRpcUrl = newRpcUrl.length > 0

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={() => {}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              value={newRpcUrl}
              onChange={e => setNewRpcUrl(e.currentTarget.value)}
              error={!validRpcUrl}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={changeRpcUrl} disabled={!validRpcUrl} variant="contained" size="small">
              Change RPC URL
            </Button>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <TextareaAutosize
              value={newAbi}
              onChange={e => setNewAbi(e.currentTarget.value)}
              rowsMin={3}
              rowsMax={10}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={addNewAbi} disabled={!validAbi} variant="contained" size="small">
              Add ABI
            </Button>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <TextField
              value={addressBookEntry.address}
              onChange={e => setAddressBookEntryAddress(e.currentTarget.value)}
              error={!addressBookEntry.address}
              placeholder="Address"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={addressBookEntry.name}
              onChange={e => setAddressBookEntryName(e.currentTarget.value)}
              error={!addressBookEntry.name}
              placeholder="Name"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={addAddressBookEntry}
              disabled={!addressBookEntry.address || !addressBookEntry.name}
              variant="contained"
              size="small"
            >
              Add to address book
            </Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </form>
    </>
  )
}
