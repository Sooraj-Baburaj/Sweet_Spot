import React, {useState, useContext} from 'react';
import './form.css';
import {userContext} from '../../context/userContext';
import {postContext } from '../../context/postContext';
import { createPost } from '../../api/postApi';

const Form = () => {

    const { currentUser,setTab,setNotification } = useContext(userContext);
    const {setPosts, posts} = useContext(postContext);

    const [post, setPost] = useState({
        postedFile: "",
        caption: "",
        userName: currentUser.userName,
        userProfile: currentUser.profile,
        userId: currentUser._id
    });
    const [err,setErr] = useState('');

    const getBase64 = (file) => {
        return new Promise(resolve => {
            let baseUrl = "";

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseUrl = reader.result;
                resolve(baseUrl);
            }
        })
    };

    const handleFileInput = (e) => {
        let file = e.target.files[0];

        getBase64(file)
        .then(result => {
            setPost({...post, postedFile: result})
        })
    }

    const handleSubmit = async() => {
        if( !post.postedFile || !post.caption) {
            setErr("Please fill both fields")
            console.log("hi")
        } else {
            setErr('Uploading...')
            await createPost(post)
            .then((res) => {setPost({
                postedFile: "",
                caption: "",
                userName: currentUser.userName,
                userProfile: currentUser.profile,
                userId: currentUser._id
            });
                        setErr('');
                        setTab('home');
                        setNotification('Post Uploaded');
                        setTimeout(() => {
                            setNotification('')
                        },5000)
                        setPosts([...posts,...res.data])
        })
        }
    }

    return (
       <div className="uploadPage">
           <div className="uploadForm">
               <h2>Upload Post</h2>
               <div className="uploadPreview"><img alt="Preview"  src={post.postedFile ? post.postedFile : "https://images.unsplash.com/photo-1539485420953-992679a61975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}/></div>
               <div className="ImageUpload"><label htmlFor="PostFile">Upload <span className="material-icons-outlined">add_a_photo</span> File</label><input onChange={(e) => handleFileInput(e)} type="file" id="PostFile" /></div>
               <div className="captionInput"><input value={post.caption} onChange={(e) => setPost({...post, caption: e.target.value})} placeholder="Add a caption..." type="text" /></div>
               <div className="uploadBtn"><button onClick={handleSubmit}>Upload</button></div>
               <div className="uploadErr">{err}</div>
           </div>
       </div>
    )
}

export default Form;
