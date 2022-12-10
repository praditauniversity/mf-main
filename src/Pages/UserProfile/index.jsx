//create a user profile page
import React from 'react';
import GetProfile from '../../Components/Auth/GetProfile';
import UserCard from '../../Components/Card/UserCard';

const UserProfile = () => {
    //get profile from local storage
    const profile = GetProfile();
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row">
            <UserCard />
                </div>
            </div>
        </>
    );
}

export default UserProfile;