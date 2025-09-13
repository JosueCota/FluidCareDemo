import { unitIcons, unitMap } from '@/utility/data';
import { Medications } from '@/utility/types';
import { isoToFormattedDate } from '@/utility/utilityFunctions';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

const Medication = ({med}: {med: Medications}) => {
  const Icon = unitIcons[med.unit];
  const { i18n, t } = useTranslation();

    return (
        <View className="border-[#eee]  border p-4 rounded-md mb-4"
        >
        <View className="flex-row justify-between mb-1">
            <View className="flex-row gap-1 items-center">
            <Icon width={28} height={28} />
            <Text className="text-lg font-semibold">{med.name}</Text>
            </View>
            <View className="flex-row gap-2">
            <Text className="text-lg italic">{med.amount}</Text>
            <Text className="text-lg italic">{t(unitMap[med.unit])}(s)</Text>
            </View> 
        </View>
        {med.notes && (
            <View>
            <Text className="font-semibold">{t("med-group-notes")}:</Text>
            <Text className="text-grey-200">
                {"\t"}{med.notes}
            </Text>
            </View>
        )}
        {med.refill_reminder && (
            <View className="flex-row gap-2">
            <Text className="font-semibold">{t("med-group-refill-reminder")}:</Text>
            <Text className="italic">
                {isoToFormattedDate(med.refill_reminder, i18n.language)}
            </Text>
            </View>
        )}
        </View>
    );
}

export default Medication
