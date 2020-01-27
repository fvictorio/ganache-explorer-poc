A proof of concept of a frontend-only block explorer for ganache.

## Demo

See live demo at https://ganache-explorer-poc.fvictorio.now.sh/

## Usage

Go to the configuration tab and set the RPC URL of your local instance (`http://localhost:8545` is used by default).

### Known ABIs

You can also add known ABIs. When a transaction is inspected, all events that belong to a known ABI will be properly parsed.

### Known addresses

There's a sort of "address book" where you can associate names to addresses. These names show up in the "From" and "To" fields of the transaction. (It would be nice to also show them in the parsed events data).

## Integration with MetaMask

Add a custom network in MetaMask and use `https://ganache-explorer-poc.fvictorio.now.sh/#` as the explorer (the trailing `#` is important!). That way you can open transactions in the explorer directly from MetaMask.

**For this to work, you need to use an RPC URL different from `http://localhost:8545`**, because that URL comes by default with MetaMask and cannot be edited. You can start ganache in another port by doing `ganache-cli -p 8555`.
