const SearchBar = () => {
  return (
    <div className="bg-[#09182a] h-[12%] flex p-2">
        <div className="w-[50%] flex justify-start">
            <button className="bg-[#06111d] border border-solid border-[#224767] border-1 text-[#2e628e] text-xs leading-loose flex justify-start px-6 py-2 w-full rounded-full">Search for any token or wallet </button>
        </div>
        <button>Login / Connect</button>
    </div>
  )
}

export default SearchBar

// red: #462025

// green: #1e402f