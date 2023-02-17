import { GET_PHASE_DATA } from "../../Components/GraphQL/Queries";

const FetchProjectPhase = () => {
    const {data, loading, error} = useQuery(GET_PHASE_DATA, {
        pollInterval: 1000,
    });
    const [projectPhase, setProjectPhase] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("ProjectPhase's Ready to Fetch");
            setProjectPhase(data.projectPhase.Data);
        } else {
            console.log("No data ProjectPhase");
        }
    }, [data]);
    return projectPhase;
}

export default FetchProjectPhase;