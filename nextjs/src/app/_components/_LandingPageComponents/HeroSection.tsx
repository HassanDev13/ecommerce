// components/landingpagecomponents/_components/HeroSection.tsx
import Image from 'next/image';
import heroSection from "/public/HeroSection.svg";
import icon1 from "/public/Icon1.svg";
import icon2 from "/public/Icon2.svg";
import icon3 from "/public/Icon3.svg";
import icon4 from "/public/Icon4.svg";



const HeroSection: React.FC = () => {
  return (
    <section className="bg-white text-black text-center py-16 w-screen">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-1 ml-40   " >
          <div className="mt-0">
            <Image  src={icon2} alt="Your Image" width={100} height={100} />
          </div>
          <div className='mt-20'>
            <Image  src={icon1} alt="Your Image" width={100} height={100} />
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="text-3xl font-bold mb-2">Discover Best savory</h2>
          <p className="text-lg mb-4">Embark on a savory journey, exploring rich and robust flavors in every bite. From traditional classics to global cuisines, discover the best in savory delights. Indulge your taste buds with carefully crafted dishes, each bite a symphony of culinary excellence. Uncover the secrets of savory perfection and savor the extraordinary in every culinary adventure.</p>
          <button className=" bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg font-semibold">Explore Savory Delights Now</button>
        </div>

        <div className="col-span-1  ml-40 ">
          <div >
            <Image  src={icon3} alt="Yummy!" width={100} height={100} />
          </div>
          <div >
            <Image className='mt-20' src={icon4} alt="Yummy!" width={100} height={100} />
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
