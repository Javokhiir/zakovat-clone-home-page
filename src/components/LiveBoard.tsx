
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LiveBoard = () => {
  // Mock ma'lumotlar - bu haqiqiy ma'lumotlar bilan almashtiriladi
  const topStudents = [
    {
      id: 1,
      name: 'Alijon Valiyev',
      gamesPlayed: 45,
      score: 2850,
      rank: 1,
      medal: 'gold'
    },
    {
      id: 2,
      name: 'Kamola Nazarova',
      gamesPlayed: 42,
      score: 2720,
      rank: 2,
      medal: 'silver'
    },
    {
      id: 3,
      name: 'Bobur Karimov',
      gamesPlayed: 38,
      score: 2650,
      rank: 3,
      medal: 'bronze'
    },
    {
      id: 4,
      name: 'Nilufar Tosheva',
      gamesPlayed: 35,
      score: 2480,
      rank: 4,
      medal: null
    },
    {
      id: 5,
      name: 'Sardor Umarov',
      gamesPlayed: 33,
      score: 2350,
      rank: 5,
      medal: null
    },
    {
      id: 6,
      name: 'Dildora Satarova',
      gamesPlayed: 31,
      score: 2220,
      rank: 6,
      medal: null
    },
    {
      id: 7,
      name: 'Jasur Rakhimov',
      gamesPlayed: 29,
      score: 2100,
      rank: 7,
      medal: null
    },
    {
      id: 8,
      name: 'Malika Yusupova',
      gamesPlayed: 27,
      score: 1950,
      rank: 8,
      medal: null
    }
  ];

  const getMedalIcon = (medal: string | null, rank: number) => {
    if (medal === 'gold') {
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    } else if (medal === 'silver') {
      return <Medal className="w-5 h-5 text-gray-400" />;
    } else if (medal === 'bronze') {
      return <Award className="w-5 h-5 text-orange-600" />;
    }
    return <span className="w-5 h-5 flex items-center justify-center font-bold text-gray-600">{rank}</span>;
  };

  const getRankBadge = (medal: string | null) => {
    if (medal === 'gold') {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Gold</Badge>;
    } else if (medal === 'silver') {
      return <Badge className="bg-gray-400 hover:bg-gray-500 text-white">Silver</Badge>;
    } else if (medal === 'bronze') {
      return <Badge className="bg-orange-600 hover:bg-orange-700 text-white">Bronze</Badge>;
    }
    return <Badge variant="outline">Ishtirokchi</Badge>;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Live Reytinglar Taxtasi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Eng bilimdon o'quvchilarimizning natijalar ro'yxati. Har bir test uchun ball to'planadi!
          </p>
        </div>

        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
              Top O'quvchilar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">O'rin</TableHead>
                  <TableHead>O'quvchi</TableHead>
                  <TableHead className="text-center">O'yinlar</TableHead>
                  <TableHead className="text-center">Ball</TableHead>
                  <TableHead className="text-center">Daraja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-blue-50/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center">
                        {getMedalIcon(student.medal, student.rank)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{student.gamesPlayed}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-bold text-blue-600">
                      {student.score.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {getRankBadge(student.medal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            * Reytinglar har 24 soatda yangilanadi
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveBoard;
