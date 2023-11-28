import React from 'react';
import Image from 'next/image';
import CTAicon from '/home/redaunix/ecommerce/nextjs/public/CTAicon.svg';
import CTAicon2 from '/home/redaunix/ecommerce/nextjs/public/CTAicon2.svg';

const CTASection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-yellow-50	">
      <div className="hidden md:block p-6 ml-20">
        <Image
          src={CTAicon}
          alt="Yummy!"
          width={300}
          height={200}
        />
      </div>

      <div className="flex flex-col justify-center items-center mr-40 ml-10">
        <h2 className="text-4xl font-bold mb-4">Discover Best savory</h2>
        <p className="text-black-700 text-center">
        Embark on a savory journey, exploring rich and robust flavors in every bite. From traditional classics to global cuisines, discover the best in savory delights. Indulge your taste buds with carefully crafted dishes, each bite a symphony of culinary excellence. Uncover the secrets of savory perfection and savor the extraordinary in every culinary adventure
        </p>
        <Image
          src={CTAicon2} 
          alt="Yummy!"
          width={300}
          height={200}
          className="mb-4 mt-10 m-50"
        />
        <button className=" font-bold bg-yellow-400 hover:border-dotted text-black px-4 py-2 w-30">
          Explore
        </button>
      </div>

    </section>
  );
};
  
  export default CTASection;
  