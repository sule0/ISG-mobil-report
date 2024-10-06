// app/tabs/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase2'; 

interface Detection {
  id: string;
  deviceName: string;
  screenshot_url: string; 
  errorCode: string | null;
  timestamp: string | null; 
}

const IndexScreen: React.FC = () => {
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
            screenshot_url: data[key].screenshot_url,
            errorCode: data[key].errorCode || null, 
            timestamp: data[key].timestamp || null,
          });
        }
      }

      setDetections(loadedDetections);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Detection }) => {
    const hasError = item.errorCode && item.errorCode.trim() !== ''; // Uyarı olup olmadığını kontrol et
  
    const cardStyle = hasError ? [styles.card, styles.errorCard] : styles.card;
  
    return (
      <View style={cardStyle}>
        <Image
          source={{ uri: item.screenshot_url || 'https://via.placeholder.com/100x100.png?text=Camera' }}
          style={styles.image}
        />
        <Text style={styles.deviceName}>{item.deviceName}</Text>
        {hasError && <Text style={styles.errorCode}>{item.errorCode}</Text>}
        {item.timestamp && <Text style={styles.timestamp}>{item.timestamp}</Text>}
        
      </View>
    );
  };
  

  return (
    <FlatList
      data={detections}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {  
    padding: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCard: {
    borderColor: 'red', // Hata varsa kırmızı çerçeve
    borderWidth: 2, // Çerçeve kalınlığı
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorCode: {
    color: 'red',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default IndexScreen;
