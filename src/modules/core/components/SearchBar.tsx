
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { 
  Account,
  createPublicClient,
  //  createWalletClient,
   http 
  } from 'viem'
  import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import useStore from '../../../store';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

  const { setBalance, setAddress } = useStore()
  const navigate = useNavigate()
  const configurePublicClientPrivate = async (address: Account) => {
    try {
      if (address) {
        return createPublicClient({
          // account: '0x42c58049b51069F8b9ed6d7b5232F8Ad0745619f',
          chain: base,
          transport: http(
            "https://base-mainnet.infura.io/v3/5c17da17578a413195e387c9a5cdcfce"
          ),
        })
        // .extend(walletActions);
      } else {
        throw new Error("wallet no está disponible");
      }
    } catch (error: any) {
      console.log(error.message);
      throw error.message;
    }
  };
  // const configureWalletClientPrivate = async (address: Account) => {
  //   try {
  //     console.log(address)
      
  //     if (address) {
  //       return createWalletClient({
  //         account: address.address,
  //         chain: base,
  //         transport: http(
  //           "https://base-mainnet.infura.io/v3/5c17da17578a413195e387c9a5cdcfce"
  //         ),
  //       })
  //       // .extend(walletActions);
  //     } else {
  //       throw new Error("wallet no está disponible");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     throw error.message;
  //   }
  // };

  // if(address) {
//   walletClient = createWalletClient({
  //   account: address,
//   chain: base,
//   // transport: custom(window.eth!),
//   transport:http('https://base-mainnet.infura.io/v3/7999682693a74489b8e6ab7070db18c0')
// })
// }

// const [account, setAccount] = useState<Address>()
// const [hash, setHash] = useState<Hash>()
// const [receipt, setReceipt] = useState<TransactionReceipt>()

// const connect = async () => {
//   const [address] = await walletClient.requestAddresses()
//   setAccount(address)
// }

// const mint = async () => {
//   if (!account) return
//   const { request } = await publicClient.simulateContract({
//     ...wagmiContract,
//     functionName: 'mint',
//     account,
//   })
//   const hash = await walletClient.writeContract(request)
//   setHash(hash)
// }

const getBalance = async () => {
  try {
    const string = '4fb07d852b85987d19f24ecb442867dd7e2498577967f40df0c7643d1adc8da8'
    const account = await privateKeyToAccount(`0x${string}`);
    const publicClient = await configurePublicClientPrivate(account);
    const balance = await publicClient.getBalance({ 
      address: '0x42c58049b51069F8b9ed6d7b5232F8Ad0745619f',
    })
    setBalance(balance)
    navigate('/coin/detail/:id')
    // const walletClient = await configureWalletClientPrivate(account);
    // const asset = await walletClient.watchAsset({
    //   type: 'ERC20',
    //   options: {
    //     address: '0x42c58049b51069F8b9ed6d7b5232F8Ad0745619f',
    //     decimals: 18,
    //     symbol: 'WETH',
    //   }
    // })
    return balance

  } catch (error) {
    console.log(error)
  }
}

  return (
    <header className="bg-[#09182a] h-[4.375rem] flex justify-between sticky p-3 border-b border-solid border-[#132a44]">
    <div className="flex grow w-full max-w-[28.125rem]">
        <div className="text-white flex grow w-full bg-[#06111d] border border-solid border-[#224767] border-1 text-[#2e628e] text-[0.875rem] gap-[0.625rem] leading-loose flex justify-start items-center py-[0.5rem] px-[1.37rem] w-full rounded-full leading-[1.5]">
            <button type="button" onClick={getBalance} className="">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
              <input type="text" name="wallet" onChange={(e) => setAddress(e.target.value)} 
              className="flex items-center w-full text-white bg-[#06111d]" placeholder="Search for any token or wallet"/>
        </div>
    </div>
    <div className='flex items-center justify-end gap-3'>
        <div className="h-[80%]">
          <button className='flex justify-center items-center border border-[#2e628e] text-[#85b3db] font-medium text-[0.875rem] px-2 gap-2 h-full border-2 border-solid rounded-lg'>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            Login / Connect
            </button>
        </div>
    </div>
    </header>
  )
}

export default SearchBar

// red: #462025

// green: #1e402f