import Image from 'next/image';
import icon1 from "/public/Icon1.svg";
import icon2 from "/public/Icon2.svg";
import icon3 from "/public/Icon3.svg";
import icon4 from "/public/Icon4.svg";

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 w-auto">
        <div className="mx-auto">
          <div>
            <Image  src={icon2} alt="Your Image" width={100} height={100} />
          </div>
          <div className='mt-20'>
            <Image  src={icon1} alt="Your Image" width={100} height={100} />
          </div>
        </div>

        <div className="mx-auto">
          <h2 className="text-3xl font-bold mb-2">Discover Best savory</h2>
          <p className="text-lg mb-4">Discover amazing tastes with us! Enjoy delicious flavors in every bite, from classic favorites to global treats crafted by talented artisans. Savor something extraordinary in every meal and join us in making your food journey special, where every bite is a tasty adventure!</p>
          <a href="/products">
            <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg">Explore Savory Delights Now</button>
          </a>
        </div>

        <div className="mx-auto">
          <div>
            <Image  src={icon3} alt="Yummy!" width={100} height={100} />
          </div>
          <div>
            <Image className='mt-20' src={icon4} alt="Yummy!" width={100} height={100} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image src={"HeroSection.svg"} alt="yummy!" width={1000} height={1000} />
      </div>
    </section>
  );
};

export default HeroSection;
