import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ItemSchema } from "@/utility/yupSchemas";
import CustomTextInput from "../../form/CustomTextInput";
import ValidationError from "../../form/ValidationError";
import { drinkTypes } from "@/utility/data";
import { useUser } from "@/context/UserContext";
import CustomDropdown from "../../form/CustomDropdown";
import { useTranslation } from "react-i18next";
import {
  getFluidTag,
} from "@/utility/utilityFunctions";
import CrossSVG from "@/assets/icons/misc/xcross.svg";
import StarSVG from "@/assets/icons/misc/star-filled.svg";
import IconButton from "../../form/IconButton";
import ModalContentWrapper from "../../misc/ModalContentWrapper";
import CustomModal from "../../misc/CustomModal";
import CustomButton from "../../form/CustomButton";
import { Favorite_Items, Items } from "@/utility/types";
import FavoriteItem from "./FavoriteItem";
import { favoriteItems as FavoriteItems } from "@/utility/DemoData";
import { MaterialIcons } from "@expo/vector-icons";

type SubmitType = "add" | "favorite";

type FormValues = {
  name: string;
  amount: number | undefined;
  type: string;
  submitType: SubmitType;
};

const AddItemForm = () => {
  const { t } = useTranslation();
  const { unit } = useUser();

  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<Favorite_Items[]>(FavoriteItems);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  const inputRef = useRef<TextInput>(null);
  
  const getFavoriteItems = async () => {
    setFavoriteItems(favoriteItems);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(prev => !prev)} className={`p-2 w-[95%] mx-auto rounded-md bg-blue-200 flex-row items-center gap-2`}>
        <MaterialIcons name="water-drop" size={24}/>
        <Text className={`inline text-2xl font-semibold ${show? "text-center": "text-center"} `}>
          {t("input-item-form-label")}
        </Text>
      </TouchableOpacity>  
      <CustomModal isOpen={show} setIsOpen={setShow} withInput>
        <ModalContentWrapper headerLabel="input-item-form-label" closeModal={setShow}>
          <ScrollView>
            <Formik<FormValues>
              initialValues={{
                name: "",
                amount: undefined,
                type: "water",
                submitType: "add",
              }}
              validationSchema={ItemSchema}
              onSubmit={() => {}}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                setFieldValue,
                errors,
                touched,
              }) => (
                <View className="flex-column justify-center">
      
                  <View className="flex-row">
                    <View className="flex-1">
                      <CustomTextInput
                        value={values.name}
                        id="item-name"
                        placeholder={t("input-item-name-ph")}
                        onChange={handleChange("name")}
                        style="px-4 border-b"
                        returnKeyType="next"
                        onSubmitEditing={() => inputRef.current?.focus()}
                        />
                      <ValidationError
                        error={errors.name}
                        touched={touched.name}
                        />
                      <CustomTextInput
                        value={values.amount}
                        id="item-name"
                        ref={inputRef}
                        placeholder={t("input-item-amount-ph")}
                        onChange={handleChange("amount")}
                        style="px-4 border-b"
                        unit={getFluidTag(unit)}
                        unitStyle="bg-white border-b"
                        keyboardType="number-pad"
                        />
                      <ValidationError
                        error={errors.amount}
                        touched={touched.amount}
                        />
                      <View className="my-2 px-[.175rem]">
                        <CustomDropdown
                          data={drinkTypes}
                          setValue={(item: Items) => setFieldValue("type", item)}
                          value={values.type}
                          icon
                        />
                        <ValidationError
                          error={errors.type}
                          touched={touched.type}
                          />
                      </View>
                    </View>
                    <View className="justify-between gap-5 py-3 items-center">
                      <IconButton
                        iconName="info"
                        size={28}
                        onPress={() => setInfoModalOpen(true)}
                        />
                      <IconButton
                        Icon={StarSVG}
                        size={28}
                        color="#FDDD5C"
                        onPress={() => {
                          setFieldValue("submitType", "favorite");
                          handleSubmit();
                        }}
                        style="bg-warning"
                        />
                      <IconButton
                        iconName="add"
                        size={28}
                        onPress={() => {
                          setFieldValue("submitType", "add");
                          handleSubmit();
                        }}
                        style="bg-success"
                        />
                    </View>
                  </View>
                  <CustomButton
                    label={t("favorites-button-label")}
                    style="border border-lightgrey bg-white py-2 w-[95%]"
                    textStyle="text-grey-300"
                    onPress={() => {
                      getFavoriteItems().then(() =>
                        setIsFavoritesModalOpen(true)
                    );
                  }}
                  />
                  <CustomModal
                  setIsOpen={setIsFavoritesModalOpen}
                  isOpen={isFavoritesModalOpen}
                  animation="none"
                  >
                    <ModalContentWrapper
                      closeModal={setIsFavoritesModalOpen}
                      headerLabel={t("favorites-modal-header")}
                      subtitle={t("favorites-modal-subtitle")}
                    >
                      <ScrollView
                        className={`${
                          favoriteItems?.length === 0 ? "m-auto" : "h-[250px]"
                        }`}
                      >
                        {favoriteItems?.map((item) => (
                          <FavoriteItem
                            key={item.favorite_id}
                            item={item}
                            setFieldValue={setFieldValue}
                          />
                        ))}
                        {favoriteItems?.length === 0 && (
                          <Text className="my-2 text-center text-lg font-bold bg-grey-200 p-2 rounded-md text-white">
                            {t("favorites-empty-error")}
                          </Text>
                        )}
                      </ScrollView>
                    </ModalContentWrapper>
                  </CustomModal>
                </View>
              )}
            </Formik>
          </ScrollView>

        </ModalContentWrapper>
      </CustomModal>
      <CustomModal setIsOpen={setInfoModalOpen} isOpen={infoModalOpen}>
        <ModalContentWrapper
          closeModal={setInfoModalOpen}
          headerLabel={t("add-item-form-info-header")}
        >
          <ScrollView className="px-3 mt-2 h-[250px]">
            <Text>{t("add-item-form-info-content")}</Text>
            <Image source={require("@/assets/images/SizeChart.png")} className="w-[100%] h-[220px] my-2" resizeMode="contain"/>
          </ScrollView>
        </ModalContentWrapper>
      </CustomModal>
    </View>
  );
};

export default AddItemForm;
