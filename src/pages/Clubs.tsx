
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizModal from '@/components/QuizModal';
import { Brain, Trophy, Clock, Target, Award, Play, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Clubs = () => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentQuestion, setStudentQuestion] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const stats = [
    {
      icon: Brain,
      title: '200+ Savol',
      description: 'Turli mavzulardagi keng qamrovli savol banki',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: '10 Daqiqa',
      description: 'Har bir test seansi uchun optimal vaqt',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Target,
      title: '10 ta Savol',
      description: 'Har safar tasodifiy tanlanган savollar',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Award,
      title: 'Sertifikat',
      description: 'Ishtirok etganingiz uchun minnatdorchilik sertifikati',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName.trim() || !studentQuestion.trim() || !studentAnswer.trim()) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Telegram botga yuborish - bu yerda bot token kerak bo'ladi
      const message = `📚 ZAKOVAT KLUBI - Yangi savol-javob\n\n👤 O'quvchi: ${studentName}\n❓ Savol: ${studentQuestion}\n💡 Javob: ${studentAnswer}\n\n📅 Vaqt: ${new Date().toLocaleString('uz-UZ')}`;
      
      // Bu yerda telegram bot API chaqiruvi bo'lishi kerak
      console.log('Telegram botga yuboriladi:', message);
      
      toast({
        title: "Muvaffaqiyat!",
        description: "Savol-javobingiz muvaffaqiyatli yuborildi",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Formani tozalash
      setStudentName('');
      setStudentQuestion('');
      setStudentAnswer('');
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Savol-javob yuborishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Zakovat Klubi Test Markazi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Bilimingizni sinab ko'ring! Intellektual savollar bilan o'zingizni rivojlantiring 
              va ishtirok etganingiz uchun maxsus sertifikat oling.
            </p>
            
            <Button 
              onClick={() => setIsQuizModalOpen(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Testni Boshlash
            </Button>
          </div>
        </div>
      </section>

      {/* O'qilayotgan Savol-Javob Bo'limi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O'qilayotgan Savolga Javob Berish
            </h2>
            <p className="text-gray-600">
              Dars jarayonida o'tilgan mavzular bo'yicha savol va javoblaringizni yuboring
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                Savol-Javob Yuborish
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuestionSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="studentName">Ism va Familiya *</Label>
                  <Input
                    id="studentName"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="To'liq ism va familiyangizni kiriting"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="studentQuestion">O'qilayotgan Savol *</Label>
                  <Textarea
                    id="studentQuestion"
                    value={studentQuestion}
                    onChange={(e) => setStudentQuestion(e.target.value)}
                    placeholder="Darsda o'tilgan mavzu bo'yicha savolingizni yozing"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="studentAnswer">Sizning Javobingiz *</Label>
                  <Textarea
                    id="studentAnswer"
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Savolga bergan javobingizni yozing"
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Yuborilmoqda...' : 'Javobni Yuborish'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Test Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Test Xususiyatlari
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zakovat klubining intellektual test tizimi bilan bilimingizni oshiring
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Qanday Ishlaydi?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Testni Boshlang</h3>
              <p className="text-gray-600">
                "Testni Boshlash" tugmasini bosib, qoidalar bilan tanishing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Savollarni Yeching</h3>
              <p className="text-gray-600">
                10 daqiqa ichida 10 ta savolga javob bering
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Sertifikat Oling</h3>
              <p className="text-gray-600">
                Ishtirok etganingiz uchun PDF sertifikat yuklab oling
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
};

export default Clubs;
