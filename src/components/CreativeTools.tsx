
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, FileText, Image, Video, Music, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreativeTools = () => {
  const { toast } = useToast();
  const [activeCreativeTab, setActiveCreativeTab] = useState<'post' | 'gallery' | 'video' | 'music'>('post');

  const creativeOptions = [
    { id: 'post', label: 'Maqola Yozish', icon: FileText, color: 'blue' },
    { id: 'gallery', label: 'Rasm Galereyasi', icon: Image, color: 'green' },
    { id: 'video', label: 'Video Yaratish', icon: Video, color: 'purple' },
    { id: 'music', label: 'Audio Yozuvlar', icon: Music, color: 'orange' }
  ];

  const handlePublish = (type: string) => {
    toast({
      title: "Muvaffaqiyat!",
      description: `${type} muvaffaqiyatli nashr etildi.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 text-purple-600" />
            Ijodiy Vositalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Creative Options Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {creativeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveCreativeTab(option.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  activeCreativeTab === option.id
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <option.icon 
                  size={24} 
                  className={`mx-auto mb-2 ${
                    activeCreativeTab === option.id ? `text-${option.color}-600` : 'text-gray-600'
                  }`} 
                />
                <p className={`text-sm font-medium ${
                  activeCreativeTab === option.id ? `text-${option.color}-700` : 'text-gray-700'
                }`}>
                  {option.label}
                </p>
              </button>
            ))}
          </div>

          {/* Content based on active tab */}
          {activeCreativeTab === 'post' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Yangi Maqola Yaratish</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="post-title">Maqola sarlavhasi</Label>
                  <Input id="post-title" placeholder="Maqola sarlavhasini kiriting" />
                </div>
                <div>
                  <Label htmlFor="post-content">Maqola matni</Label>
                  <Textarea 
                    id="post-content" 
                    placeholder="Maqola matnini kiriting..." 
                    rows={8}
                  />
                </div>
                <Button onClick={() => handlePublish('Maqola')} className="w-full">
                  <FileText size={16} className="mr-2" />
                  Maqolani Nashr Etish
                </Button>
              </div>
            </div>
          )}

          {activeCreativeTab === 'gallery' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Rasm Galereyasi</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Image size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Rasmlarni yuklash uchun bu yerga tashlang yoki tanlang</p>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Rasmlarni Tanlash
                </Button>
              </div>
              <Button onClick={() => handlePublish('Galereya')} className="w-full">
                <Image size={16} className="mr-2" />
                Galereyani Saqlash
              </Button>
            </div>
          )}

          {activeCreativeTab === 'video' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Video Yaratish</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Video sarlavhasi</Label>
                  <Input id="video-title" placeholder="Video sarlavhasini kiriting" />
                </div>
                <div>
                  <Label htmlFor="video-description">Video tavsifi</Label>
                  <Textarea 
                    id="video-description" 
                    placeholder="Video haqida ma'lumot..." 
                    rows={4}
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Video size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Video faylni yuklang</p>
                  <Button variant="outline">
                    <Upload size={16} className="mr-2" />
                    Video Tanlash
                  </Button>
                </div>
                <Button onClick={() => handlePublish('Video')} className="w-full">
                  <Video size={16} className="mr-2" />
                  Videoni Yuklash
                </Button>
              </div>
            </div>
          )}

          {activeCreativeTab === 'music' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Audio Yozuvlar</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="audio-title">Audio sarlavhasi</Label>
                  <Input id="audio-title" placeholder="Audio sarlavhasini kiriting" />
                </div>
                <div>
                  <Label htmlFor="audio-description">Audio tavsifi</Label>
                  <Textarea 
                    id="audio-description" 
                    placeholder="Audio haqida ma'lumot..." 
                    rows={3}
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Music size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Audio faylni yuklang</p>
                  <Button variant="outline">
                    <Upload size={16} className="mr-2" />
                    Audio Tanlash
                  </Button>
                </div>
                <Button onClick={() => handlePublish('Audio')} className="w-full">
                  <Music size={16} className="mr-2" />
                  Audioni Yuklash
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreativeTools;
