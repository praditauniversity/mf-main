import { GET_PHASE_DATA } from "../../Components/GraphQL/Queries";

const FetchProjectPhase = () => {
    const {data, loading, error} = useQuery(GET_PHASE_DATA, {
        pollInterval: 1000,
    });
    const [projectPhase, setProjectPhase] = useState([]);

    useEffect(() => {
        if (data) {
            setProjectPhase(data.projectPhase.Data);
        } else {
            
        }
    }, [data]);
    return projectPhase;
}

export default FetchProjectPhase;