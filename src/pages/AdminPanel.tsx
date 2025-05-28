
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash, Users, BookOpen, Newspaper } from 'lucide-react';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Quiz Questions State
  const [questions, setQuestions] = useState([]);
  const [questionForm, setQuestionForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correct_answer: 0,
    explanation: ''
  });
  const [editingQuestion, setEditingQuestion] = useState(null);

  // News State
  const [news, setNews] = useState([]);
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    image_url: ''
  });
  const [editingNews, setEditingNews] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    totalNews: 0,
    totalQuizResults: 0
  });

  useEffect(() => {
    if (isAdmin) {
      fetchQuestions();
      fetchNews();
      fetchStats();
    }
  }, [isAdmin]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yuklanmoqda...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Savollarni yuklashda xatolik');
    } else {
      setQuestions(data || []);
    }
  };

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      toast.error('Yangiliklar yuklashda xatolik');
    } else {
      setNews(data || []);
    }
  };

  const fetchStats = async () => {
    try {
      const [usersRes, questionsRes, newsRes, resultsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('quiz_questions').select('id', { count: 'exact' }),
        supabase.from('news').select('id', { count: 'exact' }),
        supabase.from('quiz_results').select('id', { count: 'exact' })
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalQuestions: questionsRes.count || 0,
        totalNews: newsRes.count || 0,
        totalQuizResults: resultsRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingQuestion) {
        const { error } = await supabase
          .from('quiz_questions')
          .update(questionForm)
          .eq('id', editingQuestion.id);
        
        if (error) throw error;
        toast.success('Savol yangilandi');
        setEditingQuestion(null);
      } else {
        const { error } = await supabase
          .from('quiz_questions')
          .insert([questionForm]);
        
        if (error) throw error;
        toast.success('Yangi savol qo\'shildi');
      }
      
      setQuestionForm({
        question: '',
        options: ['', '', '', ''],
        correct_answer: 0,
        explanation: ''
      });
      fetchQuestions();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingNews) {
        const { error } = await supabase
          .from('news')
          .update(newsForm)
          .eq('id', editingNews.id);
        
        if (error) throw error;
        toast.success('Yangilik yangilandi');
        setEditingNews(null);
      } else {
        const { error } = await supabase
          .from('news')
          .insert([{ ...newsForm, published_at: new Date().toISOString() }]);
        
        if (error) throw error;
        toast.success('Yangi yangilik qo\'shildi');
      }
      
      setNewsForm({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        image_url: ''
      });
      fetchNews();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const deleteQuestion = async (id) => {
    if (confirm('Savolni o\'chirishni tasdiqlaysizmi?')) {
      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Xatolik yuz berdi');
      } else {
        toast.success('Savol o\'chirildi');
        fetchQuestions();
      }
    }
  };

  const deleteNews = async (id) => {
    if (confirm('Yangilikni o\'chirishni tasdiqlaysizmi?')) {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error('Xatolik yuz berdi');
      } else {
        toast.success('Yangilik o\'chirildi');
        fetchNews();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Sayt tarkibini boshqaring</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Umumiy</TabsTrigger>
            <TabsTrigger value="questions">Savollar</TabsTrigger>
            <TabsTrigger value="news">Yangiliklar</TabsTrigger>
            <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Foydalanuvchilar</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savollar</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalQuestions}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Yangiliklar</CardTitle>
                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalNews}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quiz Natijalari</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalQuizResults}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingQuestion ? 'Savolni Tahrirlash' : 'Yangi Savol Qo\'shish'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Savol</label>
                    <Textarea
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm({...questionForm, question: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questionForm.options.map((option, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium mb-1">
                          Variant {String.fromCharCode(65 + index)}
                        </label>
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...questionForm.options];
                            newOptions[index] = e.target.value;
                            setQuestionForm({...questionForm, options: newOptions});
                          }}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">To'g'ri javob</label>
                    <select
                      value={questionForm.correct_answer}
                      onChange={(e) => setQuestionForm({...questionForm, correct_answer: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md"
                    >
                      {questionForm.options.map((_, index) => (
                        <option key={index} value={index}>
                          Variant {String.fromCharCode(65 + index)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tushuntirish (ixtiyoriy)</label>
                    <Textarea
                      value={questionForm.explanation}
                      onChange={(e) => setQuestionForm({...questionForm, explanation: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingQuestion ? 'Yangilash' : 'Qo\'shish'}
                    </Button>
                    {editingQuestion && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setEditingQuestion(null);
                          setQuestionForm({
                            question: '',
                            options: ['', '', '', ''],
                            correct_answer: 0,
                            explanation: ''
                          });
                        }}
                      >
                        Bekor qilish
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mavjud Savollar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">{question.question}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {question.options.map((option, index) => (
                          <div key={index} className={`text-sm p-2 rounded ${
                            index === question.correct_answer ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {String.fromCharCode(65 + index)}. {option}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingQuestion(question);
                            setQuestionForm(question);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteQuestion(question.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingNews ? 'Yangilikni Tahrirlash' : 'Yangi Yangilik Qo\'shish'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Sarlavha</label>
                    <Input
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Qisqa mazmun</label>
                    <Textarea
                      value={newsForm.excerpt}
                      onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">To'liq mazmun</label>
                    <Textarea
                      value={newsForm.content}
                      onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Kategoriya</label>
                      <Input
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Muallif</label>
                      <Input
                        value={newsForm.author}
                        onChange={(e) => setNewsForm({...newsForm, author: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Rasm URL (ixtiyoriy)</label>
                    <Input
                      value={newsForm.image_url}
                      onChange={(e) => setNewsForm({...newsForm, image_url: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingNews ? 'Yangilash' : 'Qo\'shish'}
                    </Button>
                    {editingNews && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setEditingNews(null);
                          setNewsForm({
                            title: '',
                            excerpt: '',
                            content: '',
                            category: '',
                            author: '',
                            image_url: ''
                          });
                        }}
                      >
                        Bekor qilish
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mavjud Yangiliklar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                      <div className="flex items-center gap-2 mb-2">
                        {item.category && <Badge variant="secondary">{item.category}</Badge>}
                        {item.author && <span className="text-sm text-gray-500">by {item.author}</span>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingNews(item);
                            setNewsForm(item);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteNews(item.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Foydalanuvchilar Ro'yxati</CardTitle>
                <p className="text-sm text-gray-600">
                  Foydalanuvchilar ma'lumotlari profiles jadvalida saqlanadi
                </p>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
