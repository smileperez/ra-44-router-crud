import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { IoAtOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {Link} from "react-router-dom";
import TimeFormat from './TimeFormat';

function ViewChangePost( {id} ) {

    const url = 'http://localhost:7070/posts';
    const [post, setPost] = useState(null);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');

    // Заполняем состояние text из textarea
    const onChangeTextarea = (e) => {
        setText(e.target.value)
    }

    let navigate = useNavigate();

    useEffect(() => {
        const update = async () => {
            try {
                const response = await fetch(url, {method: 'GET'});
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                let filteredData = data.filter(item => Number(item.id) === Number(id))[0];
                setPost(filteredData);
                console.log(filteredData);
            } catch (e) {
                throw new Error(e);
            }
        };

        update();

    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:7070/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 0,
            content: text
          })
        })
        // После отправки возвращаемся на главную страницу
        console.log(id);
        navigate(`/`);
    }

    const onClickDelete = async (id) => {
        await fetch(`http://localhost:7070/posts/${id}`, {
          method: 'DELETE'
        });
        navigate('/');
    };

    const onClickEdit = () => setEdit(!edit);


    if (post === null) {
        return 'Loading...'
    }

    if (Object.keys(post).length === 0) {
        return `No element with id == ${post.id}`
    }

    if (edit === true) {
        return(
          <>
            <div key={id} className="post-view">
                <div className='post-view-tools'>
                    <Link to={`/posts/${id}`}>
                        <button className='back-btn' type="button">
                            <IoClose className='back-btn-x'/>
                        </button>
                    </Link>
                </div>
                <div className="user-view">
                    <div className="user-img"></div>
                    <div className="user-info">
                        <h2 className="user-name">{post.id}</h2>
                        <div className="user-status">
                            <h3 className="user-status-h3">Основатель группы</h3>
                            <IoAtOutline className="user-status-del"/>
                            <h3 className="user-status-h3"><TimeFormat time={post.created} /></h3>
                        </div>
                    </div>
                </div>
                <form id="edit-form" onSubmit={(e) => onSubmitForm(e)}>
                    <textarea
                            className="create-post-textarea"
                            onChange={(e) => onChangeTextarea(e)}
                            required
                    >
                        {post.content}
                    </textarea>
                </form>
                
            </div>
            <div className='post-tools'>
                <button form='edit-form' className="simple-btn">Сохранить</button>
            </div>  
          </>
        )
    }

    return (

        <>
            <div key={id} className="post-view">
                <div className='post-view-tools'>
                    <Link to='/'>
                        <button className='back-btn' type="button">
                            <IoClose className='back-btn-x'/>
                        </button>
                    </Link>
                </div>
                <div className="user-view">
                    <div className="user-img"></div>
                    <div className="user-info">
                        <h2 className="user-name">{post.id}</h2>
                        <div className="user-status">
                            <h3 className="user-status-h3">Основатель группы</h3>
                            <IoAtOutline className="user-status-del"/>
                            <h3 className="user-status-h3"><TimeFormat time={post.created} /></h3>
                        </div>
                    </div>
                </div>
                <p className="text-content-view">{post.content}</p>
                
            </div>
            <div className='post-tools'>
                <button type='button' className="simple-btn btn-delete" onClick={() => onClickDelete(post.id)} >Удалить</button>
                <button type='button' className="simple-btn" onClick={() => onClickEdit()} >Изменить</button>
            </div>  
        </>
    );
}

export default ViewChangePost;