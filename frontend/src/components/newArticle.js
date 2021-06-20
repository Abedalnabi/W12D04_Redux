import React, { useContext, useState } from "react";
import { NewArticleContext } from "./../context/newArticle";

import { setArticle } from "./../reducer/articles";
import { useDispatch, useSelector } from "react-redux";

const NewArticle = () => {
  const disPatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const newArticleContext = useContext(NewArticleContext);

  const state = useSelector((state) => {
    return {
      article: state.articleReducer.article,
    };
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    newArticleContext.createNewArticle();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="article title here"
          onChange={(e) => newArticleContext.setTitle(e.target.value)}
        />
        <textarea
          placeholder="article description here"
          onChange={(e) => newArticleContext.setDescription(e.target.value)}
        ></textarea>
        <button>Create New Article</button>
      </form>

      {newArticleContext.message && <div>{newArticleContext.message}</div>}
    </>
  );
};

export default NewArticle;
