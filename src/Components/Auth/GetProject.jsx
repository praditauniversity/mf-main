import useLocalStorage from '../../Middleware/useLocalStorage';

const GetProject = () => {
    const [project, setProject] = useLocalStorage('projectID');
    return project;
}

export default GetProject;