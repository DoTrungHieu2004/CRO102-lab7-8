import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function TabTwoScreen() {
  const [user, setUser] = useState<User | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '909139847872-b5vtqm65rcv31juv09i6lvsp6fnroqk2.apps.googleusercontent.com',
    androidClientId: '909139847872-a29frianae3qb26r4kmsrg5ue1g90thm.apps.googleusercontent.com'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    };
    signInWithGoogle();
  }, [response]);

  const handleLogout = async () => {
    await signOut(auth);
  };

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
          <TouchableOpacity
            disabled={!request}
            style={styles.button}
            onPress={() => promptAsync()}>
              <Text style={styles.buttonText}>Đăng nhập bằng Google</Text>
            </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
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
});