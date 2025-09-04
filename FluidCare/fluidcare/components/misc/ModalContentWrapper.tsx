import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import IconButton from "../form/IconButton";
import { useTranslation } from "react-i18next";

type Props = {
  headerLabel?: string;
  closeModal?: (value: React.SetStateAction<boolean>) => void;
  subtitle?: string;
  headerStyle?: string;
  children: ReactNode;
  allowClose?: boolean;
};

const ModalContentWrapper = ({
  headerLabel,
  closeModal,
  subtitle,
  headerStyle,
  children,
  allowClose = true,
}: Props) => {
  const { t } = useTranslation();

  return (
    <View className="flex bg-white px-3 py-4 mx-1 rounded-md">
      <View className="flex-row items-center justify-between pl-1">
        {headerLabel && <Text className={`text-2xl font-bold ${headerStyle}`}>
          {t(headerLabel)}
        </Text>}
        {allowClose && closeModal && (
          <IconButton
            style="border p-1"
            iconName="close"
            size={16}
            onPress={() => closeModal(false)}
          />
        )}
      </View>
      {subtitle && (
        <Text className="text-grey-200 pl-2 mt-1 whitespace-pre-wrap">
          {t(subtitle)}
        </Text>
      )}
      {children}
    </View>
  );
};

export default ModalContentWrapper;
