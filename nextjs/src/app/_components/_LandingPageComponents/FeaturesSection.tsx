import React from 'react';
import Image from 'next/image';
import Ficon1 from '/public/Ficon1.svg';
import Ficon2 from '/public/Ficon2.svg';

const FeaturesSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center w-screen">
      {/* Left Column */}
      <div className="text-left max-w-lg md:ml-10 md:mr-[15%]"> 
        <h2 className="text-4xl font-bold mb-4">Discover Best savory</h2>
        <p className="text-black">
          Embark on a savory journey, exploring rich and robust flavors in every bite. From traditional classics to global cuisines,
          discover the best in savory delights. Indulge your taste buds with carefully crafted dishes, each bite a symphony of culinary excellence.
          Uncover the secrets of savory perfection and savor the extraordinary in every culinary adventure
        </p>
        <Image
          src={Ficon2} 
          alt="Yummy!"
          width={500}
          height={200}
          className="mb-4 mt-5"
        />
        <div>
          <a href="/products">
            <button className="bg-yellow-400 text-black py-2 px-5 mt-5 rounded-lg font-bold">
              Explore Savory Delights Now
            </button>
          </a>
        </div>
      </div>

      {/* Right Column */}
      <div className="">
        <Image
          src={Ficon1} // Replace with your image path
          alt="Yummy!"
          width={400}
          height={200}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
