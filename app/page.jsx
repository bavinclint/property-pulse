import Hero from '@/components/Hero';
import About from '@/components/About';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {
  return (
    <>
      <About />
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};
export default HomePage;
