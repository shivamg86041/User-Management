import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from './Helper';

const UserForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [email, setEmail] = useState(initialData ? initialData.email : '');
  const [phone, setPhone] = useState(initialData ? initialData.phone : '');
  const [selectedImage, setSelectedImage] = useState(initialData ? initialData.image : null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleSubmit = () => {
    const userData = {
      name,
      email,
      phone,
      image: selectedImage,
    };

    onSubmit(userData);
  };

  return (
    <View>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={(text) => setName(text)} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />

      <Text>Phone</Text>
      <TextInput value={phone} onChangeText={(text) => setPhone(text)} />

      <TouchableOpacity onPress={pickImage}>
        <Text>Select Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default UserForm;
