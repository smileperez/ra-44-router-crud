import React from 'react';
import {useParams} from "react-router-dom";
import ViewChangePost from "../../components/ViewChangePost";

function PostPage() {
  let { id } = useParams();

  return (
      <div className='create-post'>
        <ViewChangePost id={id} />
      </div>
  );
}

export default PostPage;