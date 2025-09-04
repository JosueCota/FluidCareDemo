import { ScrollView } from "react-native";
import React, { useState } from "react";
import NavButton from "@/components/form/NavButton";
import CustomHeader from "@/components/misc/CustomHeader";
import DeleteAccount from "../../../components/settings/DeleteAccount";
import SupportIcon from "@/assets/icons/misc/support.svg";
import CustomButton from "@/components/form/CustomButton";

const Index = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white">
      <CustomHeader />
      <NavButton
        color="bg-grey-200"
        labelStyle="text-white text-lg"
        style="w-full mt-0"
        label="nav-med-discl"
        href={"/(tabs)/(settings)/MedicalDisclaimer"}
        chevronColor="white"
      />
      <NavButton
        iconName={"settings"}
        iconSize={24}
        label="nav-config"
        labelStyle="text-xl"
        href={"/(tabs)/(settings)/Configurations"}
      />
      <NavButton
        iconName="notifications"
        iconSize={24}
        label="nav-notifications"
        labelStyle="text-xl"
        href={"/(tabs)/(settings)/NotificationsPage"}
      />
      <NavButton
        Icon={SupportIcon}
        iconSize={24}
        label="nav-support"
        labelStyle="text-xl"
        href={"/(tabs)/(settings)/SupportPage"}
      />
      <CustomButton
        onPress={() => {
          setDeleteModalOpen(true);
        }}
        label="nav-delete-acc"
        style="rounded-md w-[90%] bg-danger py-5 my-4"
      />
      <DeleteAccount setIsOpen={setDeleteModalOpen} isOpen={deleteModalOpen} />
    </ScrollView>
  );
};

export default Index;
