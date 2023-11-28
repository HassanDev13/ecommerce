// components/FeaturesSection.js
import React from 'react';
import Image from 'next/image';
import Ficon1 from '/home/redaunix/ecommerce/nextjs/public/Ficon1.svg';
import Ficon2 from '/home/redaunix/ecommerce/nextjs/public/Ficon2.svg';


const FeaturesSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-yellow-200	">
      {/* Left Column */}
      <div className="flex flex-col justify-center items-center mr-10 ml-40">
        <h2 className="text-4xl font-bold mb-4">Discover Best savory</h2>
        <p className="text-black-600 text-center ">
        Embark on a savory journey, exploring rich and robust flavors in every bite. From traditional classics to global cuisines, discover the best in savory delights. Indulge your taste buds with carefully crafted dishes, each bite a symphony of culinary excellence. Uncover the secrets of savory perfection and savor the extraordinary in every culinary adventure
        </p>
        <Image
          src={Ficon2} // Replace with your image path
          alt="Yummy!"
          width={300}
          height={200}
          className="mb-4 mt-10"
        />
        <button className=" font-bold bg-yellow-400 hover:border-dotted text-black px-4 py-2 w-30">
          Explore
        </button>
      </div>

      {/* Right Column */}
      <div className="hidden md:block p-6 ml-20">
        <Image
          src={Ficon1} // Replace with your image path
          alt="Yummy!"
          width={300}
          height={200}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
