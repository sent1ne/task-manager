import { Alert } from "react-native";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export function useConfirm() {
  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    const {
      title,
      message,
      confirmText = "Confirm",
      cancelText = "Cancel",
      destructive = false,
    } = options;

    return new Promise((resolve) => {
      Alert.alert(title, message, [
        { text: cancelText, style: "cancel", onPress: () => resolve(false) },
        {
          text: confirmText,
          style: destructive ? "destructive" : "default",
          onPress: () => resolve(true),
        },
      ]);
    });
  };

  return { confirm };
}
