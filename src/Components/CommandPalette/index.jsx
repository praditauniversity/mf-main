// create a command palette using tailwindcss and headlessui using combobox
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import FetchProject from '../../Middleware/Fetchers/FetchProject'

const CommandPalette = () => {
    const projects = FetchProject();
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const filteredOptions = query ?
        projects.filter((project) => project.name.toLowerCase().startsWith(query.toLowerCase())) :
        projects;

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === '/' && event.ctrlKey || event.metaKey) {
                setIsOpen(!isOpen)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => { window.removeEventListener('keydown', onKeyDown) }
    }, [isOpen])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={setIsOpen} className="fixed inset-0 z-10 overflow-y-auto pt-[25vh]" >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 transition-all" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Combobox
                        onChange={(project) => {
                            console.log(project.ID)
                            // window.location.href = `/#/projects/${project.ID}`
                            window.location.href = `/#/projectdashboard`
                        }}
                        as="div"
                        className='relative mx-auto max-w-xl rounded-md shadow-md ring-1 ring-dark/5 bg-white z-10'
                    >
                        <div className='flex items-center px-4'>
                            <FontAwesomeIcon icon={faSearch} />
                            <Combobox.Input
                                onChange={(event) => {
                                    setQuery(event.target.value)
                                }}
                                className="w-full px-4 py-4 text-sm text-gray-900 placeholder-gray-500 border-none rounded-md focus:ring-0 focus:outline-none"
                                placeholder='Search for a command'
                            />
                        </div>

                        {filteredOptions.length > 0 && (
                            <Combobox.Options static className='max-h-60 overflow-y-auto bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-8 border-transparent' >
                                {filteredOptions.map((project) => (
                                    <Combobox.Option key={project.ID} value={project}>
                                        <div key={project.ID} className='px-4 py-4 text-sm text-gray-900 hover:bg-primary-dark ui-active:bg-primary-dark ui-active:text-white w-full rounded-md' >
                                            {project.name}: <span className='text-typo-dark/70 ui-active:text-white/70'>{project.description}</span>
                                        </div>
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}
                        {filteredOptions.length === 0 && (
                            <p className='text-sm p-4 text-gray-600'>
                                No results found
                            </p>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition>

    )
}

export default CommandPalette;