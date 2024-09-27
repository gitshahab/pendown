import { auth, db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export const Card = ({post, login, setToggle}) => {
    const { id, title, description, author } = post;

    async function handleDelete(){
        const document = doc(db, "posts", id);
        await deleteDoc(document);
        setToggle(prev => !prev);
    }
    const IsAuthor = login && auth.currentUser && (author.id === auth.currentUser.uid);

    return (
        <section className='my-5 px-4 '>
            <p className='text-xl text-gray-800 dark:text-gray-200 font-semibold md:text-2xl my-2'>{title}</p>
            <p className='text-sm text-gray-800 dark:text-gray-200 md:text-xl my-2'>{description}</p>
            <div className="flex justify-between items-center"> 
                <span className='text-gray-800 dark:text-gray-200 border rounded border-gray-950 dark:border-gray-100 px-2'>{author.name}</span>
                { IsAuthor && <span onClick={handleDelete}><i className="bi bi-trash text-red-600 cursor-pointer"></i></span> }
            </div>
            <hr className='text-gray-950 dark:text-gray-100 px-4 my-2'/>
        </section>
    )
}
