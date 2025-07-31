import { Kandel } from './kandelStore'

const generateLinkForKandel = (kandel: Kandel) => {
  return `/kandels/${kandel.chainId}-${kandel.address}`
}

export default generateLinkForKandel
