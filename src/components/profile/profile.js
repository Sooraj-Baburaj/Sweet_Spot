import React, {useState, useContext, useEffect} from 'react';
import './profile.css';
import { userContext } from '../../context/userContext';
import { postThumbs } from '../../api/postApi';
import { followUser } from '../../api/userApi';

const Profile = () => {
    const { anotherUser, userProfile, currentUser, setTab, setAnotherUser} = useContext(userContext);
    const [user,setUser] = useState({
        userName: "",
        followers: [],
        following: []
    })
    const [postThumb, setPostThumb] = useState([])
    const [following, setFollowing] = useState(false);
   

    useEffect(() => {
        if(anotherUser) {
            setUser(userProfile);
        } else {
            setUser(currentUser)
        };
        const getPostThumbs = async() => {
            await postThumbs(user._id)
            .then(res => setPostThumb(res.data))
        }
        getPostThumbs();
        if(userProfile.followers.includes(currentUser._id)) {
            setFollowing(true)
        } else {
            setFollowing(false)
        }
    }, [user,currentUser,anotherUser,userProfile]);

    const handleFollow = async() => {
        if(following) {
            setFollowing(false)
        } else {
            setFollowing(true)
        }
        await followUser(currentUser._id, userProfile._id)
    }
    const handleBack = () => {
        setTab("home");
        setAnotherUser(false);
    }

    return (
        <div className="ProfilePage">
            <div className="UserData">
                {anotherUser && (
                <div className="BackBtn" onClick={handleBack} ><span className="material-icons-outlined">arrow_back</span></div>
                )}
                <div className="UserPageProfile"><img src={user.profile} alt="Profile" /></div>
                <div className="UserName"><h1>{user.userName}</h1></div>
                <div className="UserPageStatus">
                    <div className="UserPageInfo"><span>{postThumb.length}</span><p>Posts</p></div>
                    <div className="UserPageInfo"><span>{user.followers.length}</span><p>followers</p></div>
                    <div className="UserPageInfo"><span>{user.following.length}</span><p>following</p></div>
                </div>
                { anotherUser && (
                     <div className="FollowButton"><button  onClick={() => handleFollow()} >{following ? "Unfollow" : "Follow"}</button></div>
                )}
                <div className="UserPosts">
                <h2>Posts</h2>
                <div className="PostThumbs" style={{justifyContent: postThumbs.length > 3 ? 'flex-start' : 'space-evenly'}} >{postThumb.map((source) => (
                    <img src={source.postedFile} key={source._id} alt={source.caption} />
                ))}</div>
            </div>
            </div>
        </div>
    )
}


export default Profile;
