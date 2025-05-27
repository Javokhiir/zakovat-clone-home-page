
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
  
  // Border
  pdf.setDrawColor(37, 99, 235); // blue-600
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Inner border
  pdf.setDrawColor(245, 158, 11); // amber-500
  pdf.setLineWidth(1);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);
  
  // Header - Logo area (placeholder)
  pdf.setFillColor(37, 99, 235); // blue-600
  pdf.circle(50, 40, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ZK', 45, 45);
  
  // Header text
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Zakovat Klubi', 70, 35);
  pdf.text('Intellektual O\'yinlar Markazi', 70, 42);
  
  // Main title
  pdf.setTextColor(37, 99, 235); // blue-600
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  const titleText = 'SERTIFIKAT';
  const titleWidth = pdf.getTextWidth(titleText);
  pdf.text(titleText, (pageWidth - titleWidth) / 2, 80);
  
  // Subtitle
  pdf.setTextColor(245, 158, 11); // amber-500
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  const subtitleText = 'Zakovat Testi Muvaffaqiyatli Yakunlangani Uchun';
  const subtitleWidth = pdf.getTextWidth(subtitleText);
  pdf.text(subtitleText, (pageWidth - subtitleWidth) / 2, 95);
  
  // Student name
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  const nameWidth = pdf.getTextWidth(studentName);
  pdf.text(studentName, (pageWidth - nameWidth) / 2, 120);
  
  // Achievement text
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  const achievementText = 'quyidagi natijaga erishdi:';
  const achievementWidth = pdf.getTextWidth(achievementText);
  pdf.text(achievementText, (pageWidth - achievementWidth) / 2, 135);
  
  // Score box
  pdf.setFillColor(245, 245, 245); // gray-100
  pdf.setDrawColor(209, 213, 219); // gray-300
  pdf.roundedRect(pageWidth/2 - 40, 145, 80, 30, 5, 5, 'FD');
  
  // Score text
  pdf.setTextColor(37, 99, 235); // blue-600
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  const scoreText = `${score}/${totalQuestions}`;
  const scoreWidth = pdf.getTextWidth(scoreText);
  pdf.text(scoreText, (pageWidth - scoreWidth) / 2, 165);
  
  // Percentage
  pdf.setTextColor(245, 158, 11); // amber-500
  pdf.setFontSize(16);
  const percentageText = `(${percentage}%)`;
  const percentageWidth = pdf.getTextWidth(percentageText);
  pdf.text(percentageText, (pageWidth - percentageWidth) / 2, 175);
  
  // Performance level
  pdf.setTextColor(31, 41, 55); // gray-800
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  const performanceText = percentage >= 90 ? 'A\'lo' : percentage >= 80 ? 'Yaxshi' : percentage >= 70 ? 'Qoniqarli' : 'Mashq Talab';
  const performanceWidth = pdf.getTextWidth(performanceText);
  pdf.text(performanceText, (pageWidth - performanceWidth) / 2, 185);
  
  // Date
  pdf.setFontSize(12);
  const dateText = `Sana: ${date}`;
  const dateWidth = pdf.getTextWidth(dateText);
  pdf.text(dateText, (pageWidth - dateWidth) / 2, 200);
  
  // Footer decorative elements
  pdf.setDrawColor(245, 158, 11); // amber-500
  pdf.setLineWidth(2);
  pdf.line(50, 215, pageWidth - 50, 215);
  
  // Footer text
  pdf.setTextColor(107, 114, 128); // gray-500
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  const footerText = 'Bu sertifikat Zakovat Klubi tomonidan berilgan';
  const footerWidth = pdf.getTextWidth(footerText);
  pdf.text(footerText, (pageWidth - footerWidth) / 2, 225);
  
  // Save the PDF
  const fileName = `${studentName.replace(/\s+/g, '_')}_Sertifikat.pdf`;
  pdf.save(fileName);
};
