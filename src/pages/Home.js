import { useEffect, useState } from 'react'
import { Card, SkeletonCard } from '../components'
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useTitle } from '../hooks/useTitle';
import { toast } from 'react-toastify';


export const Home = ({login}) => {
    const [ posts, setPost ] = useState([false, false, false]);
    const [ toggle, setToggle ] = useState(false);
    
    useTitle("Home");

    useEffect(() => {
        if (login) {
            setToggle(prev => !prev);
        }
    }, [login]);
 
    useEffect(() => {
        async function getPosts(){
            try {
                const data = await getDocs(collection(db, "posts"));
                setPost(data.docs.map((document) => (
                    {...document.data(), id: document.id}
                )));
            } catch (error) {
                toast.error("Failed to fetch, try again later.");
            }
        }
        getPosts();
    }, [toggle]);

  return (
    <section>
        {posts.map((post, index) => (
            post ? (
                <Card key={post.id} post={post} login={login} setToggle={setToggle} />
            ) : (
                <SkeletonCard key={index}/> 
            )  
        ))
        }
    </section>
  )
}
