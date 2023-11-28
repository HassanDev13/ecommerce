// components/landingpagecomponents/_components/HeroSection.tsx
import Image from 'next/image';
import heroSection from "/home/redaunix/ecommerce/nextjs/public/HeroSection.svg";
import icon1 from "/home/redaunix/ecommerce/nextjs/public/Icon1.svg";
import icon2 from "/home/redaunix/ecommerce/nextjs/public/Icon2.svg";
import icon3 from "/home/redaunix/ecommerce/nextjs/public/Icon3.svg";
import icon4 from "/home/redaunix/ecommerce/nextjs/public/Icon4.svg";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-yellow-50 text-black text-center py-16">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-1">
          <div className="mb-2">
            <Image className='ml-20' src={icon1} alt="Your Image" width={100} height={100} />
          </div>
          <div>
            <Image className='ml-20 mt-20 ' src={icon2} alt="Your Image" width={100} height={100} />
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="text-3xl font-bold mb-2">Discover Best savory</h2>
          <p className="text-lg mb-4">Embark on a savory journey, exploring rich and robust flavors in every bite. From traditional classics to global cuisines, discover the best in savory delights. Indulge your taste buds with carefully crafted dishes, each bite a symphony of culinary excellence. Uncover the secrets of savory perfection and savor the extraordinary in every culinary adventure.</p>
          <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full font-semibold">Explore Savory Delights Now</button>
        </div>

        <div className="col-span-1">
          <div className="mb-2 ">
            <Image className='ml-20' src={icon3} alt="Your Image" width={100} height={100} />
          </div>
          <div>
            <Image className='ml-20 mt-20 ' src={icon4} alt="Yummy!" width={100} height={100} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image src={heroSection} alt="yummy!" width={1000} height={1000} />
      </div>
    </section>
  );
};

export default HeroSection;
