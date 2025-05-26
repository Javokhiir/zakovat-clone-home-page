
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-lg">
                ZK
              </div>
              <span className="ml-2 text-xl font-bold">
                Zakovat Klubi
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Yoshlarning intellektual rivojlanishi va ijodiy qobiliyatlarini 
              oshirishga yo'naltirilgan ta'lim markazi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tezkor Havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="text-gray-300 hover:text-white transition-colors">
                  Klublar
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white transition-colors">
                  Yangiliklar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Xizmatlar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Dasturlash kurslari
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Matematik olimpiadalar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Loyiha ishlab chiqish
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Mentorlik dasturi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Aloqa Ma'lumotlari</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin size={18} className="text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Toshkent shahri, Yunusobod tumani
                </span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  +998 90 123 45 67
                </span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  info@zakovatklubi.uz
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Zakovat Klubi. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Maxfiylik siyosati
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
