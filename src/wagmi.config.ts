import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { webSocket } from 'viem';
import { base } from 'viem/chains';

const wagmiConfig = getDefaultConfig({
  appName: 'Mangrove Test Dapp',
  projectId: 'YOUR_PROJECT_ID',
  chains: [base],
  transports: {
    [base.id]: webSocket(process.env.NEXT_PUBLIC_BASE_URL_WSS)
  },
  ssr: true,
});

export default wagmiConfig
