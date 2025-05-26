
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Calendar, Trophy, Star } from 'lucide-react';

const ProfileView = () => {
  // Mock user data - bu ma'lumotlar haqiqiy foydalanuvchi ma'lumotlari bilan almashtiriladi
  const userData = {
    name: 'Alijon Valiyev',
    email: 'alijon@example.com',
    phone: '+998 90 123 45 67',
    location: 'Toshkent, O\'zbekiston',
    joinDate: '2023-01-15',
    bio: 'Men intellektual o\'yinlar va mantiqiy masalalar bilan shug\'ullanishni yaxshi ko\'raman. Zakovat klubida faol a\'zo sifatida turli tanlovlarda ishtirok etaman.',
    achievements: [
      'Matematika olimpiadasi - 1-o\'rin',
      'Mantiq turniri g\'olibi',
      'Eng faol a\'zo 2023'
    ],
    stats: {
      completedTasks: 156,
      rank: 'Gold',
      points: 2840
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" alt={userData.name} />
              <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
              <p className="text-gray-600 mb-4">{userData.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail size={16} className="mr-2" />
                  {userData.email}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Phone size={16} className="mr-2" />
                  {userData.phone}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin size={16} className="mr-2" />
                  {userData.location}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar size={16} className="mr-2" />
                  A'zo bo'lgan: {new Date(userData.joinDate).toLocaleDateString('uz-UZ')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats */}
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
                <span className="text-gray-600">Bajarilgan vazifalar:</span>
                <Badge variant="secondary">{userData.stats.completedTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daraja:</span>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">{userData.stats.rank}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Umumiy ball:</span>
                <Badge variant="outline">{userData.stats.points}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 text-orange-500" />
              Yutuqlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Trophy size={16} className="mr-3 text-blue-600" />
                  <span className="text-sm text-blue-800">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileView;
