import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClose: () => void
}

const ModalWrapper = ({ children, onClose }: Props) => {
  return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative">
      <button
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
      {children}
    </div>
  </div>)
}

export default ModalWrapper
