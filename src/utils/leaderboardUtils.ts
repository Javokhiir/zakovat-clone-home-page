
import { supabase } from '@/integrations/supabase/client';

export const updateLeaderboard = async (userId: string, score: number) => {
  try {
    // Get user profile info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single();

    if (!profile) return;

    // Get current user stats from quiz_results
    const { data: results } = await supabase
      .from('quiz_results')
      .select('score')
      .eq('user_id', userId);

    const gamesPlayed = results?.length || 0;
    const totalScore = results?.reduce((sum, result) => sum + result.score, 0) || 0;

    // Upsert leaderboard entry
    await supabase
      .from('leaderboard')
      .upsert({
        user_id: userId,
        full_name: profile.full_name || 'Foydalanuvchi',
        games_played: gamesPlayed,
        total_score: totalScore,
        updated_at: new Date().toISOString()
      });

    // Update rankings
    await updateRankings();
  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
};

const updateRankings = async () => {
  try {
    // Get all leaderboard entries ordered by total score
    const { data: entries } = await supabase
      .from('leaderboard')
      .select('*')
      .order('total_score', { ascending: false });

    if (!entries) return;

    // Update rank positions and medal types
    const updates = entries.map((entry, index) => {
      const rank = index + 1;
      let medalType = null;
      
      if (rank === 1) medalType = 'gold';
      else if (rank === 2) medalType = 'silver';
      else if (rank === 3) medalType = 'bronze';

      return {
        id: entry.id,
        rank_position: rank,
        medal_type: medalType
      };
    });

    // Batch update rankings
    for (const update of updates) {
      await supabase
        .from('leaderboard')
        .update({
          rank_position: update.rank_position,
          medal_type: update.medal_type
        })
        .eq('id', update.id);
    }
  } catch (error) {
    console.error('Error updating rankings:', error);
  }
};
