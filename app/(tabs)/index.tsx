import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addHabit } from '../../store/habitsSlice';
import HabitCard from '../../components/HabitCard';

const MAX_WIDTH = 1400;

export default function HabitsScreen() {
  const habits = useAppSelector((state) => state.habits.habits);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const onAdd = () => {
    if (!title.trim()) return;
    dispatch(addHabit(title));
    setTitle('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Новая привычка..."
          placeholderTextColor="#9ca3af"
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <Pressable style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addBtnText}>＋</Text>
        </Pressable>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HabitCard habit={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Пока нет привычек. Добавьте первую!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  form: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  addBtn: {
    width: 48,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 26, lineHeight: 28 },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },
  empty: { textAlign: 'center', color: '#9ca3af', marginTop: 40, fontSize: 15 },
});
