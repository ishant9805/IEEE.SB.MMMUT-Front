import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaImages } from "react-icons/fa";

const galleryImages = [
  {
    image: "image1.JPG",
    title: "Glimps of Hackfest'23",
    description: "Winners getting prizes."
  },
  {
    image: "image2.JPG",
    title: "Glimps of Hackfest'23",
    description: "Students Participating in the event"
  },
  {
    image: "image3.JPG",
    title: "Glimps of Hackfest'23",
    description: "....."
  },
  {
    image: "image4.JPG",
    title: "Glimps of Hackfest'23",
    description: "......"
  },
  // Add more images
];

function SampleNextArrow({ onClick }) {
  return (
    <button
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-800 transition-all duration-300 z-10 shadow-xl flex items-center justify-center"
      onClick={onClick}
      style={{ width: '40px', height: '40px' }} // Adjust the size of the arrow
    >
      <FaChevronRight className="text-white text-xl" /> {/* Reduced icon size */}
    </button>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <button
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-800 transition-all duration-300 z-10 shadow-xl flex items-center justify-center"
      onClick={onClick}
      style={{ width: '40px', height: '40px' }} // Adjust the size of the arrow
    >
      <FaChevronLeft className="text-white text-xl" /> {/* Reduced icon size */}
    </button>
  );
}

const GalleryCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />, 
    prevArrow: <SamplePrevArrow />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <FaImages className="text-blue-600 text-4xl mr-3" />
        <h2 className="text-3xl font-bold text-blue-600">Photo Gallery</h2>
      </div>

      <Slider {...settings}>
        {galleryImages.map((item, index) => (
          <div key={index} className="relative flex flex-col md:flex-row items-center gap-6 p-6">
            {/* Image Section with Gradient Overlay */}
            <div className="relative w-full md:w-1/2 h-96 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-blue-600 mb-4">{item.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
              <div className="mt-4 text-base text-gray-500">{index + 1} / {galleryImages.length}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GalleryCarousel;