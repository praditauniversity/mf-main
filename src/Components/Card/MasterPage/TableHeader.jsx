import React, { useEffect } from "react";
import ChevronLeft from "../../../Assets/Icons/svg/ChevronLeft.svg";
import ChevronRight from "../../../Assets/Icons/svg/Chevron.svg";
import { IconFilter, IconSearch } from "../../Icons/icon";
import Button from "../../Button";
import AddModalRoleList from "../../Modal/MasterPageModal/AddModal/AddModalRoleList";
import AddModalUserList from "../../Modal/MasterPageModal/AddModal/AddModalUserList";

const TableHeader = (props) => {
  const {placeholder, modalname} = props;

  return (
    <div className="flex justify-between py-[12px] px-[20px] align-center">
      <div className="flex align-center">
          <div className="content-end items-end text-right">
              <div className="flex justify-end align-middle items-center text-center">
                  {/* <Input > */}
                  {/* <InputField /> */}
                  {/* {var iconaaa = <IconSearch />} */}
                  <input
                      className="form-control shadow appearance-none border rounded py-3 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder={placeholder}
                  />
              </div>
          </div>

        <button 
          className="hover:bg-primary-light border border-primary font-bold text-primary px-4 rounded-lg flex items-center mx-3 transition duration-300 ease-in-out" 
        >
          <IconFilter />
          <div className="ml-2">FILTERS</div>
          
        </button>
      </div>

      {modalname === "Role Modal" ? (
        <AddModalRoleList />
      ) : modalname === "User Modal" ? (
        <AddModalUserList />
      ) : null}
    </div>
  )
}

export default TableHeader;