
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import QuizComponentDynamic from './QuizComponentDynamic';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Kitob tumani 32-maktab
            <span className="block text-yellow-300">Zakovat Klubi</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Bilimingizni sinab ko'ring va eng zakovat o'quvchilar qatoriga qo'shiling!
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold"
                onClick={() => navigate('/auth')}
              >
                Ro'yxatdan o'tish
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/auth')}
              >
                Kirish
              </Button>
            </div>
          )}
        </div>

        {user && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <QuizComponentDynamic />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
