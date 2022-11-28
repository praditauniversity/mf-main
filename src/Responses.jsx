import React from "react"

const delayRedirect = (url, delay) => {
    const defaultDelay = 5000;
    const delayTime = delay || defaultDelay;
    setTimeout(() => {
        window.location.replace(url)
    }, delayTime)
}

const ResponseLabel = (label) => {
    return (
        <div className="py-4 mx-auto flex items-center justify-center space-x-4 h-screen">
            <p className="text-slate-700 font-medium text-sm uppercase tracking-widest md:text-xl" >
                {label} 
                {/* {delayRedirect("/")} */}
            </p>
        </div>
    )
}

const OnProgress = () => {
    return (
        <div>
            {ResponseLabel("On Progress.")}
        </div>
    )
}

const Unauthorized = () => {
    return (
        <div>
            {ResponseLabel("401 | Unauthorized to access this page.")}
        </div>

    )
}

const NotFound = () => {
    return (
        <div>
            {ResponseLabel("404 | Page not found.")}
        </div>
    )
}

const Maintenance = () => {
    return (
        <div>
            {ResponseLabel("503 | Maintenance.")}
        </div>
    )
}

const ServerError = () => {
    return (
        <div>
            {ResponseLabel("500 | Server Error.")}
        </div>
    )
}

const Responses = (responseNumber) => {
    const unauthorized = responseNumber === 401;
    const notfound = responseNumber === 404;
    const maintenance = responseNumber === 503;
    const servererror = responseNumber === 500;
    return (
        <div>
            {unauthorized ? <Unauthorized /> : null}
            {notfound ? <NotFound /> : null}
            {maintenance ? <Maintenance /> : null}
            {servererror ? <ServerError /> : null}
        </div>
    )
}


export default Responses;