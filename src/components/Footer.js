import { Link } from 'react-router-dom'

export const Footer = () => {
    const date = new Date().getFullYear();
  return (
    <section>
        <footer>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {date} <Link to="/" className="hover:underline">pendown™</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    </section>
  )
}
