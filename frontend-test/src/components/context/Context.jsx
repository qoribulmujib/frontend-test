import axios from "axios";
import jsCookie from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [toggle, setToggle] = useState(true);
  const [offset, setOffset] = useState(null);
  const [temp, setTemp] = useState(0);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [post, setPost] = useState([]);
  const [detail, setDetail] = useState({});
  const [length, setlength] = useState(0);
  const [click, setClick] = useState(false);
  const [comment, setComment] = useState([]);
  let navigate = useNavigate();

  const functionLogin = () => {
    let tempLogin = {
      username: input.username,
      password: input.password,
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, tempLogin)
      .then((response) => {
        let { username, password, id } = response.data;
        jsCookie.set("username", username);
        jsCookie.set("password", password);
        jsCookie.set("id", id);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getAllContent = async () => {
      let result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      let tempContent = result.data.map((item) => {
        return {
          body: item.body,
          id: item.id,
          title: item.title,
          userId: item.userId,
        };
      });
      setPost(tempContent);
    };
    getAllContent();
  }, [setPost]);
  let functions = {
    functionLogin,
  };
  return (
    <Context.Provider
      value={{
        toggle,
        setToggle,
        offset,
        setOffset,
        temp,
        setTemp,
        input,
        setInput,
        functions,
        error,
        setError,
        post,
        setPost,
        detail,
        setDetail,
        length,
        setlength,
        click,
        setClick,
        comment,
        setComment,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
