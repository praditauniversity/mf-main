import React from 'react';
import UserLists from './UserLists';
import RoleLists from './RoleLists';

const Tabs = ({color}) => {
    const [openTab, setOpenTab] = React.useState(1);

    return (
        <>
          <div className="flex flex-wrap">
              <ul className="flex flex-row border-b-2 w-full" role="tablist">
                <li className= {"mr-2 last:mr-0 text-center pb-2 sm:pt-3 "}>
                <a
                    className={
                      "text-lg font-bold px-5 py-3 rounded-t leading-normal hover:text-primary hover:bg-primary-light transition ease-out duration-300 " +
                      (openTab === 1
                        ? "text-" + color + " bg-primary-light " 
                        : "text-" + color + "-600")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Users List
                  </a>
                </li>
                
                <li className= {" mr-2 last:mr-0 text-center pb-2 sm:pt-3 "}>
                  <a
                    className={
                      "text-lg font-bold px-5 py-3 rounded-t leading-normal hover:text-primary transition ease-out duration-300 " +
                      (openTab === 2
                        ? "text-" + color + " bg-primary-light " 
                        : "text-" + color + "-600")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                     Roles List
                  </a>
                </li>
              </ul>
    
              <div className="flex flex-col min-w-0 break-words bg-white w-full rounded">
                <div className="px-4 py-3 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                        <UserLists />
                    </div>
    
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        <RoleLists/>
                    </div>
    
                  </div>
                </div>
              </div>
          </div>
        </>
      );

}

export default Tabs;