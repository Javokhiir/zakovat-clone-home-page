
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
        description: "Sertifikat muvaffaqiyatli yaratildi va yuklab olindi",
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
  const isPassing = percentage >= 70;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Sertifikat Olish
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Test Result Summary */}
          <Card className={`border-2 ${isPassing ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-bold ${isPassing ? 'text-green-600' : 'text-yellow-600'}`}>
                {score}/{totalQuestions}
              </div>
              <div className={`text-sm ${isPassing ? 'text-green-600' : 'text-yellow-600'}`}>
                {percentage}% - {isPassing ? 'Muvaffaqiyatli' : 'Qoniqarli'}
              </div>
            </CardContent>
          </Card>

          {/* Student Name Input */}
          <div className="space-y-2">
            <Label htmlFor="studentName" className="flex items-center">
              <User size={16} className="mr-2" />
              Ism va Familiya
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
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Download size={16} className="mr-2" />
            {isGenerating ? 'Yaratilmoqda...' : 'Sertifikatni Yuklab Olish'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Sertifikat PDF formatida yuklab olinadi
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
