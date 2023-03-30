import React from 'react';
import ListPosts from "../../components/ListPosts";
import {Link} from "react-router-dom";

function HomePage() {
  return (
      <div className='list-posts'>
        <div className='new-post'>
          <Link to="/posts/new">
            <button className='simple-btn' type="button">
              Создать пост
            </button>
          </Link>
        </div>
        <div className='list'>
          <ListPosts />
        </div>
      </div>
  );
}

export default HomePage;