
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Upload, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuizComponent from '@/components/QuizComponent';

const ProfileEdit = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: 'Alijon Valiyev',
    email: 'alijon@example.com',
    phone: '+998 90 123 45 67',
    location: 'Toshkent, O\'zbekiston',
    bio: 'Men intellektual o\'yinlar va mantiqiy masalalar bilan shug\'ullanishni yaxshi ko\'raman. Zakovat klubida faol a\'zo sifatida turli tanlovlarda ishtirok etaman.'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Muvaffaqiyat!",
      description: "Profil ma'lumotlari yangilandi.",
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Rasm yuklandi",
      description: "Profil rasmi muvaffaqiyatli yangilandi.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2" />
            Profil Ma'lumotlarini Tahrirlash
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" alt={formData.name} />
              <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                {formData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleImageUpload}>
              <Upload size={16} className="mr-2" />
              Rasm Yuklash
            </Button>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">To'liq ism</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email manzil</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email manzilingizni kiriting"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon raqam</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Telefon raqamingizni kiriting"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Joylashuv</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Joylashuvingizni kiriting"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">O'zingiz haqingizda</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="O'zingiz haqingizda qisqacha ma'lumot bering"
              rows={4}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="min-w-32">
              <Save size={16} className="mr-2" />
              Saqlash
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <QuizComponent />
    </div>
  );
};

export default ProfileEdit;
