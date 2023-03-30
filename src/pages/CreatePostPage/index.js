import React from 'react';
import {Link} from "react-router-dom";
import CreatePost from "../../components/CreatePost";
import { IoClose } from "react-icons/io5";

function CreatePostPage() {
  return (
    <div className='create-post'>
      <div className='post'>
        <div className='create-post-tools'>
          <Link to='/'>
            <button className='back-btn' type="button">
              <IoClose className='back-btn-x'/>
            </button>
          </Link>
        </div>
        <CreatePost />
      </div>
    </div>
  );
}

export default CreatePostPage;