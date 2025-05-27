import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Award, User } from 'lucide-react';
import { generateCertificate } from '@/utils/certificateGenerator';
import { useToast } from '@/hooks/use-toast';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
}

const CertificateModal = ({ isOpen, onClose, score, totalQuestions }: CertificateModalProps) => {
  const { toast } = useToast();
  const [studentName, setStudentName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCertificate = async () => {
    if (!studentName.trim()) {
      toast({
        title: "Xatolik",
        description: "Iltimos, ism va familiyangizni kiriting",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      await generateCertificate({
        studentName: studentName.trim(),
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        date: new Date().toLocaleDateString('uz-UZ')
      });

      toast({
        title: "Muvaffaqiyat!",
        description: "Ishtirok sertifikati yaratildi va yuklab olindi",
        className: "bg-green-50 border-green-200 text-green-800"
      });

      setStudentName('');
      onClose();
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Sertifikat yaratishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 sm:px-6 md:px-8 py-6">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-center text-lg sm:text-xl md:text-2xl font-semibold">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-500" />
              Sertifikat
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Test Result Summary */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm sm:text-base text-blue-600">
                  {percentage}% - Ishtirok etganingiz uchun rahmat!
                </div>
              </CardContent>
            </Card>

            {/* Appreciation Message */}
            <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700 italic">
                "Har bir ishtirok bilim yo'lida muhim qadamdir.
                Testda qatnashganingiz uchun sizga minnatdorchilik bildiramiz!"
              </p>
            </div>

            {/* Student Name Input */}
            <div className="space-y-2">
              <Label htmlFor="studentName" className="flex items-center text-sm sm:text-base">
                <User size={16} className="mr-2" />
                To'liq Ism va Familiya
              </Label>
              <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ism va familiyangizni kiriting"
                  className="text-center"
              />
            </div>

            {/* Generate Button */}
            <Button
                onClick={handleGenerateCertificate}
                disabled={!studentName.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base"
                size="lg"
            >
              <Download size={16} className="mr-2" />
              {isGenerating ? 'Sertifikat tayyorlanmoqda...' : 'Yuklab olish'}
            </Button>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Ushbu sertifikat minnatdorchilik belgisi sifatida taqdim etilmoqda
            </p>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default CertificateModal;
