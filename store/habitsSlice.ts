import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface Habit {
  id: string;
  title: string;
  progress: number;
}

export type HabitAction = 'complete' | 'skip' | 'reset';

export interface HistoryEntry {
  id: string;
  habitId: string;
  habitTitle: string;
  action: HabitAction;
  timestamp: number;
}

interface HabitsState {
  habits: Habit[];
  history: HistoryEntry[];
  totalCompletions: number;
}

const STEP = 20;

const initialState: HabitsState = {
  habits: [
    { id: 'h1', title: 'Пить воду', progress: 40 },
    { id: 'h2', title: 'Зарядка', progress: 20 },
    { id: 'h3', title: 'Чтение книги', progress: 60 },
  ],
  history: [],
  totalCompletions: 0,
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function logAction(state: HabitsState, habit: Habit, action: HabitAction) {
  state.history.unshift({
    id: nanoid(),
    habitId: habit.id,
    habitTitle: habit.title,
    action,
    timestamp: Date.now(),
  });
}

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: {
      reducer(state, action: PayloadAction<Habit>) {
        state.habits.push(action.payload);
      },
      prepare(title: string) {
        return { payload: { id: nanoid(), title: title.trim(), progress: 0 } };
      },
    },

    completeHabit(state, action: PayloadAction<string>) {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (!habit) return;
      habit.progress = clamp(habit.progress + STEP);
      state.totalCompletions += 1;
      logAction(state, habit, 'complete');
    },

    skipHabit(state, action: PayloadAction<string>) {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (!habit) return;
      habit.progress = clamp(habit.progress - STEP);
      logAction(state, habit, 'skip');
    },

    resetHabit(state, action: PayloadAction<string>) {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (!habit) return;
      habit.progress = 0;
      logAction(state, habit, 'reset');
    },

    removeHabit(state, action: PayloadAction<string>) {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
  },
});

export const { addHabit, completeHabit, skipHabit, resetHabit, removeHabit } =
  habitsSlice.actions;

export default habitsSlice.reducer;
