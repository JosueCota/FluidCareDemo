import React, { useState } from "react";
import CustomButton from "./CustomButton";
import IconButton from "./IconButton";
import CustomModal from "../misc/CustomModal";
import ModalContentWrapper from "../misc/ModalContentWrapper";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

type Props = {
  btnLabel?: string;
  btnType: "button" | "icon";
  deleteFunction: () => any;
  btnStyle?: string;
  btnTextStyle?: string;
  iconSize?: number;
  modalSubtitle?: string;
  disabled?:boolean
};

const ConfirmButton = ({
  btnLabel = "btn-delete",
  btnType = "button",
  deleteFunction,
  btnStyle,
  iconSize,
  btnTextStyle,
  disabled = true,
  modalSubtitle
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  const handleDelete = async () => {
    try {
      deleteFunction();
    } catch (err) {
      console.log(err);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <>
      {btnType === "button" ? (
        <CustomButton
          label={btnLabel}
          disabled={disabled}
          style={`${btnStyle? btnStyle: 'border bg-white'}`}
          onPress={() => setOpenModal(true)}
          textStyle={btnTextStyle}
        />
      ) : (
        <IconButton
          style="bg-danger"
          iconName="delete"
          disabled
          onPress={() => setOpenModal(true)}
          size={iconSize ? iconSize : 24}
        />
      )}
      <CustomModal isOpen={openModal} setIsOpen={setOpenModal}>
        <ModalContentWrapper
          allowClose={false}
          closeModal={setOpenModal}
          subtitle={modalSubtitle? t(modalSubtitle) : t("confirm-delete-modal")}
        >
          <View className="flex-row">
            <CustomButton
              style="bg-white border py-2 my-4"
              onPress={() => setOpenModal(false)}
              label={"btn-cancel"}
            />
            <CustomButton
              style="bg-white border py-2 my-4"
              onPress={() => handleDelete()}
              label={"btn-confirm"}
            />
          </View>
        </ModalContentWrapper>
      </CustomModal>
    </>
  );
};

export default ConfirmButton;
