import {Link} from 'react-router-dom'
import Logo from '../../assets/images/MoralisMoneyLogomark.5b65b0d7.svg'

const NavBar:React.FC = () => {
  return (
    <div className="bg-[#0f253d] w-[20%] h-screen">
        <ul>
            <Link to='/home'>          
                <li>
                    <img src={Logo} className="w-38 h-30"/>
                    <div>
                    <p style={{margin:'0'}}>moralis</p>
                    <p style={{margin:'0'}}>money</p>
                    </div>
                </li>
            </Link>
        {/* <li style={{padding:'2rem'}}><Link to='/'>Market Overview</Link></li>
        <li style={{padding:'2rem'}}><Link to='/'>Research</Link></li>
        <li style={{padding:'2rem'}}><Link to='/'>Saved</Link></li>
        <li style={{padding:'2rem'}}><Link to='/'>Learn</Link></li> */}
      </ul>
    </div>
  )
}

export default NavBar