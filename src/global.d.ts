import ethers from 'ethers'

declare global {
  type Maybe<T> = T | null
  type Block = ethers.providers.Block
  type Blocks = { [number: number]: Block }
  type TransactionResponse = ethers.providers.TransactionResponse
  type TransactionReceipt = ethers.providers.TransactionReceipt
}
