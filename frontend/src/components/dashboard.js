import React, { useState, useEffect } from "react";
import axios from "axios";
import { setArticle, createArticle, deleteArticle, updateArticle } from "../reducer/article/index";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const state = useSelector((state) => {
    return {
      login: state.loginReducer.token,
      article: state.articleReducer.article,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:5000/articles").then((result) => {
      dispatch(setArticle(result.data));
    });
    const user = jwt.decode(state.token);
    if (user) {
      setUserId(user.userId);
    }
  }, []);

  const addaricle = () => {
    console.log({ title, description, userId });
    axios
      .post("http://localhost:5000/articles", {
        title,
        description,
        author: userId,
      })
      .then((result) => {
        dispatch(createArticle(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const allArticle = state.article.map((element, index) => {
    return (
      <div className="allArticlesCH">
        <div className="articlesTitle">
          <h2>{element.title}</h2>
          <p>{element.description}</p>
          <button>more info</button>
          {userId == element.author ? (
            <button
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/articles/${element._id}`)
                  .then((result) => {})
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <p>Dashboard</p>
      <div>{allArticle}</div>
      <input
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <div
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></div>
      <button onClick={addaricle}>add new article</button>
    </div>
  );
}
