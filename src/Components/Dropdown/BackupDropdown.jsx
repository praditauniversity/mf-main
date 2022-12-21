    import React from 'react';
import FetchProject from '../../Middleware/Fetchers/FetchProject';

    const AlertOutsideClick = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        const ref = React.useRef(null);

        React.useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    alert('You clicked outside of me!');
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);

        return (
            <div ref={ref}>
                {isOpen && <div>Here I am!</div>}
                <button onClick={() => setIsOpen(!isOpen)}>Open/Close</button>
            </div>
        );
    };

    const Dropdown = ({label}) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const [search, setSearch] = React.useState("");
        const [filteredOptions, setFilteredOptions] = React.useState([]);
        const [data, setData] = React.useState([]);
        const parsedData = FetchProject();
        const options = parsedData;


        React.useEffect(() => {
            setFilteredOptions(
                options.filter((option) =>
                    option.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }, [search, options]);

        return (
            <div>
                {options && (
                    <div className="relative">
                        <div className="flex flex-col items-center">
                            <label className="text-gray-700 text-sm font-bold mb-2">
                                {label}
                            </label>
                            <div className="w-full">
                                <div className="relative">
                                    <span className="inline-block w-full rounded-md shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="relative w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-left cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                        >
                                            <span className="flex items-center">
                                                <span className="ml-3 block truncate">
                                                    {selected
                                                        ? selected.name
                                                        : "Select an option"}
                                                </span>
                                            </span>
                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </button>

                                    </span>
                                    {isOpen && (
                                        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                                            <ul
                                                tabIndex="-1"
                                                role="listbox"
                                                aria-labelledby="listbox-label"
                                                aria-activedescendant="listbox-item-3"
                                                className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                                            >
                                                <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="font-normal block truncate">
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                className="w-full px-2 py-1"
                                                                onChange={(e) =>
                                                                    setSearch(e.target.value)
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </li>
                                                {filteredOptions.map((option) => (
                                                    <li
                                                        key={option.id}
                                                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                                                        onClick={() => {
                                                            setSelected(option);
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <span className="font-normal block truncate">
                                                                {option.name}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

    }

    export default Dropdown;