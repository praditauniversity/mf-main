import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const TestingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }
    return (
        // <div><Transition appear show={true} as={Fragment}>
        //     <Dialog as="div" className="relative z-10" onClose={hideDialog}>
        //         <Transition.Child
        //             as={Fragment}
        //             enter="ease-out duration-300"
        //             enterFrom="opacity-0"
        //             enterTo="opacity-100"
        //             leave="ease-in duration-200"
        //             leaveFrom="opacity-100"
        //             leaveTo="opacity-0"
        //         >
        //             <div className="fixed inset-0 bg-black bg-opacity-25" />
        //         </Transition.Child>

        //         <div className="fixed inset-0 overflow-y-auto">
        //             <div className="flex min-h-full items-center justify-center p-4 text-center">
        //                 <Transition.Child
        //                     as={Fragment}
        //                     enter="ease-out duration-300"
        //                     enterFrom="opacity-0 scale-95"
        //                     enterTo="opacity-100 scale-100"
        //                     leave="ease-in duration-200"
        //                     leaveFrom="opacity-100 scale-100"
        //                     leaveTo="opacity-0 scale-95"
        //                 >
        //                     <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        //                         <Dialog.Title
        //                             as="h3"
        //                             className="text-lg font-bold leading-6"
        //                         >
        //                             Activity Form
        //                         </Dialog.Title>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">parent_id</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter parent id" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">gantt_id</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter gantt id" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">Activity name</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter name" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">Description</span>
        //                                 </label>
        //                                 <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Enter a description"></textarea>
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">start_time</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter start time" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">end_time</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter end time" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">user_id</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter user id" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">weight_percentage</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter weight percentage" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">progress_percentage</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter progress percentage" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">priority</span>
        //                                 </label>
        //                                 <input type="text" placeholder="Enter priority" className="input input-bordered w-full" />
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <div className='grid grid-cols-18 gap-5 pb-2'>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <span className="label-text">cost_plan</span>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter cost plan" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <span className="label-text">cost_actual</span>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter cost actual" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <div className='grid grid-cols-18 gap-5 pb-2'>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <p className='text-base font-medium'>material_cost_plan</p>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter material cost plan" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <p className='text-base font-medium'>material_cost_actual</p>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter material cost actual" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <div className='grid grid-cols-18 gap-5 pb-2'>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <p className='text-base font-medium'>total_cost_plan</p>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter total_cost_plan" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <p className='text-base font-medium'>total_cost_actual</p>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter total_cost_actual" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <div className='grid grid-cols-18 gap-5 pb-2'>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <p className='text-base font-medium'>human_cost_plan</p>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter human_cost_plan" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                     <div className='col-span-9'>
        //                                         <label className="label">
        //                                             <p className='text-base font-medium'>human_cost_actual</p>
        //                                         </label>
        //                                         <div className='pb-2'>
        //                                             <input type="text" placeholder="Enter human_cost_actual" className="input input-bordered w-full" />
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">type_id</span>
        //                                 </label>
        //                                 <div className='pb-2'>
        //                                     <input type="text" placeholder="Enter type id" className="input input-bordered w-full" />
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="mt-3">
        //                             <div className="form-control w-full max-w-5xl">
        //                                 <label className="label">
        //                                     <span className="label-text">phase_id</span>
        //                                 </label>
        //                                 <div className='pb-2'>
        //                                     <input type="text" placeholder="Enter phase id" className="input input-bordered w-full" />
        //                                 </div>
        //                             </div>
        //                         </div>

        //                         <div className="mt-4">
        //                             <button
        //                                 type="button"
        //                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        //                                 onClick={hideDialog}
        //                             >
        //                                 Save
        //                             </button>
        //                         </div>
        //                     </Dialog.Panel>
        //                 </Transition.Child>
        //             </div>
        //         </div>
        //     </Dialog>
        // </Transition></div>


        <div class="dhx_cal_ltext px-4">
            <Dialog as="div" class="relative m-0 p-0" onClose={hideDialog} open={true}>
                <div class="overflow-y-auto overflow-x-auto w-full">
                    <div class="w-80 p-4">
                        <Dialog.Panel class="border-solid border-2 py-1 px-2 w-full">
                            <Dialog.Title as="h3" class="text-lg font-bold leading-6">
                                Project Charter
                            </Dialog.Title>
                            <div class="mt-3">
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text">Project Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter project name" class="editor_project input input-bordered w-full" />
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text">Project Manager</span>
                                    </label>
                                    <input type="text" placeholder="Enter your name" class="editor_description input input-bordered w-full" />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
