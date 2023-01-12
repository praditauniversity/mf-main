import useLocalStorage from "../../../../Middleware/useLocalStorage";

const GetProjectName = () => {
    const [pName, setPName] = useLocalStorage('profile', null);
    return pName;
}

export default GetProjectName;