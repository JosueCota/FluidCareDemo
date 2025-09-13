import { MaterialIcons } from "@expo/vector-icons"
import { FormikErrors } from "formik"
import { ComponentProps } from "react"

/////////////////// DATABASE TABLE TYPES ///////////////////
export type User = {
    id?: number,
    name: string, // TEXT(100)
    dial_days: string, // TEXT(20)
    dial_time: string, // TEXT(20)
}

export type Intervals = {
    user_id: number,
    interval_id?: number,
    fluid_amount?: number, // Total Fluid Drunk
    arrival_weight?:number, // Set after dialysis
    leaving_weight?:number, // Set after dialysis
    sentiment?: 1 | 2 | 3 | 4 | 5, // How you felt after dialysis
    start_date:string, // Automatically assigned to current time
    end_date:string, // Datetime Format (grab datetime(now) when interval ends)
    created_date: string
}

export type Dry_Weight = {
    user_id: number,
    dry_weight_id?: number,
    weight: number, 
    date?:string, // Automatically assigned to current time
}

export type Items = {
    user_id: number,
    interval_id: number,
    item_id?: number,
    name: string, // TEXT(100)
    amount:number, 
    type: DrinkTypes, // TEXT(20)
}

export type Favorite_Items = {
    user_id: number,
    favorite_id?: number,
    name: string, // TEXT(100)
    amount: number,
    type: DrinkTypes, // TEXT(20)
};

export type Medication_Groups = {
    user_id: number,
    group_id: number,
    name: string,
    days?: string,
    time?: string,
    notes?: string,
    reminder?: boolean
};

export type Medications = {
    med_group_id: number,
    medication_id: number,
    name: string,
    amount: number,
    unit: MedicationUnits,
    notes?:string,
    refill_reminder?: string
};

export type Notifications = {
    user_id: number,
    notification_id: number,
    identifier: string,
    header:string,
    message: string,
    is_finished: boolean,
    reference_id?:number,
    date: string,
    type: NotificationTypes
};

/////////////////// PROP TYPES ///////////////////
export type AddFavoriteItem = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<FormValues>>;
  item: Favorite_Items;  
};

export type Slides = {
    id: string,
    component: React.JSX.Element
}

/////////////////// UTILITY TYPES ///////////////////
export type Units = "imperial" | "metric";

export type Theme = "light"|"dark";

export type Languages = "en" | "es";

export type Option = {
    value: string | number,
    t: string
};

export type FormValues = {
    [key: string]: any
};

export type DrinkTypes = "water" | "soda" | "juice" | "energy" | "coffee" | "other";

export type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export type TimeFrame = {
    year: number,
    month: number
};

export type NotificationTypes = "refill" | "meds" | "interval";

export type Accordion = {
    label: string,
    content: string
};

export type MedicationUnits = "pill" | "ml" | "mg" | "mcg" | "IU" | "g";

export type NotificationsFilter = "all" | "meds" | "refill" | "interval";