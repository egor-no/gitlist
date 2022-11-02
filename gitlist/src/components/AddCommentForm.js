import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ repoName, onRepoUpdated }) => {
    const [name, setName] = useState(''); 
    const [commentText, setCommentText] = useState(''); 
    const [commentError, setCommentError] = useState(''); 
    const { user } = useUser();

    const addCommentIfNeeded = () => {
        if (!commentText) {
            setCommentError('Comment text cannot be empty');
        }  else if (commentText.length <5) {
            setCommentError('You sure have more to say');
        } else {
            setCommentError('');
            addComment();
        }
    }

    const addComment = async() => {
        const token = user && await user.getIdToken(); 
        const headers = token ? { authtoken : token } : {}; 
        const response = await axios.post(`/api/repos/${repoName}/comments`, {
            postedBy: name, 
            text: commentText,
        }, {
            headers,
        });
        const updatedRepo = await response.data;
        onRepoUpdated(updatedRepo);  
        setName(''); 
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
           
            <label>
            { user && <>You are posting as </>  } <br />         
                <input 
                    value={user && user.email ? user.email : '' }
                    onChange={e => setName(e.target.value)}
                    type="text" readOnly />
            </label>
            <label>
                Comment:    <label className="formError">{commentError}</label><br />
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4" cols="50" />
            </label>
            <button onClick={addCommentIfNeeded}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm; 