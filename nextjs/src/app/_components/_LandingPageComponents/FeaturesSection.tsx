// components/FeaturesSection.js
import React from 'react';
import Image from 'next/image';
import Ficon1 from '/public/Ficon1.svg';
import Ficon2 from '/public/Ficon2.svg';


const FeaturesSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-screen	">
      {/* Left Column */}
      <div className="flex flex-col justify-center text-left  mr-10 ml-40 ">
        <h2 className="text-4xl  font-bold mb-4">Discover Best savory</h2>
        <p className="text-black">
        Embark on a savory journey, exploring rich and robust flavors in every bite. From traditional classics to global cuisines, discover the best in savory delights. Indulge your taste buds with carefully crafted dishes, each bite a symphony of culinary excellence. Uncover the secrets of savory perfection and savor the extraordinary in every culinary adventure
        </p>
        <Image
          src={Ficon2} 
          alt="Yummy!"
          width={500}
          height={200}
          className="mb-4 mt-5"
        />
        <div>
<a href="/products  ">
              <button className=" bg-yellow-400 text-black font-bold py-2 px-5 mt-5 rounded-lg font-bold ">
                Explore Savory Delights Now
              </button>
            </a>
        </div>
        
      </div>

      {/* Right Column */}
      <div className="hidden md:block p-6 ml-20 mt-20	h-screen">
        <Image
          src={"Ficon1.svg"} // Replace with your image path
          alt="Yummy!"
          width={350}
          height={200}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
