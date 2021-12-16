import React, {useState , useContext, useEffect, useRef, useCallback} from 'react';
import { postContext } from '../../context/postContext';
import { userContext } from '../../context/userContext';
import { getUser } from '../../api/userApi';

const Post = ({post, length, index}) => {

    const { dispatchLike, globalLike, loading, hasMore, setNum } = useContext(postContext);
    const { currentUser, setTab, setAnotherUser, setUserProfile } = useContext(userContext);

    const [like,setLike] = useState(post.likes);
    const [liked,setLiked] = useState(false);

    useEffect(() => {
        if(post.likedby.includes(currentUser._id)) {
            setLiked(true);
        }
    }, [post.likedby,currentUser._id]);

    const observer = useRef();
    const lastElement = useCallback(node => {
        if (loading) return 
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setNum(prev => prev + 5)
            }
        },{threshold: 0.9})
        if (node) observer.current.observe(node)
    },[loading, hasMore, setNum])

    const handleLike = () => {
        if(!liked) {
            setLike(prev => prev +1 )
            setLiked(true)
            dispatchLike( post._id ,{likes: like + 1 , likedby: currentUser._id })
            globalLike(post._id, like + 1, currentUser._id)
        }  else {
            setLike(prev => prev - 1)
            setLiked(false)
            dispatchLike( post._id ,{likes: like - 1 , likedby: currentUser._id })
            globalLike(post._id, like - 1, currentUser._id)
        }
    };
   
    const handleProfile = async() => {
        if(post.userId !== currentUser._id) {
        setTab('profile');
        setAnotherUser(true);
        
        await getUser(post.userId)
        .then((res) => setUserProfile(res.data))
        }
    };

    return (
        <div className="post" style={{boxShadow: !liked ? "0 0 0 2px rgba(0,0,0,0.1) , 0 0 0 2px rgba(0,0,0,0.06)" : "0 0 0 2px #32B8CB, 0 0 0 2px #32B8CB" , marginBottom: length === index + 1 && !hasMore ? '80px' : ''}} onDoubleClick={handleLike}>
            <div className="postHeader">
                <div className="user" onClick={() => handleProfile()}>
                    <div className="profile"><img src={post.userProfile} alt="" /> </div>
                        <div className="userName"><h5>{post.userName}</h5></div>
                </div>
            </div>
            { length === index + 1 ?
            <div className="image" ref={lastElement}><img src={post.postedFile} alt="" /></div> :
            <div className="image"><img src={post.postedFile} alt="" /></div>
            }
            <div className="PostCaption"><p>{post.caption}</p></div>
            <div className="status">
                <div onClick={handleLike} className="like"><span style={{color : !liked ? "" : "#32B8CB" }} className="material-icons">{!liked ? "favorite_outlined" : "favorite"}</span><p>{like}</p></div>
                <div className="comments"><span className="material-icons">chat_bubble_outline</span><p>{post.comments}</p></div>
            </div>
        </div>
    )
}

export default Post;
