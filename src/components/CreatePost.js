import react, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function CreatePost() {

    let navigate = useNavigate();
    const [text, setText] = useState('');

    const onChangeTextarea = (e) => {
        setText(e.target.value)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
    
        await fetch('http://localhost:7070/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: Date.now(),
            content: text
          })
        })

        navigate('/');
    }

    return (
            <>
                <form id="create-form" className="create-form" onSubmit={(e) => onSubmitForm(e)}>
                    <textarea
                        className="create-post-textarea"
                        value={text}
                        onChange={(e) => onChangeTextarea(e)}
                        required
                    />
                </form>
                <div className="after-form">
                    <button form="create-form" className="simple-btn">
                        Опубликовать
                    </button>
                </div>
            </> 
    );

}

export default CreatePost;