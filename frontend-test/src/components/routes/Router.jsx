import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../auth/Login";
import { Branda } from "../Branda";
import { ContextProvider } from "../context/Context";
import { Dashboard } from "../Dashboard";
import { Detail } from "../Detail";
import { Navbar } from "../layout/Navbar";
export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Branda />
                </>
              }
            />
            <Route
              path="login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="dashboard"
              element={
                <>
                  <Navbar /> <Dashboard />
                </>
              }
            />
            <Route
              path="detail/:postId"
              element={
                <>
                  <Navbar /> <Detail />
                </>
              }
            />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
};
