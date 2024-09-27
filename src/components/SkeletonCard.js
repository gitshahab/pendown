import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const SkeletonCard = () => {
    const dark = JSON.parse(localStorage.getItem("darkMode"))
  return (
    <SkeletonTheme baseColor={dark && "#202020"} highlightColor={dark && "#444"}>
    <section className='my-5 px-4 '>
    <p className='text-xl text-gray-800 font-semibold md:text-2xl my-2'>{<Skeleton/>}</p>
    <p className='text-sm text-gray-800 md:text-xl my-2'>{<Skeleton count={2}/>}</p>
    <div className="flex justify-between items-center"> 
        <span className='text-gray-800 '>{<Skeleton width="70px"/>}</span>
    </div>
    <hr className='text-gray-950 px-4 my-2'/>
    </section>
    </SkeletonTheme>
  )
}
