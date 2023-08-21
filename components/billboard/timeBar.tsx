// Timebar.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Timebar = ({ startDate, endDate }: {startDate: any, endDate: any}) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const totalTime = endDate.getTime() - startDate.getTime();
      const timeDifference = endDate.getTime() - now.getTime();
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setProgress(1 - timeDifference / totalTime);
      } else {
        setTimeRemaining('Time Expired');
        setProgress(1);
      }
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startDate, endDate]);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Start: {startDate.toISOString().slice(0, 10)}</Text>
        <Text style={styles.dateText}>End: {endDate.toISOString().slice(0, 10)}</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.timeRemainingText}>Remaining: {timeRemaining}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
  },
  timeRemainingText: {
    marginTop: 5, 
    fontSize: 14,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
});

export default Timebar;
