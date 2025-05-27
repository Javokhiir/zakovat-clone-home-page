import jsPDF from 'jspdf';

interface CertificateData {
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

export const generateCertificate = async (data: CertificateData) => {
  const { studentName, date } = data;
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // --- Gradient Background ---
  const drawGradientBackground = () => {
    for (let i = 0; i < pageHeight; i++) {
      const r = 240 - i * 0.3;
      const g = 248 - i * 0.2;
      const b = 255 - i * 0.1;
      pdf.setDrawColor(r, g, b);
      pdf.setFillColor(r, g, b);
      pdf.rect(0, i, pageWidth, 1, 'F');
    }
  };
  drawGradientBackground();

  // --- Decorative Medal Circle ---
  const medalX = pageWidth / 2;
  const medalY = 40;
  const medalRadius = 18;

  pdf.setFillColor(245, 158, 11);
  pdf.circle(medalX, medalY, medalRadius, 'F');

  // --- Load and Insert Medal Image (certificate.png) ---
  // Tasvirni Promise bilan yuklash va PDFga joylash
  const loadImageAsDataURL = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // agar kerak bo'lsa CORS uchun
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

  try {
    const medalImage = await loadImageAsDataURL('/certificate.png'); // manzilingiz to'g'ri bo'lishi kerak

    const imgSize = medalRadius * 2 * 0.6; // medal radiusining 90% o'lchamida
    const imgX = medalX - imgSize / 2;
    const imgY = medalY - imgSize / 2;

    pdf.addImage(medalImage, 'PNG', imgX, imgY, imgSize, imgSize);
  } catch (error) {
    // Agar rasm yuklanmasa, emoji qo'yiladi (fallback)
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('🏅', medalX - 6, medalY + 6);
  }

  // --- Title ---
  pdf.setFontSize(36);
  pdf.setTextColor(37, 99, 235);
  pdf.setFont('times', 'bold');
  const title = 'SERTIFIKAT';
  pdf.text(title, (pageWidth - pdf.getTextWidth(title)) / 2, 78);

  // --- Subtitle with Student Highlight ---
  const subtitle1 = 'Zakovat onlayn platformasi tomonidan tashkil etilgan';
  const subtitle2 = '"Mantiqiy Fikrlash" testida faol ishtirok etganligi uchun';
  const subtitle4 = `${studentName.toUpperCase()} `;
  const subtitle5 = `TAQDIRLANADI`;

  pdf.setFontSize(14);
  pdf.setTextColor(55, 65, 81);
  pdf.setFont('helvetica', 'normal');
  pdf.text(subtitle1, pageWidth / 2, 95, { align: 'center' });
  pdf.text(subtitle2, pageWidth / 2, 103, { align: 'center' });

  pdf.setFontSize(28);
  pdf.setTextColor(37, 99, 235);
  pdf.setFont('helvetica', 'bold');
  pdf.text(subtitle4, pageWidth / 2, 123, { align: 'center' });

  pdf.setFontSize(20);
  pdf.text(subtitle5, pageWidth / 2, 135, { align: 'center' });
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);

  // --- Message Body ---
  const messageLines = [
    "Sizning bilimga chanqoqligingiz, qat'iyat va intellektual salohiyatingiz yuqori baholanadi.",
    'Har bir harakatingiz katta yutuqlarga eltadi. Kelajak sizniki!',
    'Zakovat loyihasiga qo‘shilganingiz va bilim yo‘lida intilayotganingiz uchun minnatdorchilik bildiramiz.',
  ];
  pdf.setFontSize(12);
  pdf.setFont('times', 'normal');
  pdf.setTextColor(55, 65, 81);
  messageLines.forEach((msg, i) => {
    pdf.text(msg, pageWidth / 2, 150 + i * 8, { align: 'center' });
  });

  // --- Date & Signature Text ---
  pdf.setFontSize(10);
  pdf.setTextColor(75, 85, 99);
  pdf.text(`Berilgan sana: ${date}`, 20, pageHeight - 25, { align: 'left' });

  // Chiziq va tashkilotchi text
  const organizerLineX1 = pageWidth - 110;
  const organizerLineX2 = pageWidth - 30;
  const lineY = pageHeight - 30;
  const textY = pageHeight - 25;

  pdf.setDrawColor(107, 114, 128);
  pdf.line(organizerLineX1, lineY, organizerLineX2, lineY);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Platforma asoschisi', (organizerLineX1 + organizerLineX2) / 2, textY, { align: 'center' });

  // --- Load and Insert Signature Image ---
  const signatureImage = new Image();
  signatureImage.src = '/signature.png'; // manzil to'g'ri bo'lishi kerak

  signatureImage.onload = () => {
    const sigWidth = 45;
    const sigHeight = 15;
    const sigX = (organizerLineX1 + organizerLineX2) / 2 - sigWidth / 2;
    const sigY = lineY - sigHeight + 2;

    pdf.addImage(signatureImage, 'PNG', sigX, sigY, sigWidth, sigHeight);

    // PDF saqlash
    const fileName = `${studentName.replace(/\s+/g, '_')}_Zakovat_Sertifikat.pdf`;
    pdf.save(fileName);
  };

  signatureImage.onerror = () => {
    const fileName = `${studentName.replace(/\s+/g, '_')}_Zakovat_Sertifikat.pdf`;
    pdf.save(fileName);
  };
};
