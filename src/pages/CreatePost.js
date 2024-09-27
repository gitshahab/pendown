import { useState } from 'react';
import { useTitle } from '../hooks/useTitle';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from "../firebase/config";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CreatePost = () => {
    useTitle("Create Post");
    const [ tText, setTText ] = useState("");
    const [ dText, setDText ] = useState("");
    const [ tChar, setTChar ] = useState(0);
    const [ dChar, setDChar ] = useState(0);
    const navigate = useNavigate();

    const postRef = collection(db, "posts");

    async function handleSubmit(event) {
        event.preventDefault();
        const document = {
            title: event.target.title.value,
            description: event.target.desc.value,
            author : {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
            }
        }
        try {
            await addDoc(postRef, document);
            setTText("");
            setDText("");
            setTChar(0);
            setDChar(0);
            navigate("/");
        } catch (error) {
            toast.error("Failed to create post");
        }
        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === "title") {
            setTText(value);
            setTChar(value.length);
        } else if ( name === "desc" ){
            setDText(value);
            setDChar(value.length);
        }
           
    };

  return (
    <section>
        <div className='flex justify-center items-center m-5 p-4'>
            <h1 className='font-semibold text-lg md:text-2xl text-gray-900 dark:text-gray-200'><i className="bi bi-plus"></i>Add Post</h1>
        </div>
        <div className='flex justify-center items-center mx-10'> 
            <form onSubmit={handleSubmit} className='w-full'>
                <input onChange={handleChange} value={tText} className='my-2 shadow-md w-full p-2 text-lg md:text-xl text-gray-900 dark:text-gray-200 bg-white dark:bg-bg border border-gray-300 dark:border-gray-600 rounded-lg' type="text" name="title" placeholder='Title' required />
                <p className='p-1 text-gray-700 dark:text-gray-200'><span className={`${tChar > 50 && "text-red-600"}`}>{tChar}</span>/50</p>
                <textarea onChange={handleChange} value={dText} className="my-2 p-2 shadow-md w-full h-40 text-lg md:text-xl text-gray-900 dark:text-gray-200  bg-white dark:bg-bg border border-gray-300 dark:border-gray-600 rounded-lg" type="text" name="desc" placeholder='Description' required></textarea>
                <p className='p-1 text-gray-700 dark:text-gray-200'><span className={`${dChar > 200 && "text-red-600"}`}>{dChar}</span>/200</p>
                <button className={`${tChar > 50 || dChar > 200 ? `opacity-50 cursor-not-allowed pointer-events-none` : ""} my-2 w-full p-2 m-auto rounded-lg bg-blue-600 text-white text-lg md:text-xl `} type='submit' disabled={tChar > 50 || dChar > 200}>Create</button>
            </form>
        </div>
    </section>
  )
}
