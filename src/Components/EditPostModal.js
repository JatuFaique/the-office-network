import React, { useState } from "react";

function EditPostModal({ post, handleEditPost, setEditProfileModal }) {
  const [postContent, setPostContent] = useState({ content: post.content });
  const handleEditedPostContent = (event) => {
    setPostContent({
      ...postContent,
      content: event.target.value,
    });
  };

  return (
    <section className="mod dis-flex-col s-50">
      <div className="sec-header bg-prm p-3">
        <div className="mod-title">Modal Header</div>
        <i
          onClick={() => setEditProfileModal(false)}
          className="btn fas fa-times"
        ></i>
      </div>
      <div className="sec-body  p-3">
        <textarea
          value={postContent.content}
          onChange={handleEditedPostContent}
          className="border-bs p-0-5"
          placeholder="Whats on your Mind?"
        ></textarea>
      </div>
      <div className="sec-footer p-3">
        <button
          onClick={() => handleEditPost(postContent)}
          className="btn txt-white bg-prm"
        >
          Save
        </button>
        <button
          onClick={() => setEditProfileModal(false)}
          className="btn txt-grey bg-scn"
        >
          Delete
        </button>
      </div>
    </section>
  );
}

export default EditPostModal;
