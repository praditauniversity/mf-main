import React from "react";
import NavChips from "./Layouts/NavChips";
import NavBar from "./Layouts/Navbar";
import { SideBar } from "./Layouts/SideBar";
import Routing from "./Routes/Routing";
import CommandPalette from "./Components/CommandPalette";

const Main = () => {
  const islogin = localStorage.getItem('token') !== null;
  if (islogin) {
    return (
      <>
        <main className="">
          <div className="md:rounded-lg">
            <div className="flex h-screen border-8 border-white">
              <div className="bg-background relative rounded-lg flex h-full flex-1">
                <div className="hidden lg:flex">
                  <div className="flex-y-1 m-2">
                    <SideBar />
                  </div>
                </div>
                <div className="flex flex-1 flex-col lg:mr-2">
                  <NavBar />
                  <NavChips />
                  <div className="overflow-y-auto h-full py-2">
                    <Routing />
                    <CommandPalette />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="">
          <div className="md:rounded-lg">
            <div className="flex border-8 border-white">
              <div className="bg-background overflow-y-hidden relative rounded-lg flex h-full flex-1">
                <div className="flex flex-1 flex-col lg:mr-2">
                  <div className="overflow-y-hidden h-full">
                    <Routing />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  
}
export default Main;