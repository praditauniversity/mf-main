import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Dialog, Transition } from "@headlessui/react";
import DescTitle from '../../../Card/ProjectCharterCard/desctitle';
import Title from '../../../Card/ProjectCharterCard/title';
import List from '../../../Card/ProjectCharterCard/list';
import DescTitlePadding from '../../../Card/ProjectCharterCard/desctitlepadd';
import DescTitleBudget from '../../../Card/ProjectCharterCard/desctitlebudget';
import DescTitleBudgetPadding from '../../../Card/ProjectCharterCard/desctitlebudgetpadd';
import TitleMilestone from '../../../Card/ProjectCharterCard/titlemilestone';
import FetchCharter from '../../../../Middleware/Fetchers/FetchCharter';
import '../../../../Assets/svgbutton/svgbutton.css';
import { IconView } from '../../../Icons/icon';


const ViewModalCharter = (props) => {
    const { charterID, charterName, charterManager, charterClient, charterDesc, charterObj, charterTeam, charterStakeholder, charterParticipant, charterPlanned, charterActual, charterSymbol, charterResource, charterStart, charterEnd, charterRisk } = props;
    let { projectID } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconView/>
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={hideDialog}>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="py-16 w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 px-24 pb-8"
                                    >
                                        Project Charter
                                    </Dialog.Title>
                                    <div>
                                        <div>
                                            <div className="px-36">
                                                <div>
                                                    <div className="grid grid-cols-12 py-6 flex justify-between">
                                                        <div className="col-span-5">
                                                            <DescTitle title="Project Name" description={charterName} />
                                                        </div>
                                                        <div className="col-span-5">
                                                            <DescTitle title="Project Manager" description={charterManager} />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <DescTitle title="Client" description={charterClient} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-start">
                                                    <div>
                                                        <DescTitle title="Project Description" description={charterDesc} />
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-start">
                                                    <div>
                                                        <div><Title title="Project Objective" /></div>
                                                        <div>
                                                            {charterObj.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <List description={item ? item : "N/A"} />
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-5'>
                                                        <DescTitle title="Project Team Members" description={charterTeam} />
                                                    </div>
                                                    <div className='col-span-5'>
                                                        <DescTitlePadding title="Stakeholders" description={charterStakeholder} />
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-between">
                                                    <DescTitle title="Participants" description={charterParticipant} />
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-5'>
                                                        <DescTitleBudget title="Planned Budget" symbol={charterSymbol} description={charterPlanned} />
                                                    </div>
                                                    <div className='col-span-5'>
                                                        <DescTitleBudgetPadding title="Actual Budget" symbol={charterSymbol} description={charterActual} />
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-start">
                                                    <div>
                                                        <Title title="Resources" />
                                                        <div>
                                                            {charterResource.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <List description={item ? item : "N/A"} />
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <TitleMilestone title="Milestone" />
                                                    <div className="grid grid-cols-12 pb-6 flex justify-between">
                                                        <div className='col-span-5'>
                                                            <DescTitle title="Start Date" description={charterStart} />
                                                        </div>
                                                        <div className='col-span-5'>
                                                            <DescTitlePadding title="End Date" description={charterEnd} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-start">
                                                    <div>
                                                        <Title title="Potential Risks" />
                                                        <div>
                                                            {charterRisk.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <List description={item ? item : "N/A"} />
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </Dialog.Panel>
                            </Transition>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    );
};

export default ViewModalCharter;
