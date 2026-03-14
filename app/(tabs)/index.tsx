import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

const Stack = createNativeStackNavigator();


// LOGIN SCREEN
function LoginScreen({ navigation } : any) {

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const formatPhone = (text : any) => {

    const numbers = text.replace(/[^0-9]/g, "");

    let formatted = numbers;

    if (numbers.length > 3 && numbers.length <= 6) {
      formatted = numbers.slice(0,3) + " " + numbers.slice(3);
    } 
    else if (numbers.length > 6 && numbers.length <= 8) {
      formatted = numbers.slice(0,3) + " " + numbers.slice(3,6) + " " + numbers.slice(6);
    }
    else if (numbers.length > 8) {
      formatted = numbers.slice(0,3) + " " + numbers.slice(3,6) + " " + numbers.slice(6,8) + " " + numbers.slice(8,10);
    }

    setPhone(formatted);
  };

  const validatePhone = () => {

    const rawPhone = phone.replace(/\s/g, "");
    const regex = /^0[1-9][0-9]{8,}$/;

    if (rawPhone === "") {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    if (!regex.test(rawPhone)) {
      setError("Số điện thoại không đúng định dạng. Vui lòng nhập lại");
      return;
    }

    setError("");

    navigation.navigate("Home", { phone: phone });
  };

  const isReady = phone.replace(/\s/g, "").length >= 10;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Nhập số điện thoại</Text>

        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={formatPhone}
          maxLength={13}
        />

        {error !== "" && (
          <Text style={styles.error}>{error}</Text>
        )}

        <TouchableOpacity
          style={[styles.continueBtn, isReady && styles.continueBtnActive]}
          onPress={validatePhone}
        >
          <Text style={[styles.continueText, isReady && { color: "#fff" }]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>

        <StatusBar style="auto" />

      </View>
    </View>
  );
}


// HOME SCREEN
function HomeScreen({ route, navigation } : any) {

  const { phone } = route.params;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <Text style={styles.title}>Trang chủ</Text>

        <Text style={{ marginTop: 20, fontSize: 16 }}>
          Số điện thoại: {phone}
        </Text>

        <TouchableOpacity
          style={[styles.continueBtn, styles.continueBtnActive, { marginTop: 30 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.continueText, { color: "#fff" }]}>
            Đăng xuất
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}


// APP
export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}


// STYLE
const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    width: width > 500 ? 400 : '100%',
    maxWidth: 400,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 30,
  },

  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 14,
    paddingHorizontal: 6,
    fontSize: 18,
    marginTop: 30,
  },

  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: 15,
    fontSize: 13,
  },

  continueBtn: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  continueBtnActive: {
    backgroundColor: '#007AFF',
  },

  continueText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },

});