
import jsPDF from 'jspdf';

interface CertificateData {
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

export const generateCertificate = async (data: CertificateData) => {
  const { studentName, score, totalQuestions, percentage, date } = data;
  
  // Create new PDF document (A4 landscape)
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Colors
  const primaryColor = '#2563eb'; // blue-600
  const goldColor = '#f59e0b'; // amber-500
  const darkColor = '#1f2937'; // gray-800
  
  // Background gradient effect (using rectangles)
  pdf.setFillColor(240, 248, 255); // blue-50
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Decorative border
  pdf.setDrawColor(37, 99, 235); // blue-600
  pdf.setLineWidth(3);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);
  
  // Inner decorative border
  pdf.setDrawColor(245, 158, 11); // amber-500
  pdf.setLineWidth(1);
  pdf.rect(20, 20, pageWidth - 40, pageHeight - 40);
  
  // Header - Logo area
  pdf.setFillColor(37, 99, 235); // blue-600
  pdf.circle(50, 45, 18, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ZK', 43, 50);
  
  // Organization header
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ZAKOVAT KLUBI', 75, 40);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Intellektual Rivojlanish Markazi', 75, 47);
  pdf.text('Maktab Rahbariyati hamkorligida', 75, 52);
  
  // Main title
  pdf.setTextColor(37, 99, 235); // blue-600
  pdf.setFontSize(40);
  pdf.setFont('helvetica', 'bold');
  const titleText = 'MINNATDORCHILIK SERTIFIKATI';
  const titleWidth = pdf.getTextWidth(titleText);
  pdf.text(titleText, (pageWidth - titleWidth) / 2, 85);
  
  // Decorative line under title
  pdf.setDrawColor(245, 158, 11); // amber-500
  pdf.setLineWidth(2);
  pdf.line(pageWidth/2 - 80, 90, pageWidth/2 + 80, 90);
  
  // Appreciation text
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  const appreciationText = 'Ushbu sertifikat quyidagi shaxsga beriladi:';
  const appreciationWidth = pdf.getTextWidth(appreciationText);
  pdf.text(appreciationText, (pageWidth - appreciationWidth) / 2, 105);
  
  // Student name with decorative styling
  pdf.setTextColor(37, 99, 235); // blue-600
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  const nameWidth = pdf.getTextWidth(studentName);
  pdf.text(studentName, (pageWidth - nameWidth) / 2, 125);
  
  // Underline for name
  pdf.setDrawColor(245, 158, 11); // amber-500
  pdf.setLineWidth(1);
  pdf.line(pageWidth/2 - nameWidth/2 - 10, 130, pageWidth/2 + nameWidth/2 + 10, 130);
  
  // Main appreciation message
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  const messages = [
    'Zakovat Klubi tomonidan tashkil etilgan intellektual testda',
    'faol ishtirok etgani va o\'z bilim darajasini sinab ko\'rgani uchun',
    'samimiy minnatdorchilik va ehtirom bilan taqdirlaymiz.'
  ];
  
  messages.forEach((message, index) => {
    const messageWidth = pdf.getTextWidth(message);
    pdf.text(message, (pageWidth - messageWidth) / 2, 145 + (index * 8));
  });
  
  // Test results in a decorative box
  pdf.setFillColor(248, 250, 252); // gray-50
  pdf.setDrawColor(203, 213, 225); // gray-300
  pdf.roundedRect(pageWidth/2 - 50, 170, 100, 25, 3, 3, 'FD');
  
  pdf.setTextColor(37, 99, 235); // blue-600
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  const resultText = `Natija: ${score}/${totalQuestions} (${percentage}%)`;
  const resultWidth = pdf.getTextWidth(resultText);
  pdf.text(resultText, (pageWidth - resultWidth) / 2, 185);
  
  // Appreciation from leadership
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'italic');
  
  const leadershipMessages = [
    'Maktab rahbariyati va Zakovat Klubi tashkilotchilari tomonidan',
    'kelajakda ham bunday faoliyatlarda ishtirok etishingizni samimiy orzu qilamiz.',
    'Bilimingizni rivojlantirishda omadlar tilaymiz!'
  ];
  
  leadershipMessages.forEach((message, index) => {
    const messageWidth = pdf.getTextWidth(message);
    pdf.text(message, (pageWidth - messageWidth) / 2, 205 + (index * 6));
  });
  
  // Date and signatures area
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  // Date
  pdf.text(`Sana: ${date}`, 40, 235);
  
  // Signature lines
  pdf.setDrawColor(107, 114, 128); // gray-500
  pdf.line(40, 245, 120, 245);
  pdf.text('Klub rahbari', 40, 250);
  
  pdf.line(pageWidth - 120, 245, pageWidth - 40, 245);
  pdf.text('Maktab direktori', pageWidth - 120, 250);
  
  // Footer decorative elements
  pdf.setFillColor(245, 158, 11); // amber-500
  pdf.circle(30, pageHeight - 30, 8, 'F');
  pdf.circle(pageWidth - 30, pageHeight - 30, 8, 'F');
  
  // Footer message
  pdf.setTextColor(107, 114, 128); // gray-500
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  const footerText = '🏆 Har bir ishtirok - bilim yo\'lida qadamdir 🏆';
  const footerWidth = pdf.getTextWidth(footerText);
  pdf.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 15);
  
  // Save the PDF
  const fileName = `${studentName.replace(/\s+/g, '_')}_Ishtirok_Sertifikati.pdf`;
  pdf.save(fileName);
};
