import { useState } from "react";

function DropdownTest({ selected, setSelected }) {
    const [isActive, setIsActive] = useState(false);
    const list = ["Today", "Last Month", "Angular"];

    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) =>
                setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {list.map((option) =>(
                        <div
                            onClick={(e) => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className="dropdown-item"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropdownTest;