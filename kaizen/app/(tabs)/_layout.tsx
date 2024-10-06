// _layout.tsx
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from '@/components/LoginScreen'; // Giriş ekranı
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} /> // Giriş ekranı göster
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors['light'].tint,
            headerShown: false,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Cameras',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'camera' : 'camera-outline'} color={color} />
              ),
            }}
          />
            <Tabs.Screen
              name="reports"
              options={{
                title: 'Report',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />
                ),
              }}
            />
        </Tabs>
      )}
    </View>
  );
}
