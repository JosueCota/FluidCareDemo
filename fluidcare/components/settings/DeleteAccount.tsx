import CustomButton from "@/components/form/CustomButton";
import CustomTextInput from "@/components/form/CustomTextInput";
import ValidationError from "@/components/form/ValidationError";
import CustomModal from "@/components/misc/CustomModal";
import ModalContentWrapper from "@/components/misc/ModalContentWrapper";
import { useUser } from "@/context/UserContext";
import { showToast } from "@/utility/utilityFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

type error = {
  deletePrompt?: string;
};

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteAccount = ({ isOpen, setIsOpen }: Props) => {

  const { setUser } = useUser();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("user", "-1");
      await AsyncStorage.setItem("dailyIntake", "1000");
      await AsyncStorage.setItem("theme", "light");

      setUser(-1);
    } catch (err) {
      console.log(err);
    } finally {
      showToast("error", t("toast-deleted"), t("deleted-account-toast-subtitle"));
      router.replace("/LandingScreen");
    }
  };


  return (
    <CustomModal isOpen={isOpen} withInput setIsOpen={setIsOpen}>
      <ModalContentWrapper
        headerLabel="nav-delete-acc"
        closeModal={setIsOpen}
        subtitle="delete-account-note"
      >
        <ScrollView>
          <Formik
            initialValues={{
              deletePrompt: "",
            }}
            onSubmit={() => handleSubmit()}
          >
            {({ handleChange, handleSubmit, errors, touched }) => (
              <View className="">
                <CustomTextInput
                  onChange={handleChange("deletePrompt")}
                  placeholder={t("delete-account-ph")}
                  id="confirmDelete"
                  style="border rounded-md"
                />
                {errors.deletePrompt && (
                  <ValidationError
                    error={errors.deletePrompt}
                    touched={touched.deletePrompt}
                  />
                )}
                <CustomButton
                  label={t("btn-confirm")}
                  onPress={handleSubmit}
                  style={"bg-white border mt-4"}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </ModalContentWrapper>
    </CustomModal>
  );
};

export default DeleteAccount;
