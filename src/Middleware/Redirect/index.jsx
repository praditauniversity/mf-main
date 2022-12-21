const delayRedirect = (url, delay) => {
    const defaultDelay = 5000;
    const delayTime = delay || defaultDelay;
    setTimeout(() => {
        window.location.replace(url)
    }, delayTime)
}