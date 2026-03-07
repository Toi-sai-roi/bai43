import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';

// Lấy chiều rộng màn hình để fix lỗi biến width chưa định nghĩa
const { width } = Dimensions.get('window');

export default function App() {
  const [phone, setPhone] = useState("");

  const validatePhone = () => {
    const regex = /^[0-9]{10}$/;
    if (phone === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    if (regex.test(phone)) {
      alert("Số điện thoại hợp lệ");
    } else {
      alert("Số điện thoại không đúng định dạng (cần 10 số)");
    }
  };

  // Kiểm tra xem đã nhập đủ 10 số chưa để đổi màu nút
  const isReady = phone.length === 10;

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
          onChangeText={setPhone}
          maxLength={10}
        />

        {/* Thêm style động: nếu đủ 10 số thì nút xanh lên */}
        <TouchableOpacity 
          style={[styles.continueBtn, isReady && styles.continueBtnActive]} 
          onPress={validatePhone}
        >
          <Text style={[styles.continueText, isReady && {color: '#fff'}]}>Tiếp tục</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa màn hình nếu cần
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
    paddingVertical: 12,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 40,
  },
  continueBtn: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueBtnActive: {
    backgroundColor: '#007AFF', // Màu xanh đặc trưng mobile
  },
  continueText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
});