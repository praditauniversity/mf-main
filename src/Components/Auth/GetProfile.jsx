import useLocalStorage from '../../Middleware/useLocalStorage';

const GetProfile = () => {
    const [profile, setProfile] = useLocalStorage('profile', null);
    return profile;
}

export default GetProfile;