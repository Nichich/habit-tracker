import { View, StyleSheet } from 'react-native';

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  const value = Math.max(0, Math.min(100, progress));
  const color = value >= 100 ? '#16a34a' : value >= 50 ? '#2563eb' : '#f59e0b';

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
});
