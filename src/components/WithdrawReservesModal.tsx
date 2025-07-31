import { useEffect, useMemo } from 'react'
import ModalWrapper from './ModalWrapper'
import { useAccount } from 'wagmi'
import useRetractAndWithdrawAll from '@/hooks/useRetractAndWithdraw'
import CtaButton from './CtaButton'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Address } from 'viem'

type Props = {
  kandelAddress: Address,
  onClose: () => void
}

const WithdrawReservesModal = ({ onClose, kandelAddress }: Props) => {

  const { address: connectedWalletAddress } = useAccount()
  const { openConnectModal } = useConnectModal()

  const { retractAndWithdrawAll, txReceipt } = useRetractAndWithdrawAll({ kandelAddress, recipientAddress: connectedWalletAddress })
  
  const cta = useMemo(() => {
    if (!connectedWalletAddress) {
      return {
        text: 'Connect Wallet',
        callback: openConnectModal
      }
    }
    return {
      text: 'Close positions and Withdraw',
      callback: retractAndWithdrawAll
    }
  }, [connectedWalletAddress, retractAndWithdrawAll, openConnectModal])

  useEffect(() => {
    console.warn('tx receipt', txReceipt)
    if (txReceipt?.status === 'success') {
      onClose()
    }
  }, [txReceipt, onClose])

  return (<ModalWrapper onClose={onClose}>
    <h2 className="text-xl font-semibold mb-4">Stop & Withdraw All</h2>
    <CtaButton {...cta} />
  </ModalWrapper>)
}

export default WithdrawReservesModal
