import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser,FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import members from "./SecondYear.json"

const MemberCard = () => {
    
    const settings = {
        className: "center",
        arrow:true,
        // centerMode: true,
        centerPadding: "30px",
        slidesToShow: 4,
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase:"linear",
        // dots:true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: "30px",
                }
            },
            {
                breakpoint: 900,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: "30px",
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "30px",
                }
            }
        ]
    };

    // Sample members data - replace with actual data in production

    return (
        <div className="slider-container py-10 px-4">
             <style jsx="true">{`
                .slick-slide {
                    transform: scale(0.85);
                    transition: transform 0.3s ease;
                }
                
                .slick-center {
                    transform: scale(1);
                }
                
                .slick-slide > div {
                    margin: 0 8px;
                }
                
                .slick-dots li button:before {
                    color: #00629B;
                }
                
                .slick-dots li.slick-active button:before {
                    color: #BA0C2F;
                }
            `}</style> 
            <Slider {...settings}>
                {members.map(member => (
                    <div key={member.id} className='mx-[40px]'>
                        <div className="bg-transparent rounded-lg  overflow-hidden hover:shadow-xl hover:scale-110 transition-all duration-300 max-w-[320px]  h-full mx-auto">
                            <div className="relative mt-3 h-64 overflow-hidden  rounded-t-lg">
                                <img
                                    src={member.image}
                                    alt={member.Name}
                                    className="w-[260px] m-auto h-full object-cover transform  transition-transform duration-500 rounded-full border-2 border-ieee-blue"
                                />
                                <div className="absolute inset-0  from-black/60 to-transparent"></div>
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-2xl font-bold mb-3 mt-1 text-gray-700">{member.Name}</h3>
                                <p className="text-lg font-bold  text-ieee-blue ">{member.Branch} ({member.Year})</p>
                                <p className="text-sm font-bold text-gray-500">Executive Member</p>
                                <div className="mt-3 flex space-x-4 justify-center">
                                    <a href={`mailto:${member.email}`} className="text-ieee-blue hover:text-ieee-red transition-colors rounded-full border-2 p-1.5 border-ieee-blue hover:border-ieee-red">
                                        <FaEnvelope className="w-5 h-5" />
                                    </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-ieee-blue hover:text-ieee-red transition-colors rounded-full border-2 p-1.5 border-ieee-blue hover:border-ieee-red">
                                        <FaLinkedinIn className="w-5 h-5" />
                                    </a>
                                    <a href={member.Membership_ID} target="_blank" rel="noopener noreferrer" className="text-ieee-blue hover:text-ieee-red transition-colors rounded-full border-2 p-1.5 border-ieee-blue hover:border-ieee-red">
                                        <FaUser className="w-5 h-5" /> 
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default MemberCard