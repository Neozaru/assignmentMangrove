type Props = {
  text: string,
  callback?: () => void
}

const CtaButton = ({ text, callback }: Props) => {
  return (<button
    onClick={() => callback && callback()}
    disabled={!callback}
    className={`w-full py-2 px-4 rounded-xl transition
    ${callback
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:cursor-pointer'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
  `}
  >
    {text}
  </button>)
}

export default CtaButton
