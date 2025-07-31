import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'


const ConnectWalletButton = () => {
  const { address: connectedWalletAddress, status: walletConnectionStatus } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (<div>
    {walletConnectionStatus === 'disconnected' && (
      <button className='bg-blue-800 text-white p-2' onClick={() => openConnectModal?.()}>Connect Wallet</button>
    )}
    {walletConnectionStatus === 'connected' && (
      <div>Connected wallet: {connectedWalletAddress}</div>
    )}
  </div>)
}

export default ConnectWalletButton
