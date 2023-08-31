import { Inter } from "next/font/google";
import { ReactNode } from "react";

import AuthContext from "@/app/context/AuthContext";
import { NavBar } from "@/app/components";

import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpenTable",
};

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={"bg-gray-100 min-h-screen w-screen"}>
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
