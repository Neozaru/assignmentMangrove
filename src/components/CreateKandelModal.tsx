import { useEffect, useMemo } from 'react'
import ModalWrapper from './ModalWrapper'
import { useAccount } from 'wagmi'
import CtaButton from './CtaButton'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useCreateKandel from '@/hooks/useCreateKandel'
import { useSavedKandels } from '@/hooks/useSavedKandels'
import { MarketParams } from '@mangrovedao/mgv'
import { useChainId } from './ChainIdProvider'
import assignmentConfig from '@/assignment.config'

type Props = {
  market: MarketParams,
  onClose: () => void
}

const CreateKandelModal = ({ onClose, market }: Props) => {
  const { chainId } = useChainId()
  const { address: connectedWalletAddress } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { add: addKandel } = useSavedKandels()

  const { createKandel, newKandelAddress } = useCreateKandel({
    seederAddress: assignmentConfig.seederAddress,
    market
  })

  const cta = useMemo(() => {
    if (!connectedWalletAddress) {
      return {
        text: 'Connect Wallet',
        callback: openConnectModal
      }
    }
    return {
      text: 'Create new Kandel',
      callback: createKandel
    }
  }, [connectedWalletAddress, createKandel, openConnectModal])

  useEffect(() => {
    if (newKandelAddress) {
      addKandel({
        address: newKandelAddress,
        owner: connectedWalletAddress!,
        chainId,
        market
      })
      onClose()
    }
    
  }, [newKandelAddress, addKandel, market, onClose, connectedWalletAddress, chainId])

  return (<ModalWrapper onClose={onClose}>
    <h2 className="text-xl font-semibold">Create Kandel</h2>
    <div className='my-4'>
      <p>This will create a new Kandel instance with its own Smart-Contract.</p>
      <p>This is the first step for configuring a new Kandel.</p>
    </div>
    <CtaButton {...cta} />
  </ModalWrapper>)
}

export default CreateKandelModal
