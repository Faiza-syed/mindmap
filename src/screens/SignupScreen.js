import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [qualification, setQualification] = useState(false);

  const handleSignup = async () => {
    try {
      await axios.post('http://<YOUR_BACKEND_IP>:5000/signup', {
        email,
        password,
        age: parseInt(age),
        gender,
        qualification
      });
      navigation.navigate('Login');
    } catch (error) {
      alert('Signup failed: ' + error.response?.data?.error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Text>Age</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text>Gender</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <Text>Educated?</Text>
      <Switch
        value={qualification}
        onValueChange={(val) => setQualification(val)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;