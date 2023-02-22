import React, { Fragment, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import '../../../../Assets/svgbutton/svgbutton.css'
import { IconDelete, IconSaveForm } from '../../../Icons/icon';
import { GET_DAILY_REPORT_DATA_BY_PROJECT_ID } from '../../../GraphQL/Queries';
import Snackbar from '../../../Snackbar/Snackbar';
import ReactDOM from "react-dom";

const DELETE_DAILYREPORT = gql`
  mutation DeleteDailyReport($id: String!) {
    deleteDailyReport(id: $id) 
  }`;

const DeleteModalReport = (props) => {
    const { reportID, reportName, page, limit, sort, total, updateTotal, dropCurrentPage, totalPages, setDataEmpty } = props;
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const [isAppear, setIsAppear] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [deleteReport, { data , error }] = useMutation(DELETE_DAILYREPORT, {
        refetchQueries: [
            {
                query: GET_DAILY_REPORT_DATA_BY_PROJECT_ID,
                variables: { projectId: String(localStorage.getItem('reportProjectID')), page: String(page), limit: String(limit), sort: String(sort) }
            },
        ],
        awaitRefetchQueries: true, // Wait for refetchQueries to complete before returning from useMutation
        onCompleted: () => { console.log("Delete Success, Remaining Data:", total) }
    }
    );

    const handleDelete = (e) => {
        e.preventDefault();

        deleteReport({
            variables: {
                id: String(reportID),
            },
        });

        if (error) {
            console.log(JSON.stringify(error, null, 2));
        }

        updateTotal();

        if (total % limit === 1 && page === totalPages && page !== 1) {
            dropCurrentPage(page - 1);
        }

        // if (total % limit === 1 && page === 1) {
        //     setDataEmpty();
        // }

        //to show toast when sucesss delete report
        // var x = document.getElementById("snackbardel");
        // x.className = "show";
        // setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        // Display snackbar with success message
        setIsAppear(true);
        setSnackbarMessage('Daily Report deleted successfully!');

        hideDialog();
    };

    return (

        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconDelete />
                </button>
                {/* <div id="snackbardel">Daily report deleted successfully</div> */}
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={hideDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="px-24 py-16 w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6"
                                    >
                                        Delete Report
                                    </Dialog.Title>
                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl text-center">
                                            <p className="label-text">Are you sure?</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl text-center item-center">
                                            <p className="label-text">Delete Daily Report: <span className="label-text font-bold text-error">{reportName}</span></p>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <div className='flex justify-between px-56'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-grey px-4 py-2 text-sm font-medium text-primary hover:bg-grey-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={hideDialog}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>Cancel</p>
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-error px-4 py-2 text-sm font-medium text-primary hover:bg-error-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                value={reportID}
                                                onClick={handleDelete}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>Delete</p>
                                            </button>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {isAppear ? <Snackbar message={snackbarMessage} onClose={() => setIsAppear(false)} /> : null}
        </>
    )
}
export default DeleteModalReport;
