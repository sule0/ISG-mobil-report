// app/tabs/report.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase2'; // Firebase yapılandırma dosyan

interface Detection {
  id: string;
  deviceName: string;
  errorCode: string;
  timestamp: string;
}

const Reports: React.FC = () => {
  const [detections, setDetections] = useState<Detection[]>([]);

  useEffect(() => {
    const detectionsRef = ref(db, 'detections');
    const unsubscribe = onValue(detectionsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedDetections: Detection[] = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          loadedDetections.push({
            id: key,
            deviceName: data[key].deviceName,
            errorCode: data[key].errorCode,
            timestamp: data[key].timestamp,
          });
        }
      }

      setDetections(loadedDetections);
    });

    // Bileşen unmount olduğunda dinlemeyi bırak
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {detections.map((detection) => (
        <View key={detection.id} style={styles.card}>
          <Text style={styles.deviceName}>{detection.deviceName}</Text>
          <Text style={styles.errorCode}>{detection.errorCode}</Text>
          <Text style={styles.timestamp}>{detection.timestamp}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorCode: {
    color: 'red',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default Reports;
