
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Zakovat
                <span className="text-blue-600 block">Klubiga</span>
                Xush Kelibsiz
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Bilim va ijodkorlik markazi. Yoshlarning intellektual rivojlanishi va 
                ijodiy qobiliyatlarini oshirishga yordam beramiz.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">A'zolar</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Trophy className="text-green-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Yutuqlar</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="text-purple-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">20+</div>
                <div className="text-sm text-gray-600">Kurslar</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/clubs"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group"
              >
                Klubga Qo'shiling
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/about"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 text-center"
              >
                Batafsil Ma'lumot
              </Link>
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Darslik Materiallari</h3>
                  <p className="text-blue-100">Eng yangi va sifatli ta'lim materiallari</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Mentor Yordami</h3>
                  <p className="text-blue-100">Tajribali ustozlar tomonidan yo'naltirish</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Jamoaviy Ish</h3>
                  <p className="text-blue-100">Hamfikr do'stlar bilan birga o'rganish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
