import React, { useState } from 'react';
import { View, Image, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImageManipulator } from 'expo-image-manipulator';

export default function EditingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;
  const [editedImageUri, setEditedImageUri] = useState(null);

  // Function to apply basic edits like crop, rotate, flip
  const editImage = async () => {
    try {
        const manipResult = await ImageManipulator.manipulateAsync( imageUri,
            [{ resize: { width: 300 } }],
            { compress: 1, format: 'png', base64: false });
    //   const manipResult = await ImageManipulator.manipulateAsync(
    //     imageUri,
    //     [{ resize: { width: 300 } }],
    //     { compress: 1, format: 'png', base64: false }
    //   );

      setEditedImageUri(manipResult.uri);
    } catch (error) {
      console.error('Error editing image:', error);
      Alert.alert('Error', 'Failed to edit image.');
    }
  };

  // Function to navigate back to the Home Screen
  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: editedImageUri || imageUri }} style={{ width: 300, height: 300 }} />
      <Button title="Edit Image" onPress={editImage} />
      <Button title="Go to Home Screen" onPress={goToHomeScreen} />
    </View>
  );
}



