
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LiveBoardDynamic from '@/components/LiveBoardDynamic';
import NewsDynamic from '@/components/NewsDynamic';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <LiveBoardDynamic />
      <NewsDynamic />
      <Footer />
    </div>
  );
};

export default Index;
