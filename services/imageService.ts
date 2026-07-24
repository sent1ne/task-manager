import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { Alert } from "react-native";

const IMAGE_DIR = `${FileSystem.cacheDirectory}task-images/`;

async function ensureDirExists() {
  try {
    const dirInfo = await FileSystem.getInfoAsync(IMAGE_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
    }
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

export async function pickImage(): Promise<{
  uri: string;
  name: string;
} | null> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library.",
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]) return null;

    const asset = result.assets[0];
    const fileName = `task-image-${Date.now()}.jpg`;

    await ensureDirExists();
    const newPath = IMAGE_DIR + fileName;

    await FileSystem.copyAsync({ from: asset.uri, to: newPath });

    return { uri: newPath, name: fileName };
  } catch (error) {
    console.error("Pick image error:", error);
    Alert.alert("Error", "Failed to pick image");
    return null;
  }
}

export async function deleteImage(uri: string): Promise<void> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
