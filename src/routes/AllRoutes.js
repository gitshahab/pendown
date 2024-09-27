import { Routes, Route } from 'react-router-dom';
import { Home, CreatePost, PageNotFound, Loading } from '../pages';
import { ProtectedRoutes } from './ProtectedRoutes';


export const AllRoutes = ({login}) => {
  return (
    <main className='min-h-screen'>
    <Routes>
        <Route path="/" element={<Home login={login}/>} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/create" element={<ProtectedRoutes><CreatePost /></ProtectedRoutes>} />
        <Route path="/*" element={<PageNotFound />} />
    </Routes>
    </main>
  )
}
