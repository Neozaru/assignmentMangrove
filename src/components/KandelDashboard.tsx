import { base } from 'viem/chains'
import { ReactNode, useCallback, useMemo, useState } from 'react';
import useKandelInfo from '@/hooks/useKandelInfo';
import DepositModal from './DepositModal';
import KandelOverview from './KandelOverview';
import KandelSetupModal from './KandelSetupModal';
import CtaButton from './CtaButton';
import WithdrawReservesModal from './WithdrawReservesModal';
import { useQueryClient } from '@tanstack/react-query';
import { Address } from 'viem';

type Props = {
  kandelAddress: Address
}

type ModalName = 'deposit' | 'setup' | 'withdraw'

const KandelDashboard = ({ kandelAddress }: Props) => {

  const queryClient = useQueryClient()

  const [showModal, setShowModal] = useState<ModalName>()

  const { data: kandel } = useKandelInfo({ kandelAddress, chainId: base.id })

  const market = useMemo(() => {
    if (!kandel) {
      return null
    }
    return {
      base: kandel.baseToken,
      quote: kandel.quoteToken,
      tickSpacing: kandel.tickSpacing
    }
  }, [kandel])

  const closeModalAndRefetch = useCallback(() => {
    setShowModal(undefined)
    queryClient.refetchQueries({})
  }, [setShowModal, queryClient])

  return (<div>
    {kandel && market && <>
      <KandelOverview kandel={kandel} market={market} />
      <div className='flex flex-row justify-center'>
        {/* <div> */}
        <ButtonWrapper>
          <CtaButton text={'Set up Strategy'} callback={() => setShowModal('setup')} />
        </ButtonWrapper>
        <ButtonWrapper>
          <CtaButton text={'Deposit reserves'} callback={() => setShowModal('deposit')} />
        </ButtonWrapper>
        <ButtonWrapper>
          <CtaButton text={'Withdraw reserves'} callback={() => setShowModal('withdraw')} />
        </ButtonWrapper>
      </div>
      {
        showModal === 'setup' && <KandelSetupModal
          kandel={kandel}
          market={market}
          onClose={closeModalAndRefetch}
        />
      }

      {showModal === 'deposit' && <DepositModal
        kandelAddress={kandelAddress}
        market={market}
        onClose={closeModalAndRefetch}
      />}
      {showModal === 'withdraw' && <WithdrawReservesModal
        kandelAddress={kandelAddress}
        onClose={closeModalAndRefetch}
      />}
    </>}
  </div>)
}

function ButtonWrapper({ children }: { children: ReactNode }) {
  return (<div className='p-4'>{children}</div>)
}

export default KandelDashboard
