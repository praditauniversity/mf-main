import React from "react"
import NavBar from "./Navbar";
import Pages from "./Pages";
import { SideBar } from "./components/SideBar";
import Chips from "./components/Chips";


const Main = () => {
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
                <nav className="items-center justify-between rounded-md mt-2 border-gray-100 hidden lg:flex">
                  <div className="flex-1 space-x-2 flex justify-between h-11 mb-2">
                    <Chips type="user" />
                    <Chips type="breadcrumbs" />
                    <Chips type="dashboard" />
                    <Chips type="date" />
                  </div>
                </nav>


                <div className="overflow-y-auto h-full no-scrollbar">
                  <Pages />
                </div>



              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Main;