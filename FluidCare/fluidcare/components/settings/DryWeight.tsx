import { useUser } from '@/context/UserContext'
import { getWeightTag, showToast } from '@/utility/utilityFunctions'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { View } from 'react-native'
import CustomTextInput from '../form/CustomTextInput'
import ValidationError from '../form/ValidationError'
import CustomButton from '../form/CustomButton'
import { UpdateDryWeightSchema } from '@/utility/yupSchemas'
import { useTranslation } from 'react-i18next'
import ConfirmButton from '../form/ConfirmButton'
import { dryWeights } from '@/utility/DemoData'

type Props = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  loadData: () => Promise<void>
}

const DryWeight = ({setEditing, loadData}: Props) => {
  const { unit } = useUser();
  const [dryWeight, setDryWeight] = useState<number>(dryWeights[0].weight);
  const {t} = useTranslation();

const handleSubmit = async(values: {dryWeight: number}) => {
  showToast("success", t("toast-updated"), t("updated-dry-weight-toast-subtitle"));
  showToast("info", t("toast-no-update-header"), t("toast-no-update-message"))        
  setEditing(false);
  }

  return (
    <View>
        <Formik
            enableReinitialize
            initialValues={{
              dryWeight: dryWeight,
            }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={UpdateDryWeightSchema}
        >
            {({handleSubmit, errors, touched, handleChange, values})=> (
                <View>
                    <CustomTextInput
                    id="dryWeight"
                    label={"input-dry-weight-label"}
                    keyboardType="number-pad"
                    onChange={handleChange("dryWeight")}
                    tooltip="tooltip-dry-weight-profile"
                    style="mt-2 border border-r-0 rounded-l-md"
                    placeholder={t('dry-weight-placeholder')}
                    value={values.dryWeight}
                    unit={getWeightTag(unit)}
                    unitStyle="border mt-2 rounded-r-md bg-white"
                    />
                <ValidationError
                    error={errors.dryWeight}
                    touched={touched.dryWeight}
                    />
                  <View className='flex-row mt-2'>
                    <CustomButton label='btn-cancel' style='bg-danger' onPress={()=> setEditing(false)}/>
                    <ConfirmButton
                    btnType='button'
                    btnLabel='btn-update'
                    deleteFunction={() => handleSubmit()}
                    modalSubtitle='Are you sure you want to update this?'
                    />
                    
                  </View>
                </View>
            )}
        </Formik>
    </View>
  )
}

export default DryWeight
