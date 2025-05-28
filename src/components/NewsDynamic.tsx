
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  published_at: string;
}

const NewsDynamic = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Yangiliklar yuklanmoqda...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            So'nggi Yangiliklar
          </h2>
          <p className="text-xl text-gray-600">
            Maktabimizdagi eng so'nggi yangiliklar va voqealar
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center text-gray-600">
            Hozircha yangiliklar mavjud emas.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {item.image_url && (
                  <div className="relative">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    {item.category && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600">{item.category}</Badge>
                      </div>
                    )}
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(item.published_at)}
                    </div>
                    {item.author && (
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {item.author}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-3">
                    {item.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsDynamic;
