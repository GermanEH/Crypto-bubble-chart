import { create } from 'zustand'

interface SearchBarState {
    balance: bigint 
    address: string 
    setBalance: (balance:bigint) => void 
    setAddress: (address:string) => void 
}
const useStore = create<SearchBarState>((set) => ({
    balance: 0n,
    address: '',
    setBalance: (balance) => set(() => ({balance})),
    setAddress: (address:string) => set(() => ({address}))
}))

export default useStore