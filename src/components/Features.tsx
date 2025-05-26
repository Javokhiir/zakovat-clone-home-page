
import { Brain, Users, Target, Award, Clock, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Intellektual Rivojlanish',
      description: 'Mantiqiy fikrlash va muammolarni yechish qobiliyatlarini rivojlantiring',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Jamoaviy Ish',
      description: 'Turli loyihalarda hamkorlik qiling va kommunikatsiya ko\'nikmalarini oshiring',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Maqsadga Yo\'nalganlik',
      description: 'Aniq maqsadlar qo\'ying va ularni amalga oshirish yo\'llarini o\'rganing',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Yutuqlar va Mukofotlar',
      description: 'Tanlovlar va olimpiadalarda ishtirok eting, g\'olib bo\'ling',
      color: 'orange'
    },
    {
      icon: Clock,
      title: 'Moslashuvchan Jadval',
      description: 'O\'qish va ish jadvalingizga mos keladigan vaqtlarda darslar',
      color: 'teal'
    },
    {
      icon: Globe,
      title: 'Keng Imkoniyatlar',
      description: 'Xalqaro hamkorlik va o\'zaro almashish dasturlari',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      teal: 'bg-teal-100 text-teal-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nega Bizni Tanlaysiz?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zamonaviy ta'lim usullari va tajribali mentorlar yordamida 
            o'zingizning potensialingizni to'liq ochib bering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-lg ${getColorClasses(feature.color)} flex items-center justify-center mb-6`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
