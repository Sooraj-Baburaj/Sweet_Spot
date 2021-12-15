import React, { useContext } from 'react';
import Post from './post';
import Loading from '../Loading/Loading';
import PostLoading from './PostLoading';
import { postContext } from '../../context/postContext';

const Posts = () => {

    const { posts, loading } = useContext(postContext);

    return (
        <>
        { posts.length === 0 ? ( <Loading/> ) :
        ( <div className="container">
            {
                posts.map((post,index) => (
                    <Post key={post._id} length={posts.length} index={index} post={post} />
                ))
            }
        </div>
        )
        }
        {loading && posts.length !== 0 ? (
            <PostLoading />
        ) : ''}
        </>
    )
}

export default Posts;
