
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'Yangi dasturlash kurslari boshlandi',
      excerpt: 'Python, JavaScript va boshqa zamonaviy texnologiyalar bo\'yicha kurslar...',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Xalqaro olimpiadada 3 ta medal',
      excerpt: 'Bizning talabalarimiz xalqaro matematik olimpiadasida ajoyib natijalar...',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Yangi laboratoriya ochildi',
      excerpt: 'Zamonaviy texnologiyalar bilan jihozlangan yangi laboratoriya...',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            So'nggi Yangiliklar
          </h2>
          <p className="text-xl text-gray-600">
            Klubimizning eng so'nggi yangiliklari va yutuqlari
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Yangilik
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(item.date)}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
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

        <div className="text-center mt-12">
          <Link
            to="/news"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
          >
            Barcha Yangiliklar
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
