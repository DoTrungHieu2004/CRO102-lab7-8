import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Đăng nhập thất bại: ' + (error as any).message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Đăng ký thất bại: ' + (error as any).message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (initializing) return null;

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.greeting}>Xin chào {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType='email-address'
          />
          <TextInput
            placeholder='Mật khẩu'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  button: {
    width: '100%',
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 12,
    borderRadius: 8,
    padding: 12
  }
});