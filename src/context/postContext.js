import React, {createContext, useState, useEffect, useContext} from 'react';
import { likePost } from '../api/postApi';
import { userContext } from './userContext';
import usePostFeeds from './usePostFeeds';

export const postContext = createContext();

export const PostProvider = ({children}) => {

    const { loggedIn } = useContext(userContext);

    const [posts,setPosts] = useState([]);
    const [num, setNum] = useState(5);

    const {
        feeds,
        loading,
        hasMore
    } = usePostFeeds(num,loggedIn);

    useEffect(() => {
        setPosts(feeds)
    },[feeds])
    
    const dispatchLike = async(id, like) => {

        await likePost(id,like)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    const globalLike = (id,like,likedby) => {
        const updatedPost = posts.map((post) => {
            if(post._id === id) {
                return {...post, likes: like}
            } else{
                return post
            }
        })
        let updatedLikedBy = updatedPost.map((post) =>{
            if(post._id === id) {
                if(post.likedby.includes(likedby)) {
                    let filteredLikedby = post.likedby.filter((id) => id !== likedby)
                    post.likedby = filteredLikedby
                    return post
                } else {
                    let SecFilteredLikedby = [...post.likedby, likedby]
                    post.likedby = SecFilteredLikedby
                    return post
                }
            } else {
                return post
            }
        });
        setPosts(updatedLikedBy);
    }
    
    return (
        <postContext.Provider value={{
            dispatchLike,
            posts,
            setPosts,
            globalLike,
            loading,
            hasMore,
            setNum
        }}>
            {children}
        </postContext.Provider>
    )
}

