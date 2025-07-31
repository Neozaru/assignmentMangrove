import { addKandel, getAllKandels, Kandel } from '@/lib/kandelStore';
import { useState, useCallback } from 'react';

export function useSavedKandels() {
  const [kandels, setKandels] = useState<Kandel[]>(() => {
    if (typeof window === 'undefined') return []
    return getAllKandels()
  })

  const add = useCallback((k: Kandel): boolean => {
    const added = addKandel(k)
    if (added) {
      setKandels([...getAllKandels(), k])
      // LIMITATION: For some reason we still need to refresh the page after adding a kandle.
      window.location.reload()
    }
    return added
  }, [])

  return { kandels, add }
}
