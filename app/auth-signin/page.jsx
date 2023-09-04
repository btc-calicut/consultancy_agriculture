"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

// This config is only required for antd and not related to project.
import { ConfigProvider } from "antd";
import theme from "@theme/themeConfig";

const AuthSigninPage = () => {
  const isUserLoggedIn = true;

  return (
    <ConfigProvider theme={theme}>
      <section className="w-full">
        {isUserLoggedIn ? (
          <div>
            <h1>LoggedIn</h1>
            <button></button>
          </div>
        ) : (
          <div>
            <h1>not logged</h1>
          </div>
        )}
      </section>
    </ConfigProvider>
  );
};

export default AuthSigninPage;
