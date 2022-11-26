import React from "react"

const Unauthorized = () => {
    return (
        <div>
            <div className="py-4 mx-auto flex items-center justify-center space-x-4 h-screen">
                <p className="text-slate-800 font-medium text-sm uppercase tracking-widest md:text-xl" >
                    401 | Unauthorized to access this page.
                </p>
            </div>
        </div>
    )
}

const NotFound = () => {
    return (
        <div>
            <div className="py-4 mx-auto flex items-center justify-center space-x-4 h-screen">
                <p className="text-slate-800 font-medium text-sm uppercase tracking-widest md:text-xl" >
                    404 | Page Not Found.
                </p>
            </div>
        </div>
    )
}


function Responses(responseNumber) {
    const unauthorized = responseNumber === 401;
    const notfound = responseNumber === 404;
    return (
        <div>
            {unauthorized ? <Unauthorized /> : <p>unknown</p>}
            {notfound ? <NotFound /> : <p>unknown</p>}
        </div>
    )
}


export default Responses;