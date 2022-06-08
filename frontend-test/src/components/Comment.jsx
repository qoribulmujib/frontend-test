import axios from "axios";
import React, { useContext, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { Context } from "./context/Context";
import { IoChatbubbleOutline } from "react-icons/io5";
export const Comment = () => {
  const {
    detail,
    setDetail,
    setlength,
    length,
    click,
    setClick,
    comment,
    setComment,
  } = useContext(Context);
  let { postId } = useParams();
  useEffect(() => {
    const getDetailPost = async () => {
      let result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );

      let tempDetail = result.data;
      setDetail(tempDetail);
    };
    const getLengthComment = async () => {
      let result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      let tempComment = result.data.map((item) => {
        return {
          body: item.body,
          email: item.email,
          id: item.id,
          name: item.name,
          postId: item.postId,
        };
      });
      setComment(tempComment);
      setlength(result.data.length);
    };
    getDetailPost();
    getLengthComment();
  }, [setDetail, postId, setlength, setComment]);
  const handleClick = () => {
    return setClick(!click);
  };
  return (
    <>
      {console.log(comment)}
      <section className="pt-36 pb-32">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-xl mx-auto mb-16">
              <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-2xl underline underline-offset-8 text-center pb-12">
                Post
              </h2>

              <div className="w-80 lg:w-2/3 ml-24 pb-5">
                <Link to="/dashboard">
                  <IoArrowBackSharp />
                </Link>
              </div>
              {length > 0 ? (
                <div>
                  <div className="w-80 lg:w-2/3 lg:mx-auto flex justify-items-start py-1">
                    <div className="author pr-4 text-1xl font-bold py-24">
                      {detail.userId}
                    </div>
                    <div className="title text-base">
                      <p className="text-base font-semibold">{detail.title}</p>
                      <br />
                      <p className="text-base py-5">{detail.body}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-3 gap-4 place-items-end pb-7">
                    {click === false ? (
                      <li>
                        <Link
                          to={`#`}
                          className="text-1xl font-bold text-blue-400 "
                          onClick={handleClick}
                        >
                          <IoChatbubbleOutline className="inline-block" />{" "}
                          {length}
                        </Link>
                      </li>
                    ) : (
                      <li className="text-base font-bold">All Comment</li>
                    )}
                  </ul>
                  {click === true
                    ? comment.map((element, idx) => (
                        <div
                          className="w-80 lg:w-2/3 lg:mx-auto flex justify-items-start py-1"
                          key={idx}
                        >
                          <div className="author pr-4 text-1xl font-bold py-5 px-14">
                            {element.name}
                          </div>
                          <div className="title text-base">
                            <p className="text-base py-5">{element.body}</p>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              ) : (
                <div className="w-80 lg:w-2/3 lg:mx-auto text-center italic">
                  Please wait...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
