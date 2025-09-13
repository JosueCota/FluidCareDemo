import React, {  useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import CustomButton from '../form/CustomButton';
import { router } from 'expo-router';
import Radio from '../form/Radio';
import InputLabel from '../form/InputLabel';
import { Medication_Groups, Medications } from '@/utility/types';
import { showToast  } from '@/utility/utilityFunctions';
import CustomDropdown from '../form/CustomDropdown';
import { useTranslation } from 'react-i18next';
import { medicationGroups } from '@/utility/DemoData';

type Props = {
  slideScreen: (next: -1 | 1) => void;
};

const ChooseCreateTypeSlide = ({slideScreen}: Props) => {
  const [type, setType] = useState<"create" | "duplicate">("create")
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groups, setGroups] = useState<Medication_Groups[]>(medicationGroups);

  const {t} = useTranslation();

  const handleCreateDuplicate = () => {
    
    if (selectedGroup === 0) {
      showToast("info", t("No Duplicate Chosen"), t("Please pick a previous group before creating a duplicate!"), 3000)
      return;
    }

    const selectGroup = groups?.find((group) => group.group_id === selectedGroup);

    showToast("success", t("Successfully Duplicated Group"), `${t("You have successfully duplcated")} ${selectGroup?.name}`);
    router.replace("/(tabs)/(medication)");
  }

  return (
    <View className='flex-1 mb-2 w-[100vw] rounded-md'>
      <ScrollView className='flex-1 w-[95%] mx-auto mt-4'>
        
        <Text className='text-2xl font-semibold'>{t('medication-type-header')}</Text>
        <Radio checkedValue={type} onChange={setType} options={[{value:"create", label:t("medication-type-btn-create")}, {value:"duplicate", label:t("medication-type-btn-dupe")}]} style='flex-col w-full' activeColor='bg-blue-200'/>
      
        {type === "duplicate" && groups && 
          <View className='w-[95%] gap-2 mt-4'>
            <InputLabel label={t('medication-type-dupe-label')}/>
            <CustomDropdown data={groups?.map((group) => {
              return {
                label:group.name,
                value:group.group_id
              }
            })} value={selectedGroup} setValue={setSelectedGroup} />
            <Text className='text-md text-grey-200'>{t("medication-type-dupe-note")}</Text>
          </View>
        }
      </ScrollView>
      <View className="pt-2 mt-2 bg-white border-t border-gray-200 flex-row ">
        <CustomButton
          label="btn-cancel"
          textStyle="text-white"
          style="bg-blue-300  w-[30%]"
          onPress={() => router.back()}
        />
        {type === "create"? 
          <CustomButton
          label="btn-next"
          textStyle="text-white"
          style={`bg-blue-300 w-[30%]`}
          onPress={() => slideScreen(1)}
          />
        :
          <CustomButton
          label="btn-create"
          textStyle="text-white"
          style={`bg-blue-300 w-[30%]`}
          disabled={selectedGroup === 0}
          onPress={() => handleCreateDuplicate()}
          />
        }
      </View>
    </View>
  )
}

export default ChooseCreateTypeSlide
