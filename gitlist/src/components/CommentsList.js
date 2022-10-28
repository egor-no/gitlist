const CommentsList = ({ comments }) => {
    let code;
    if (comments.length == 0) {
        code = ( <>
                <p>No comments here yet</p>
                </>
        );

    } else {
        code = comments.map(buildCommentIfNeeded)
    }

    return ( 
    <>
        <h3>Comments: </h3>
        {code}
        <p className="repo-list-item"></p>
    </>
    )
};

function buildCommentIfNeeded(comment) {
    if (comment.postedBy == null && comment.text == null) { 
        return "";
    } else {
        return (
            <div className="comment" key={comment.postedBy+ ': '+comment.text}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        );
    }
}

export default CommentsList;