import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const dummyReviews = [
    {
      _id: "1",
      name: "John Doe",
      text: "Gimox helped me transform my fitness journey. The trainers are top-notch and the classes are fun!",
      avatar: "https://i.pravatar.cc/100?img=3",
      role: "Member",
    },
    {
      _id: "2",
      name: "Emily Johnson",
      text: "I love the energy here. The group classes are always exciting, and I’ve made so many new friends.",
      avatar: "https://i.pravatar.cc/100?img=5",
      role: "Yoga Enthusiast",
    },
    {
      _id: "3",
      name: "David Smith",
      text: "Great equipment, flexible timing, and amazing coaches. Highly recommend Gimox for anyone!",
      avatar: "https://i.pravatar.cc/100?img=8",
      role: "Weight Trainer",
    },
    {
      _id: "4",
      name: "Samantha Lee",
      text: "I’ve never felt more motivated. The environment here makes me want to come back every day.",
      avatar: "https://i.pravatar.cc/100?img=10",
      role: "CrossFit Member",
    },
    {
      _id: "5",
      name: "Carlos Martinez",
      text: "Whether it's cardio or strength training, Gimox offers the best fitness programs out there.",
      avatar: "https://i.pravatar.cc/100?img=20",
      role: "Fitness Addict",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-12">
          What Our Members Say
        </h2>
        <Slider {...settings}>
          {dummyReviews.map((review) => (
            <div key={review._id} className="px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
                <p className="text-gray-700 italic flex-grow">
                  “{review.text}”
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow = ({ className, onClick }) => (
  <div
    className={`${className} text-blue-600 hover:text-blue-800`}
    onClick={onClick}
  />
);

const PrevArrow = ({ className, onClick }) => (
  <div
    className={`${className} text-blue-600 hover:text-blue-800`}
    onClick={onClick}
  />
);

export default Testimonials;
