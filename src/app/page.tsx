import Link from 'next/link';

export default function Home() {
  return (
    <div>
        <div>
          WETH/USDC (base): <Link className='text-blue-500' href={'/markets/8453-0x4200000000000000000000000000000000000006-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913-1'}>Market</Link>
        </div>
        <div>
          cbBTC/USDC (base): <Link className='text-blue-500' href={'/markets/8453-0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913-1'}>Market</Link>
        </div>
        <div>
          wstETH/WETH (base): <Link className='text-blue-500' href={'/markets/8453-0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452-0x4200000000000000000000000000000000000006-1'}>Market</Link>
        </div>

        
    </div>
  );
}
