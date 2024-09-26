import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from "axios";

function Phonedata() {
    const [phone, setPhone] = useState([]);

    useEffect(() => {
        const getPhone = async () => {
            try {
                const res = await axios.get("http://localhost:4001/phone");

                const data = res.data.filter((data) => data.category === "Apple");
                console.log(data);
                setPhone(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPhone();
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div>
                    <h1 className="font-semibold text-xl pb-2">Available Phones</h1>
                    <p>
                        Browse through our collection of Apple phones below.
                    </p>
                </div>

                <div>
                    <Slider {...settings}>
                        {phone.map((item) => (
                            <Cards item={item} key={item._id} /> 
                                                    ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default Phonedata;
