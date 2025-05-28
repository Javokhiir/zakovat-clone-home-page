
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

interface LeaderboardEntry {
  id: string;
  user_id: string;
  full_name: string;
  games_played: number;
  total_score: number;
  rank_position: number;
  medal_type: string | null;
}

const LiveBoardDynamic = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('total_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      // Update rank positions based on current order
      const rankedData = (data || []).map((entry, index) => ({
        ...entry,
        rank_position: index + 1,
        medal_type: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null
      }));
      
      setLeaderboard(rankedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Reytinglar yuklanmoqda...</div>
        </div>
      </section>
    );
  }

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
            {leaderboard.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                Hozircha reytinglar mavjud emas. Birinchi bo'lib quiz yechib ko'ring!
              </div>
            ) : (
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
                  {leaderboard.map((student) => (
                    <TableRow key={student.id} className="hover:bg-blue-50/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center justify-center">
                          {getMedalIcon(student.medal_type, student.rank_position)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {student.full_name}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{student.games_played}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-bold text-blue-600">
                        {student.total_score.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {getRankBadge(student.medal_type)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            * Reytinglar har test yakunlanganda yangilanadi
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveBoardDynamic;
