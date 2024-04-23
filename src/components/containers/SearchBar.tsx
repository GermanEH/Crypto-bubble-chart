
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  return (
    <header className="bg-[#09182a] h-[4.375rem] flex justify-between sticky p-3 border-b border-solid border-[#132a44]">
    <div className="flex grow w-full max-w-[28.125rem]">
        <div className="flex grow w-full">
            <button className="bg-[#06111d] border border-solid border-[#224767] border-1 text-[#2e628e] text-[0.875rem] gap-[0.625rem] leading-loose flex justify-start items-center py-[0.5rem] px-[1.37rem] w-full rounded-full leading-[1.5]">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
              <span className="flex items-center pointer-events-none">Search for any token or wallet</span>
            </button>
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