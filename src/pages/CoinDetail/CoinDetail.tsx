import { useNavigate } from 'react-router-dom'
import useStore from '../../store'

const CoinDetail = () => {

  const { balance } = useStore()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className='w-full h-screen bg-white flex justify-center items-center flex-col gap-20'>
      <button type="button" className='border border-black rounded-lg box-shadow p-4' onClick={handleGoBack}>Volver</button>
      <p>Actualmente tienes: {balance.toString()} tokens en tu wallet.</p>
    </div>
  )
}

export default CoinDetail