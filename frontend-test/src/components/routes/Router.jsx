import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../auth/Login";
import { Branda } from "../Branda";
import { ContextProvider } from "../context/Context";
import { Dashboard } from "../Dashboard";
import { Detail } from "../Detail";
import { Navbar } from "../layout/Navbar";
import { Layout } from "../layout/Layout";
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
                  <Layout>
                    <Navbar />
                    <Branda />
                  </Layout>
                </>
              }
            />
            <Route
              path="login"
              element={
                <>
                  <Layout>
                    <Login />
                  </Layout>
                </>
              }
            />
            <Route
              path="dashboard"
              element={
                <>
                  <Layout>
                    <Navbar /> <Dashboard />
                  </Layout>
                </>
              }
            />
            <Route
              path="detail/:postId"
              element={
                <>
                  <Layout>
                    <Navbar /> <Detail />
                  </Layout>
                </>
              }
            />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
};
