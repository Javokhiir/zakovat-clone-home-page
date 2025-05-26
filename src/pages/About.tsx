
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Target, Award, BookOpen } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Faol o\'quvchilar', color: 'blue' },
    { icon: Target, number: '15+', label: 'Yo\'nalishlar', color: 'green' },
    { icon: Award, number: '100+', label: 'Yutuqlar', color: 'purple' },
    { icon: BookOpen, number: '50+', label: 'Kurslar', color: 'orange' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
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
              Biz Haqimizda
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zakovat Klubi - bu yoshlarning intellektual va ijodiy rivojlanishiga 
              yo'naltirilgan zamonaviy ta'lim markazi
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bizning Missiyamiz
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Biz har bir o'quvchining o'ziga xos qobiliyatlarini aniqlash va 
                rivojlantirishga yordam beramiz. Zamonaviy ta'lim usullari va 
                innovatsion yondashuvlar orqali kelajak yetakchilarini tayyorlaymiz.
              </p>
              <p className="text-lg text-gray-600">
                Klubimizda o'quvchilar nafaqat bilim olishadi, balki o'z fikrlarini 
                erkin ifodalash, jamoada ishlash va muammolarni ijodiy yechish 
                ko'nikmalarini egallashadi.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Bizning Qadriyatlarimiz</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Sifatli ta'lim</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Individual yondashuv</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Innovatsiya va ijodkorlik</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <span>Jamoaviy hamkorlik</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning Yutuqlarimiz
            </h2>
            <p className="text-xl text-gray-600">
              Raqamlarda ifodalangan muvaffaqiyatlarimiz
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 rounded-full ${getColorClasses(stat.color)} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
