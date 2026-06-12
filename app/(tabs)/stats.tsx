import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../store/hooks';
import { HabitAction } from '../../store/habitsSlice';

const MAX_WIDTH = 1400;

const ACTION_LABEL: Record<HabitAction, { text: string; color: string }> = {
  complete: { text: 'Выполнено', color: '#16a34a' },
  skip: { text: 'Пропущено', color: '#f59e0b' },
  reset: { text: 'Сброшено', color: '#6b7280' },
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function StatsScreen() {
  const history = useAppSelector((state) => state.habits.history);
  const totalCompletions = useAppSelector((state) => state.habits.totalCompletions);
  const habitsCount = useAppSelector((state) => state.habits.habits.length);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.cards}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCompletions}</Text>
          <Text style={styles.statLabel}>Всего выполнений</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{habitsCount}</Text>
          <Text style={styles.statLabel}>Привычек</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>История действий</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const label = ACTION_LABEL[item.action];
          return (
            <View style={styles.row}>
              <View style={styles.rowMain}>
                <Text style={styles.rowTitle}>{item.habitTitle}</Text>
                <Text style={styles.rowTime}>{formatTime(item.timestamp)}</Text>
              </View>
              <Text style={[styles.badge, { color: label.color }]}>{label.text}</Text>
            </View>
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>История пуста. Выполните привычку!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  cards: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  statValue: { fontSize: 32, fontWeight: '800', color: '#2563eb' },
  statLabel: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 8,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  rowMain: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  rowTime: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  badge: { fontSize: 13, fontWeight: '700', marginLeft: 10 },
  empty: { textAlign: 'center', color: '#9ca3af', marginTop: 40, fontSize: 15 },
});
