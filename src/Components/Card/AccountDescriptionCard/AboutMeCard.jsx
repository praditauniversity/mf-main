import React from "react";
import GetProfile from "../../Auth/GetProfile";
import { IconEdit } from "../../Icons/icon";

const AboutMeCard = () => {
    const profile = GetProfile();
    const aboutMe = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        description: "Valeria Reina is a software developer with several years of experience in the field. She has a strong background in various programming languages such as Java, Python, and JavaScript. Reina has worked on several projects throughout her career, including developing web applications and contributing to open-source software. She is also proficient in Agile development methodologies and has experience with version control systems like Git. In addition to her technical skills, Reina is also a strong collaborator and is known for her ability to work well in a team environment.",
        gender: profile.gender,
        birthday: "November 12,1998",
        zip_code: "11045",
        phone_number: profile.phone_number,
        email: profile.email,
        website: "http://example.com/profile",
    }

    const aboutMeList = [
        { label: "Full Name", value: aboutMe.first_name + " " + aboutMe.last_name, },
        { label: "Gender", value: aboutMe.gender, },
        { label: "Birthday", value: aboutMe.birthday, },
        { label: "Zip Code", value: aboutMe.zip_code, },
        { label: "Phone Number", value: aboutMe.phone_number, },
        { label: "Email", value: aboutMe.email, },
        { label: "Website", value: aboutMe.website, },
    ]
    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">About Me</p>
                    <button><IconEdit /></button>
                </div>
            </div>

            <div className="py-5">
                <div className="py-1">
                    <p className="text-base font-semibold">Description</p>
                </div>
                <div className="">
                    <p className="text-sm italic text-typo-dark opacity-80">
                        {aboutMe.description}
                    </p>
                </div>
            </div>

            <div className="py-5">
                <div className="py-1">
                    <p className="text-base font-semibold">Personal Details</p>
                </div>
                <div className="grid grid-cols-18">
                    <div className="col-span-18">


                        {aboutMeList.map((item, index) => (
                            <div className="grid grid-cols-16 py-1" key={index}>
                                <div className="xl:col-span-4 col-span-8">
                                    <p className="text-sm text-typo-dark opacity-80">{item.label}</p>
                                </div>
                                <div className="xl:col-span-12 col-span-8">
                                    <p className="text-sm text-typo-dark">{item.value}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutMeCard;