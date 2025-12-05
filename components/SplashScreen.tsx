import { Plus } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const activeColor = "#F65558";

export default function SplashScreen() {
  // Ganti URL ini dengan import gambar lokal yang benar
  // Contoh: const logoSource = require("../assets/images/hourglass-logo.png");
  // Untuk keperluan contoh ini, saya akan menggunakan sebuah representasi.
  // Jika kamu ingin menampilkan Image dari file yang diupload, kamu perlu memastikan file tersebut
  // diletakkan di folder assets dan di-require dengan benar.

  // Karena kamu ingin menggunakan ICON dari lucide DAN gambar, saya akan kombinasikan keduanya
  // atau hanya menggunakan Image karena gambar yang kamu berikan sudah merupakan logo lengkap.
  // Namun, untuk memenuhi permintaan "icon dari lucide", saya akan membuat ulang tampilan tersebut
  // menggunakan komponen Image untuk logo utamanya, dan Text untuk tulisan Timer+.

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* LOGO IMAGE */}
        {/* Ganti 'placeholder-image-url' dengan cara yang benar untuk memuat gambar kamu. */}
        {/* Jika gambar sudah diletakkan di folder 'assets', gunakan require() */}
        <Image
          source={require("../assets/images/logo.png")} // Pastikan path ini benar!
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* TITLE TEXT */}
        <View style={{ flexDirection: "row", gap: 3, }}>
          <Text style={styles.titleText}>
            Timer
          </Text>
          <Plus size={24} color={activeColor} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef8f8ff", // Background yang sama dengan Index.tsx
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100, // Geser sedikit ke atas agar terlihat di tengah
  },
  logoImage: {
    // Sesuaikan dimensi ini agar sesuai dengan ukuran logo di gambar kamu
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000000",
  },
  plusText: {
    fontSize: 24, // Sedikit lebih kecil dari 'Timer'
    color: activeColor,
    fontWeight: "700",
    // Penyesuaian posisi jika diperlukan
    // position: 'relative',
    // top: -5,
  },
});
