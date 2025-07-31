type Base = {
  amount: string
  balance?: string
  symbol: string
}

type Enabled = Base & {
  disabled?: false
  onChange: (s: string) => void
}

type Disabled = Base & {
  disabled?: true
  onChange?: never
}

type Props = Enabled | Disabled

const AmountInputWithBalance = ({ amount, balance, symbol, disabled = false, onChange }: Props) => {
  return (<div className="mb-3">
    <label className="block text-sm font-medium">
      {symbol}: {balance && <span className={`${disabled ? '' : 'cursor-pointer'}`} onClick={() => !disabled && onChange && onChange(`${balance}`)}>(Balance: {balance})</span>}
    </label>
    <input
      type="number"
      value={amount}
      onChange={e => !disabled && onChange && onChange(e.target.value)}
      className={`w-full rounded-lg border ${disabled ? 'border-gray-300' : 'border-gray-300'} p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      placeholder="e.g. 500"
      disabled={disabled}
    />
  </div>)
}

export default AmountInputWithBalance
