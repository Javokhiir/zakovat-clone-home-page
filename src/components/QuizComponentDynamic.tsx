
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

const QuizComponentDynamic = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .limit(10);

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      toast.error('Savollarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizCompleted(true);
    
    if (user) {
      try {
        await supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            score: score,
            total_questions: questions.length
          });

        // Update leaderboard
        const { data: existingRecord } = await supabase
          .from('leaderboard')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (existingRecord) {
          await supabase
            .from('leaderboard')
            .update({
              games_played: existingRecord.games_played + 1,
              total_score: existingRecord.total_score + score
            })
            .eq('user_id', user.id);
        } else {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();

          await supabase
            .from('leaderboard')
            .insert({
              user_id: user.id,
              full_name: profile?.full_name || 'Foydalanuvchi',
              games_played: 1,
              total_score: score
            });
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
    fetchQuestions();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Savollar yuklanmoqda...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Hozircha savollar mavjud emas.</p>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <CardTitle className="text-2xl">Quiz yakunlandi!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-3xl font-bold text-blue-600">
            {score}/{questions.length}
          </div>
          <div className="text-xl">
            Natija: {percentage}%
          </div>
          <Progress value={percentage} className="w-full" />
          <Button onClick={restartQuiz} className="mt-4">
            Qaytadan boshlash
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Savol {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            Ball: {score}
          </span>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-lg leading-relaxed">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showExplanation ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full mt-4"
            >
              Javobni tasdiqlash
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`w-full p-4 rounded-lg border ${
                    index === currentQuestion.correct_answer
                      ? 'border-green-500 bg-green-50'
                      : index === selectedAnswer && selectedAnswer !== currentQuestion.correct_answer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {index === currentQuestion.correct_answer && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {index === selectedAnswer && selectedAnswer !== currentQuestion.correct_answer && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {currentQuestion.explanation && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Tushuntirish:</h4>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}
            
            <Button onClick={handleContinue} className="w-full">
              {currentQuestionIndex < questions.length - 1 ? 'Keyingi savol' : 'Yakunlash'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizComponentDynamic;
