import { Link } from 'react-router-dom'
import Pnf from '../assets/404-pnf.svg'
import { useTitle } from '../hooks/useTitle'

export const PageNotFound = () => {
    useTitle("Page Not Found");
  return (
    <section className='flex flex-col items-center justify-center my-5'>
        <div>
            <p className='text-xl md:text-2xl text-gray-950 dark:text-gray-100 my-5'>Opps! Page Not Found</p>
            <img src={Pnf} alt="page not found" />
        </div>
        <Link to="/"><button className='text-white bg-blue-600 rounded-lg p-2 my-5'>Back to <i className="bi bi-house"></i></button></Link>
    </section>
  )
}
