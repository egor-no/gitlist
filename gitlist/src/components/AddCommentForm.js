import { useState } from "react";
import axios from "axios";

const AddCommentForm = ({ repoName, onRepoUpdated }) => {
    const [name, setName] = useState(''); 
    const [commentText, setCommentText] = useState(''); 
    const [nameError, setNameError] = useState(''); 
    const [commentError, setCommentError] = useState(''); 

    const addCommentIfNeeded = () => {
        if (!name) {
            setNameError('Name cannot be empty');
        } else if (!commentText) {
            setNameError('');
            setCommentError('Comment text cannot be empty');
        }  else if (commentText.length <5) {
            setCommentError('You sure have more to say');
        } else {
            setNameError('');
            setCommentError('');
            addComment();
        }
    }

    const addComment = async() => {
        const response = await axios.post(`/api/repos/${repoName}/comments`, {
            postedBy: name, 
            text: commentText,
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
                Name:      <label className="formError">{nameError}</label><br />         
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
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