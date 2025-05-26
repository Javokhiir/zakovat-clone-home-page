
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  const news = [
    {
      id: 1,
      title: 'Yangi dasturlash kurslari boshlandi',
      excerpt: 'Python, JavaScript va React texnologiyalari bo\'yicha yangi kurslar endi barcha yoshdagi o\'quvchilar uchun mavjud. Tajribali mentorlar bilan birga...',
      content: 'Kurslar haftada 3 marta bo\'lib o\'tadi va amaliy loyihalar ustida ishlash imkoniyatini beradi.',
      date: '2024-01-15',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=300&fit=crop',
      category: 'Ta\'lim'
    },
    {
      id: 2,
      title: 'Xalqaro olimpiadada 3 ta medal qo\'lga kiritildi',
      excerpt: 'Bizning talabalarimiz xalqaro matematik olimpiadasida ajoyib natijalar ko\'rsatib, 1 ta oltin va 2 ta kumush medal qo\'lga kiritishdi...',
      content: 'Bu yutuq klubimizning yuqori sifatli ta\'lim berishini yana bir bor tasdiqladi.',
      date: '2024-01-10',
      author: 'Mentor Team',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop',
      category: 'Yutuq'
    },
    {
      id: 3,
      title: 'Zamonaviy laboratoriya ochildi',
      excerpt: 'Eng so\'nggi texnologiyalar bilan jihozlangan yangi laboratoriya o\'quvchilarimiz uchun ochildi. Bu yerda robotexnika va sun\'iy intellekt...',
      content: 'Laboratoriya barcha zamonaviy jihozlar bilan ta\'minlangan.',
      date: '2024-01-05',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop',
      category: 'Infratuzilma'
    },
    {
      id: 4,
      title: 'Startap tanlovida g\'olib bo\'ldik',
      excerpt: 'Yoshlar startap tanlovida bizning jamoamiz birinchi o\'rinni egalladi. Innovatsion loyiha bilan...',
      content: 'Loyiha ta\'lim sohasidagi muammolarni hal qilishga qaratilgan.',
      date: '2023-12-28',
      author: 'Startup Team',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=300&fit=crop',
      category: 'Yutuq'
    },
    {
      id: 5,
      title: 'Yangi ingliz tili kurslari',
      excerpt: 'IELTS va TOEFL imtihonlariga tayyorgarlik ko\'rish uchun maxsus kurslar tashkil etildi...',
      content: 'Kurslar tajribali o\'qituvchilar tomonidan olib boriladi.',
      date: '2023-12-20',
      author: 'Language Dept',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop',
      category: 'Ta\'lim'
    },
    {
      id: 6,
      title: 'Xalqaro hamkorlik shartnomasi imzolandi',
      excerpt: 'Evropaning yetakchi ta\'lim muassasalari bilan hamkorlik shartnomasi imzolandi...',
      content: 'Bu talabalar almashinuvi dasturlarini kengaytirish imkonini beradi.',
      date: '2023-12-15',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=300&fit=crop',
      category: 'Hamkorlik'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categories = ['Barchasi', 'Ta\'lim', 'Yutuq', 'Infratuzilma', 'Hamkorlik'];
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Yangiliklar
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Klubimizning eng so'nggi yangiliklari, yutuqlari va e'lonlari
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {item.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <Link
                    to={`/news/${item.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                  >
                    Batafsil o'qish
                    <ArrowRight 
                      size={16} 
                      className="ml-1 group-hover:translate-x-1 transition-transform" 
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
