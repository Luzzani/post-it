import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./AddTask.css";

const isEmpty = (value) => value.trim() === "";

function AddTask() {
  const [isValid, setIsValid] = useState(true);
  const [posts, setPosts] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [isChecked, setIsCheked] = useState(false);
  const [id, setId] = useState(0)
  
  const enteredDescriptionIsValid = !isEmpty(inputDescription);

  const onChangeHandleDescription =(e)=>{
    setInputDescription(e.target.value)
    if (enteredDescriptionIsValid) {
      setIsValid(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newPost = {
      title: inputTitle,
      description: inputDescription,
      check: isChecked,
      id: id
    };
    
    
    if (!enteredDescriptionIsValid) {
      setIsValid(false)
      return;
    }
      setPosts([newPost, ...posts]);
      setInputDescription("");
      setInputTitle("");
      setIsCheked(false)
      setId(id + 1)
  };
  
  const removePost =(id)=>{
    const newListPost = posts.filter((post)=>{return post.id !== id})    
    setPosts(newListPost)
  }
  
  useEffect(() => {
    const prevPost = JSON.parse(localStorage.getItem("posts"));
    if (prevPost) {
      if (prevPost.length === 0) {
        return;
      }else {
        setPosts(prevPost);
        setId(prevPost[0].id + 1)
      }
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <>
      <form className="input__container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Titulo"
        />
        <input
          className={isValid ? '' : 'invalid'}
          type="text"
          value={inputDescription}
          onChange={onChangeHandleDescription}
          placeholder="Descripción"
        />
        {!isValid ? <small className="input__warning">Debe agregar una descripcion</small> : <></>}
        <label htmlFor="checkbox">Importante!</label>
        <input
        checked={isChecked}
          type="checkbox"
          id="checkbox"
          onChange={() => setIsCheked(!isChecked)}
        />
        <button type="submit">AGREGAR</button>
      </form>
      <Post post={posts} handleRemove={removePost}/>
    </>
  );
}

export default AddTask;
