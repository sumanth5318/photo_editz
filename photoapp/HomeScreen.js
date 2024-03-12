import React, { useState, useEffect } from 'react';
import { View, Image, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function PhotoEditor() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Image URI state:", image);
  }, [image]);

  // Function to pick an image from the device's gallery
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      console.log("ImagePicker Result:", result);
  
      if (!result.cancelled && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        console.log("Selected Image URI:", selectedImageUri);
        setImage(selectedImageUri);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  // Function to take a picture using the device's camera
  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log("ImagePicker Result:", result);

      if (!result.cancelled && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        console.log("Selected Image URI:", selectedImageUri);
        setImage(selectedImageUri);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  // Function to navigate to the Editing screen
  const navigateToEditingScreen = () => {
    if (image) {
      navigation.navigate('EditingScreen', { imageUri: image });
    } else {
      Alert.alert('Error', 'Please select an image first.');
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Take a picture</Text>
      </TouchableOpacity>
      {image && (
        <TouchableOpacity style={styles.editButton} onPress={navigateToEditingScreen}>
          <Text style={styles.editText}>Edit Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#17a2b8',
    padding: 10,
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
