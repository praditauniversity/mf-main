import React from "react";
import { IconEdit } from "../../Icons/icon";

const AboutMeCard = () => {
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
                    <p className="text-sm">
                        Hello, I’m Valeria Reina a Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at. Morbid accusant ipsum. Nam nec tellus at.
                    </p>
                </div>
            </div>

            <div className="py-5">
                <div className="py-1">
                    <p className="text-base font-semibold">Personal Details</p>
                </div>
                <div className="grid grid-cols-18">
                    <div className="col-span-18">

                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Full Name</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm">Valeria Reina</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Gender</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm">Female</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Birthday</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm">November 12,1998</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Zip Code</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm">11045</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Phone</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm font-semibold">+68 123456789</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Email</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm">valeriareina@gmail.com</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-1">
                            <div className="col-span-3">
                                <p className="text-sm opacity-70">Website</p>
                            </div>
                            <div className="col-span-12">
                                <p className="text-sm">http://example.com/profile</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutMeCard;