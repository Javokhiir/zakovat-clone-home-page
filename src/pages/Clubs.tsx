
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Code, Calculator, Palette, Globe, Music, Camera } from 'lucide-react';

const Clubs = () => {
  const clubs = [
    {
      icon: Code,
      title: 'Dasturlash Klubi',
      description: 'Python, JavaScript, React va boshqa zamonaviy texnologiyalarni o\'rganing',
      members: 120,
      level: 'Boshlang\'ich - Ilg\'or',
      color: 'blue'
    },
    {
      icon: Calculator,
      title: 'Matematik Klubi',
      description: 'Matematik olimpiadalar va musobaqalarga tayyorgarlik',
      members: 85,
      level: 'O\'rta - Ilg\'or',
      color: 'green'
    },
    {
      icon: Palette,
      title: 'Dizayn Klubi',
      description: 'Grafik dizayn, UI/UX va ijodiy loyihalar',
      members: 95,
      level: 'Boshlang\'ich - O\'rta',
      color: 'purple'
    },
    {
      icon: Globe,
      title: 'Tillar Klubi',
      description: 'Ingliz, nemis va boshqa xorijiy tillarni o\'rganing',
      members: 150,
      level: 'Boshlang\'ich - Ilg\'or',
      color: 'orange'
    },
    {
      icon: Music,
      title: 'Musiqa Klubi',
      description: 'Asboblar chalish va musiqa nazariyasi',
      members: 60,
      level: 'Boshlang\'ich - O\'rta',
      color: 'pink'
    },
    {
      icon: Camera,
      title: 'Fotografiya Klubi',
      description: 'Professional fotografiya va video montaj',
      members: 45,
      level: 'Boshlang\'ich - O\'rta',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bizning Klublar
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Turli yo'nalishlardagi klublarimizga qo'shilib, o'z qiziqishlaringizga 
              mos keladigan sohada rivojlaning
            </p>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-16 h-16 rounded-lg ${getColorClasses(club.color)} flex items-center justify-center mb-6`}>
                  <club.icon size={32} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {club.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {club.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">A'zolar soni:</span>
                    <span className="font-medium text-gray-900">{club.members}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Daraja:</span>
                    <span className="font-medium text-gray-900">{club.level}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Qo'shilish
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clubs;
