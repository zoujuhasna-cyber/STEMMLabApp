import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Experiment } from '../types';

interface ExperimentCardProps {
  experiment: Experiment;
  onPress: () => void;
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment, onPress }) => {
  return (
    <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={Number(0.7)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
            name={String(experiment.icon || 'flask') as any}
            size={Number(30)}
            color={Colors.primary}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.category}>{String(experiment.category)}</Text>
        <Text style={styles.title}>{String(experiment.title)}</Text>
        <Text style={styles.description} numberOfLines={Number(2)}>
          {String(experiment.description)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={Number(20)} color={Colors.border} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Number(12),
    paddingTop: Number(15),
    paddingBottom: Number(15),
    paddingLeft: Number(15),
    paddingRight: Number(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Number(12),
    borderWidth: Number(1),
    borderColor: '#EEEEEE',
  },
  iconContainer: {
    width: Number(55),
    height: Number(55),
    borderRadius: Number(10),
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Number(15),
  },
  textContainer: {
    flex: Number(1),
  },
  category: {
    fontSize: Number(12),
    color: Colors.primary,
    textTransform: 'uppercase',
    marginBottom: Number(4),
  },
  title: {
    fontSize: Number(18),
    color: Colors.text,
    marginBottom: Number(4),
  },
  description: {
    fontSize: Number(14),
    color: Colors.textLight,
  },
});

export default ExperimentCard;
