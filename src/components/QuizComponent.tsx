
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Play, Trophy, Clock, Target } from 'lucide-react';
import QuizModal from '@/components/QuizModal';

const QuizComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Quiz Introduction */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Bilimingizni Sinab Ko'ring!
          </CardTitle>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Zakovat klubining maxsus test tizimi orqali o'zingizni sinab ko'ring. 
            Har xil mavzulardagi savollar bilan bilimingizni oshiring.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <Play className="w-5 h-5 mr-2" />
            Testni Boshlash
          </Button>
        </CardContent>
      </Card>

      {/* Quiz Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">50+ Savol</h3>
            <p className="text-gray-600 text-sm">
              Turli mavzularda 50 dan ortiq savol majmuasi
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">10 Daqiqa</h3>
            <p className="text-gray-600 text-sm">
              Har bir test seansi uchun belgilangan vaqt
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <Target className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">10 Savol</h3>
            <p className="text-gray-600 text-sm">
              Har safar tasodifiy tanlanган 10 ta savol
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Test Qoidalari</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Test 10 ta savoldan iborat bo'lib, har biri uchun 4 ta javob varianti beriladi
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Test uchun 10 daqiqa vaqt beriladi
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Har bir savol uchun faqat bitta to'g'ri javob mavjud
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Test yakunlanganidan keyin natijangizni ko'rishingiz va sertifikatingizni yuklab olishingiz mumkin
            </li>
          </ul>
        </CardContent>
      </Card>

      <QuizModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default QuizComponent;
