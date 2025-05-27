
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  const news = [
    {
      id: 1,
      title: 'Kitob tumani 32-maktabda yangi zakovat oyini e\'lon qilindi',
      excerpt: 'Yaqin kunlarda maktabimizda katta zakovat bellashuvi o\'tkaziladi. Barcha sinf o\'quvchilari ishtirok etishlari mumkin...',
      content: 'O\'yin turli fanlar bo\'yicha savollardan tashkil topgan.',
      date: '2024-01-20',
      author: 'Maktab Rahbariyati',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop',
      category: 'Zakovat O\'yini'
    },
    {
      id: 2,
      title: 'Eng yaxshi bilimdon o\'quvchilar e\'tirof etildi',
      excerpt: 'O\'tgan oylik natijalar bo\'yicha eng bilimdon o\'quvchilar aniqlanib, ularni taqdirlash marosimi o\'tkazildi...',
      content: 'Har bir sinf bo\'yicha eng yaxshi natijalarga erishgan o\'quvchilar sovg\'alar bilan taqdirlandi.',
      date: '2024-01-18',
      author: 'Zakovat Klubi',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=300&fit=crop',
      category: 'Taqdirlash'
    },
    {
      id: 3,
      title: 'Yangi zakovat test platformasi ishga tushirildi',
      excerpt: 'Maktab o\'quvchilari uchun maxsus online test platformasi yaratildi. Bu platforma orqali bilimlarini sinab ko\'rishlari mumkin...',
      content: 'Platforma turli darajadagi savollar bilan to\'ldirilgan.',
      date: '2024-01-15',
      author: 'IT Guruhi',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop',
      category: 'Texnologiya'
    },
    {
      id: 4,
      title: 'Matematika olimpiadasi g\'oliblari ma\'lum bo\'ldi',
      excerpt: 'Maktab ichidagi matematika olimpiadasida ishtirok etgan o\'quvchilar orasidan g\'oliblar aniqlanib...',
      content: 'G\'oliblar keyingi bosqichga yo\'llanma olishdi.',
      date: '2024-01-12',
      author: 'Matematika Kafedra',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=300&fit=crop',
      category: 'Olimpiada'
    },
    {
      id: 5,
      title: 'Zakovat klubida yangi a\'zolar qabul qilinmoqda',
      excerpt: 'Zakovat klubiga qo\'shilish uchun ariza topshirish muddati uzaytirildi. Barcha ixtisoslashuvlar bo\'yicha...',
      content: 'Klubga qo\'shilish uchun test topshirish talab etiladi.',
      date: '2024-01-10',
      author: 'Klub Rahbariyati',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop',
      category: 'A\'zolik'
    },
    {
      id: 6,
      title: 'Maktab kuni bayram tadbirlari rejalashtirilmoqda',
      excerpt: 'Yaqinlashib kelayotgan maktab kuniga bag\'ishlangan maxsus tadbirlar va zakovat tanlovlari...',
      content: 'Barcha o\'quvchilar faol ishtirok etishlari kutilmoqda.',
      date: '2024-01-08',
      author: 'Tashkilot Qo\'mitasi',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=300&fit=crop',
      category: 'Bayram'
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

  const categories = ['Barchasi', 'Zakovat O\'yini', 'Taqdirlash', 'Texnologiya', 'Olimpiada', 'A\'zolik', 'Bayram'];
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kitob tumani 32-maktab Yangiliklari
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maktabimizdagi eng so'nggi yangiliklar, zakovat o'yinlari va bilimdon o'quvchilarimiz haqida
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
                  
                  <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group cursor-pointer">
                    Batafsil o'qish
                    <ArrowRight 
                      size={16} 
                      className="ml-1 group-hover:translate-x-1 transition-transform" 
                    />
                  </div>
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
