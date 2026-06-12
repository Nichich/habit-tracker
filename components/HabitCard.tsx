import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  Habit,
  completeHabit,
  skipHabit,
  resetHabit,
  removeHabit,
} from '../store/habitsSlice';
import { useAppDispatch } from '../store/hooks';
import ProgressBar from './ProgressBar';

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  const dispatch = useAppDispatch();
  const isDone = habit.progress >= 100;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{habit.title}</Text>
        <Text style={[styles.percent, isDone && styles.percentDone]}>
          {habit.progress}%
        </Text>
      </View>

      <ProgressBar progress={habit.progress} />

      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, styles.complete]}
          onPress={() => dispatch(completeHabit(habit.id))}
        >
          <Text style={styles.btnText}>Выполнить</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.skip]}
          onPress={() => dispatch(skipHabit(habit.id))}
        >
          <Text style={styles.btnText}>Пропустить</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.reset]}
          onPress={() => dispatch(resetHabit(habit.id))}
        >
          <Text style={styles.btnText}>Сброс</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => dispatch(removeHabit(habit.id))} hitSlop={8}>
        <Text style={styles.remove}>Удалить привычку</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 17, fontWeight: '600', color: '#111827', flex: 1 },
  percent: { fontSize: 16, fontWeight: '700', color: '#2563eb', marginLeft: 8 },
  percentDone: { color: '#16a34a' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 14 },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  complete: { backgroundColor: '#16a34a' },
  skip: { backgroundColor: '#f59e0b' },
  reset: { backgroundColor: '#6b7280' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  remove: {
    marginTop: 12,
    textAlign: 'center',
    color: '#ef4444',
    fontSize: 13,
  },
});
