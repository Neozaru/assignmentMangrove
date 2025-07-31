// ChatGPT generated to save time

// types.ts (or inline)
export type Address = string;
export type MarketParams = Record<string, any>;

export interface Kandel {
  address: Address;
  owner: Address;
  market: MarketParams;
  chainId: number;
}

const STORAGE_KEY = 'kandels';

/**
 * Retrieve all stored Kandels. Falls back to empty array if missing/malformed.
 */
export function getAllKandels(): Kandel[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Kandel[];
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

/**
 * Add a Kandel if not already present (unique by address+chainId).
 * Returns true if added, false if it already existed.
 */
export function addKandel(kandel: Kandel): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  const all = getAllKandels();
  const exists = all.some(
    k =>
      k.chainId === kandel.chainId &&
      k.address.toLowerCase() === kandel.address.toLowerCase(),
  );
  if (exists) return false; // already stored

  all.push(kandel);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // swallow quota/private mode errors
  }
  return true;
}
