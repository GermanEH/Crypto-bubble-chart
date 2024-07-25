import {Link} from 'react-router-dom'
import Logomark from '../../../assets/images/MoralisMoneyLogomark.5b65b0d7.svg'
import Logotype from '../../../assets/images/MoralisMoneyLogotype.431faf8b.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartLine, faBookOpenReader, faCoins, faGear, faCode, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const NavBar:React.FC = () => {

  const items = [
    {name:'Market Overview',  icon:faChartLine},
  {name: 'Research', icon: faBook},
  {name: 'Saved', icon: faHeart}, 
  {name: 'Learn', icon:faBookOpenReader}, 
  {name: 'Portfolio', icon:faCoins}, 
  {name: 'Settings', icon: faGear}, 
  {name: 'API For Devs', icon: faCode }]

  return (
    <aside className=" bg-[#0f253d] w-[280px] h-screen flex flex-col overflow-visible">
      <div className=" flex justify-center h-[4.375rem] items-center w-full">
        <div className="p-4 h-[62px]">
        <div className="flex items-center">
              <Link to='/top-tokens-by-market-cap' className="flex gap-x-3">          
                      <img src={Logomark} className="w-38 h-30"/>
                      <img src={Logotype} className="w-38 h-30"/>
              </Link>
        </div>
        </div>
      </div>
      <div className='flex flex-col justify-between h-[calc(100%-4.375rem)]'>
        <div className="flex flex-col grow max-h-[calc(100%-11.875rem)] overflow-visible">
          <nav className="flex flex-start overflow-y-auto h-full px-4 scrollbar-webkit">
            <ul className="flex flex-col w-full gap-2">
            {items.map((item, index) => {
              return (
              <li key={index} >
                <Link to='/'>
                <div>
                  <button className="text-menu-items text-[1.125rem] px-5 py-3 w-full flex items-center h-13">
                    <span  className="flex items-center flex-grow gap-3">
                      <span><FontAwesomeIcon icon={item.icon}/></span>
                    {/* <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chart-mixed" class="svg-inline--fa fa-chart-mixed " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{item.path}</svg> */}
                    {item.name}
                    </span>
                    <span>
                      <svg height="0.75rem" width="0.75rem" viewBox="0 0 512 512" fill="#68738d" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                    </span>
                  </button>
                </div>
                </Link>
              </li>
              )
            })}
            </ul>
          </nav>
        </div>
        <div>
          <div>
            <div className="flex flex-col gap-3 px-4 pb-4">
              <button className="flex justify-center items-center px-4 border border-[#2e628e] text-[#85b3db] w-full h-12 rounded-lg border-2 gap-2">
              {/* <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path></svg> */}
                Start Trial
              </button>
            </div>
          </div>
        <div className="border-t border-solid border-[#1a3656] bg-[#132A44] flex items-center py-3 px-4 w-full justify-end">
          <button className="text-[#85b3db] bg-[#132A44]">
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
        </div>
        </div>
      </div>
    </aside>
  )
}

export default NavBar