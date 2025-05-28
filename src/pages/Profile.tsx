
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, Edit, Trophy, Star } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar_url: ''
  });
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    averageScore: 0,
    bestScore: 0
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
      } else {
        // Create profile if it doesn't exist
        setProfile({
          full_name: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: '',
          location: '',
          bio: '',
          avatar_url: ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchStats = async () => {
    if (!user) return;
    
    try {
      const { data: results, error } = await supabase
        .from('quiz_results')
        .select('score, total_questions')
        .eq('user_id', user.id);

      if (error) throw error;

      if (results && results.length > 0) {
        const gamesPlayed = results.length;
        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        const averageScore = Math.round(totalScore / gamesPlayed);
        const bestScore = Math.max(...results.map(result => result.score));

        setStats({
          gamesPlayed,
          totalScore,
          averageScore,
          bestScore
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast.success('Profil yangilandi!');
      setEditing(false);
    } catch (error) {
      toast.error('Xatolik yuz berdi');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yuklanmoqda...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {profile.full_name ? profile.full_name.split(' ').map(n => n[0]).join('') : 'F'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.full_name || 'Foydalanuvchi'}
                    </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(!editing)}
                    >
                      <Edit size={16} className="mr-2" />
                      {editing ? 'Bekor qilish' : 'Tahrirlash'}
                    </Button>
                  </div>
                  
                  {editing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">To'liq ism</label>
                          <Input
                            value={profile.full_name}
                            onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Telefon</label>
                          <Input
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Joylashuv</label>
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">O'zingiz haqingizda</label>
                        <Textarea
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <Button onClick={handleSave}>
                        <Save size={16} className="mr-2" />
                        Saqlash
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Email:</strong> {profile.email}</p>
                      {profile.phone && <p><strong>Telefon:</strong> {profile.phone}</p>}
                      {profile.location && <p><strong>Joylashuv:</strong> {profile.location}</p>}
                      {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 text-yellow-500" />
                  Statistika
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">O'ynagan o'yinlar:</span>
                    <Badge variant="secondary">{stats.gamesPlayed}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Umumiy ball:</span>
                    <Badge variant="outline">{stats.totalScore}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">O'rtacha ball:</span>
                    <Badge variant="outline">{stats.averageScore}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Eng yaxshi natija:</span>
                    <Badge className="bg-green-500 hover:bg-green-600">{stats.bestScore}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 text-orange-500" />
                  Yutuqlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.gamesPlayed > 0 && (
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Trophy size={16} className="mr-3 text-blue-600" />
                      <span className="text-sm text-blue-800">Birinchi quiz yakunlandi</span>
                    </div>
                  )}
                  {stats.gamesPlayed >= 5 && (
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Trophy size={16} className="mr-3 text-green-600" />
                      <span className="text-sm text-green-800">5 ta quiz yakunlandi</span>
                    </div>
                  )}
                  {stats.bestScore >= 8 && (
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <Trophy size={16} className="mr-3 text-yellow-600" />
                      <span className="text-sm text-yellow-800">Eng yaxshi natija: {stats.bestScore}</span>
                    </div>
                  )}
                  {stats.gamesPlayed === 0 && (
                    <p className="text-gray-500 text-sm">
                      Quiz yechib yutuqlar qo'lga kiriting!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
