import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, ArrowLeft, ArrowRight, Play, Download } from 'lucide-react';
import { quizQuestions, Question } from '@/data/quizQuestions';
import { useToast } from '@/hooks/use-toast';
import CertificateModal from '@/components/CertificateModal';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
  const { toast } = useToast();
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Timer effect
  useEffect(() => {
    if (stage === 'quiz' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && stage === 'quiz') {
      handleFinishQuiz();
    }
  }, [stage, timeLeft]);

  // Initialize quiz
  const startQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);
    setQuestions(selectedQuestions);
    setSelectedAnswers(new Array(10).fill(null));
    setAnsweredQuestions(new Set());
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(600);
    setStage('quiz');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQuestionIndex);
    setAnsweredQuestions(newAnswered);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setStage('result');
    
    // Wait 3-4 seconds before showing final result
    setTimeout(() => {
      toast({
        title: "Test yakunlandi!",
        description: `Sizning natijangiz: ${correctAnswers}/10`,
      });
    }, 3000);
  };

  const handleClose = () => {
    setStage('intro');
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setTimeLeft(600);
    setAnsweredQuestions(new Set());
    setCertificateModalOpen(false);
    onClose();
  };

  const handleDownloadCertificate = () => {
    setCertificateModalOpen(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const allAnswered = answeredQuestions.size === questions.length;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Introduction Stage */}
          {stage === 'intro' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Zakovat Testi
                </DialogTitle>
              </DialogHeader>
              <div className="py-6 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-10 h-10 text-blue-600" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Test Qoidalari</h3>
                  <div className="bg-gray-50 p-6 rounded-lg text-left max-w-2xl mx-auto">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                        <span>Test 10 ta savoldan iborat, har biri uchun 4 ta javob varianti</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                        <span>Test uchun 10 daqiqa vaqt beriladi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                        <span>Savollar orasida erkin harakatlana olasiz</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                        <span>Test yakunlanganidan keyin natijangizni ko'rasiz</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button 
                  onClick={startQuiz}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Testni Boshlash
                </Button>
              </div>
            </>
          )}

          {/* Quiz Stage */}
          {stage === 'quiz' && currentQuestion && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Zakovat Testi</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-red-600">
                      <Clock size={16} className="mr-1" />
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Savol {currentQuestionIndex + 1} / {questions.length}</span>
                    <span>{Math.round(progress)}% tugallangan</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 text-left border rounded-lg transition-colors ${
                            selectedAnswers[currentQuestionIndex] === index
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-sm ${
                              selectedAnswers[currentQuestionIndex] === index
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-300'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Question Navigation */}
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToQuestion(index)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                          index === currentQuestionIndex
                            ? 'bg-blue-600 text-white'
                            : answeredQuestions.has(index)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={goPrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Orqaga
                  </Button>

                  <div className="flex space-x-2">
                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button onClick={goNext}>
                        Keyingi
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleFinishQuiz}
                        disabled={!allAnswered}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Testni Yakunlash
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Result Stage */}
          {stage === 'result' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">Test Natijalari</DialogTitle>
              </DialogHeader>
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6">
                  {score >= 7 ? (
                    <CheckCircle className="w-full h-full text-green-500" />
                  ) : score >= 4 ? (
                    <Clock className="w-full h-full text-yellow-500" />
                  ) : (
                    <XCircle className="w-full h-full text-red-500" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">
                  {score >= 7 ? "Ajoyib natija!" : score >= 4 ? "Yaxshi harakat!" : "Mashq qiling!"}
                </h3>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6 max-w-md mx-auto">
                  <p className="text-3xl font-bold text-blue-600 mb-2">{score}/10</p>
                  <p className="text-gray-600">To'g'ri javoblar soni</p>
                  <div className="mt-4">
                    <Progress value={(score / 10) * 100} className="h-3" />
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <p>Umumiy savol: 10 ta</p>
                  <p>To'g'ri javob: {score} ta</p>
                  <p>Noto'g'ri javob: {10 - score} ta</p>
                  <p>Foiz: {Math.round((score / 10) * 100)}%</p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button onClick={startQuiz} variant="outline">
                    Qayta Boshlash
                  </Button>
                  <Button 
                    onClick={handleDownloadCertificate}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Download size={16} className="mr-2" />
                    Sertifikat Olish
                  </Button>
                  <Button onClick={handleClose}>
                    Yopish
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        score={score}
        totalQuestions={10}
      />
    </>
  );
};

export default QuizModal;
