import react, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { IoAtOutline } from "react-icons/io5";
import TimeFormat from './TimeFormat';

function ListPosts() {

    const url = 'http://localhost:7070/posts';
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const update = async () => {
            try {
                const response = await fetch(url, {method: 'GET'});
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setPosts(data);
                console.log(data);
            } catch (e) {
                throw new Error(e);
            }
        };

        update();

    }, []);

    if (posts == null) {
        return (
            <div className="post">
                <p>Loading...</p>
            </div>
        )
    };

    if (!posts.length) {
        return (
            <div className="post">
                <p>Empty</p>
            </div>
        )
    };

    return (
        posts.reverse().map(({id, content, created}) => (
            <div key={id} className="post">
                <div className="user">
                    <div className="user-img"></div>
                    <div className="user-info">
                        <h2 className="user-name">{id}</h2>
                        <div className="user-status">
                            <h3 className="user-status-h3">Основатель группы</h3>
                            <IoAtOutline className="user-status-del"/>
                            <h3 className="user-status-h3"><TimeFormat time={created} /></h3>
                        </div>
                    </div>
                </div>
                <Link className="text-content" to={`/posts/${id}`}>
                    <p className="text-content-p">{content}</p>
                </Link>
            </div>
        ))
    );
}

export default ListPosts;