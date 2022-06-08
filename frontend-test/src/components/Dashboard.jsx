import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context/Context";
import { IoChatbubbleOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import "../../src/assets/css/paginate.css";

export const Dashboard = () => {
  const { post } = useContext(Context);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(post.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(post.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, post]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % post.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <section className="pt-36 pb-32">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-xl mx-auto mb-16">
              <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl lg:text-2xl underline underline-offset-8 text-center pb-12">
                Post
              </h2>
              {post?.length > 0 ? (
                currentItems?.map((item) => (
                  <div key={item.id}>
                    <div className="w-80 lg:w-2/3 lg:mx-auto flex justify-items-start py-1">
                      <div className="author pr-4 text-1xl font-bold">
                        {item.userId}
                      </div>
                      <div className="title text-base">{item.title}</div>
                    </div>

                    <ul className="grid grid-cols-3 gap-4 place-items-end pb-7">
                      <li>
                        <Link
                          to={`#`}
                          className="text-1xl font-bold text-blue-400"
                        >
                          <IoChatbubbleOutline />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/detail/${item.id}`}
                          className="text-1xl font-bold text-blue-400"
                        >
                          Detail
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <div className="w-80 lg:w-2/3 lg:mx-auto text-center">
                  <p className="text-2xl ">Sorry No Post Here!</p>
                </div>
              )}
              {/* pagination */}
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
