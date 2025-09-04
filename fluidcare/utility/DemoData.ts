import { drinkTypes } from "./data";
import {
  User,
  Intervals,
  Dry_Weight,
  Items,
  Favorite_Items,
  Medication_Groups,
  Medications,
  Notifications
} from "./types";

// ---------------- USER ----------------
export const user: User = 
  {
    id: 1,
    name: "Test User",
    dial_days: "1:3:5",
    dial_time: "14:00"
};

// ---------------- INTERVALS ----------------

const baseDate = new Date("2025-08-04T14:00:00.000Z");
const dialDaysOffsets = [0, 2, 4]; 

export const intervals: Intervals[] = Array.from({ length: 12 }, (_, i) => {
  const sessionIndex = i % 3;
  const start = new Date(baseDate);
  start.setDate(start.getDate() + Math.floor(i / 3) * 7 + dialDaysOffsets[sessionIndex]);

  const intervalStart = new Date(start);
  intervalStart.setHours(18, 0, 0, 0);

  const nextSession = new Date(start);
  if (sessionIndex === 0) nextSession.setDate(start.getDate() + 2);
  else if (sessionIndex === 1) nextSession.setDate(start.getDate() + 2); 
  else nextSession.setDate(start.getDate() + 3); 
  nextSession.setHours(14, 0, 0, 0);

  return {
    user_id: 1,
    interval_id: i + 1,
    fluid_amount: Math.floor(Math.random() * 1500) + 800,
    arrival_weight: 70 + Math.random() * 1.5,
    leaving_weight: 68 + Math.random() * 1.5,
    sentiment: (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5,
    start_date: intervalStart.toISOString(),
    end_date: nextSession.toISOString(),
    created_date: intervalStart.toISOString()
  };
});

// ---------------- DRY WEIGHTS ----------------
export const dryWeights: Dry_Weight[] = Array.from({length: 2}).map((item, i) => 
  {
    const date = intervals[Math.floor(Math.random()*intervals.length)].start_date
    return ({
      user_id: 1,
      dry_weight_id: i + 1,
      weight: 68 + i * 0.1,
      date: date
  })
});

// ---------------- MEDICATION GROUPS ----------------
export const medicationGroups: Medication_Groups[] = [
  {
    user_id: 1,
    group_id: 1,
    name: "Blood Pressure Control",
    days: "0:1:2:3:4:5",
    time: "08:00",
    notes: "Take before dialysis if scheduled.",
    reminder: true
  },
  {
    user_id: 1,
    group_id: 2,
    name: "Phosphate Binders",
    days: "1:3:5",
    time: "12:00",
    notes: "Take with lunch on dialysis days.",
    reminder: true
  },
  {
    user_id: 1,
    group_id: 3,
    name: "Vitamin D & Iron",
    days: "2:4:6",
    time: "09:00",
    notes: "Do not take on dialysis days.",
    reminder: false
  }
];

// ---------------- MEDICATIONS ----------------
export const medications: Medications[] = [
  // Group 1: Blood Pressure
  { med_group_id: 1, medication_id: 1, name: "Amlodipine", amount: 10, unit: "mg", notes: "Take daily", refill_reminder: "2025-09-15T08:00:00.000Z" },
  { med_group_id: 1, medication_id: 2, name: "Metoprolol", amount: 25, unit: "mg", notes: "Take morning only", refill_reminder: "2025-09-20T08:00:00.000Z" },
  { med_group_id: 1, medication_id: 3, name: "Hydralazine", amount: 50, unit: "mg", notes: "Only on dialysis days", refill_reminder: "2025-09-10T08:00:00.000Z" },

  // Group 2: Phosphate Binders
  { med_group_id: 2, medication_id: 4, name: "Sevelamer", amount: 800, unit: "mg", notes: "Take with food", refill_reminder: "2025-09-18T12:00:00.000Z" },
  { med_group_id: 2, medication_id: 5, name: "Calcium Carbonate", amount: 500, unit: "mg", notes: "After lunch", refill_reminder: "2025-09-12T12:00:00.000Z" },
  { med_group_id: 2, medication_id: 6, name: "Lanthanum", amount: 250, unit: "mg", notes: "Chew well", refill_reminder: "2025-09-25T12:00:00.000Z" },

  // Group 3: Vitamins
  { med_group_id: 3, medication_id: 7, name: "Cholecalciferol", amount: 1000, unit: "IU", notes: "Weekly dose", refill_reminder: "2025-09-30T09:00:00.000Z" },
  { med_group_id: 3, medication_id: 8, name: "Iron Sucrose", amount: 200, unit: "mg", notes: "IV infusion", refill_reminder: "2025-09-22T09:00:00.000Z" },
  { med_group_id: 3, medication_id: 9, name: "Folic Acid", amount: 5, unit: "mg", notes: "Daily supplement", refill_reminder: "2025-09-28T09:00:00.000Z" }
];

// ---------------- ITEMS ----------------
// Link items to random intervals
export const items: Items[] = Array.from({ length: 60 }, (_, i) => {
  const drinks = ["water", "coffee", "juice", "soda", "other", "energy"];
  return {
    user_id: 1,
    interval_id: Math.floor(Math.random() * intervals.length) + 1,
    item_id: i + 1,
    name: drinks[i % drinks.length],
    amount: Math.floor(Math.random() * 400) + 100,
    type: drinks[i % drinks.length] as any
  };
});

// ---------------- FAVORITE ITEMS ----------------
export const favoriteItems: Favorite_Items[] = [
  { user_id: 1, favorite_id: 1, name: "Water", amount: 250, type: "water" },
  { user_id: 1, favorite_id: 2, name: "Green Tea", amount: 200, type: "coffee" },
  { user_id: 1, favorite_id: 3, name: "Lemon Juice", amount: 300, type: "juice" },
  { user_id: 1, favorite_id: 4, name: "Black Coffee", amount: 150, type: "coffee" },
  { user_id: 1, favorite_id: 5, name: "Coconut Water", amount: 350, type: "juice" },
  { user_id: 1, favorite_id: 6, name: "Iced Tea", amount: 250, type: "coffee" },
  { user_id: 1, favorite_id: 7, name: "Sparkling Water", amount: 300, type: "water" },
  { user_id: 1, favorite_id: 8, name: "Orange Juice", amount: 250, type: "juice" },
  { user_id: 1, favorite_id: 9, name: "Latte", amount: 200, type: "coffee" },
  { user_id: 1, favorite_id: 10, name: "Chamomile Tea", amount: 200, type: "coffee" }
];

// ---------------- NOTIFICATIONS ----------------

export const todayNotifications: Notifications[] = [
  {
    user_id: 1,
    notification_id: 1,
    identifier: "notif-interval-today",
    header: "Dialysis Reminder",
    message: "Your dialysis session starts today at 14:00. Please arrive 15 minutes early.",
    is_finished: false,
    reference_id: 11, 
    date: "2025-09-03T14:00:00.000Z",
    type: "interval"
  },
  {
    user_id: 1,
    notification_id: 2,
    identifier: "notif-refill-metoprolol",
    header: "Refill Reminder For Metoprolol",
    message: "You're running low on Metoprolol 25mg. Please request a refill today.",
    is_finished: false,
    reference_id: 2, 
    date: "2025-09-03T10:00:00.000Z",
    type: "refill"
  },
  {
    user_id: 1,
    notification_id: 3,
    identifier: "notif-refill-sevelamer",
    header: "Refill Reminder For Sevelamer",
    message: "Your Sevelamer 800mg supply is almost out. Place a refill order soon.",
    is_finished: false,
    reference_id: 4, 
    date: "2025-09-03T11:30:00.000Z",
    type: "refill"
  },
  {
    user_id: 1,
    notification_id: 4,
    identifier: "notif-medgroup-bp",
    header: "Blood Pressure Control",
    message: "Take your Blood Pressure medications now (Amlodipine, Metoprolol, Hydralazine).",
    is_finished: false,
    reference_id: 1,
    date: "2025-09-03T08:00:00.000Z",
    type: "meds"
  },
  {
    user_id: 1,
    notification_id: 5,
    identifier: "notif-medgroup-binders",
    header: "Phosphate Binders",
    message: "Take your Phosphate Binders with lunch (Sevelamer, Calcium Carbonate, Lanthanum).",
    is_finished: false,
    reference_id: 2, 
    date: "2025-09-03T12:00:00.000Z",
    type: "meds"
  }
];

export const notifications: Notifications[] = [
  {
    user_id: 1,
    notification_id: 1,
    identifier: "notif-interval-1",
    header: "Dialysis Reminder",
    message: "Your dialysis session starts at 14:00 today.",
    is_finished: false,
    reference_id: intervals[10].interval_id,
    date: intervals[10].end_date,
    type: "interval"
  },
  {
    user_id: 1,
    notification_id: 2,
    identifier: "notif-interval-2",
    header: "Dialysis Reminder",
    message: "Get ready for your dialysis session at 14:00.",
    is_finished: false,
    reference_id: intervals[11].interval_id,
    date: "2025-06-21T08:00:00.000Z",
    type: "interval"
  },
  // Medications
  {
    user_id: 1,
    notification_id: 3,
    identifier: "notif-med-1",
    header: "Blood Pressure Control",
    message: "Take your meds at 8:00 AM.",
    is_finished: false,
    reference_id: 1,
    date: "2025-06-03T08:00:00.000Z",
    type: "meds"
  },
  {
    user_id: 1,
    notification_id: 4,
    identifier: "notif-med-2",
    header: "Medication Reminder",
    message: "Don't forget your Sevelamer 800mg with lunch.",
    is_finished: false,
    reference_id: 4,
    date: "2025-07-03T12:00:00.000Z",
    type: "meds"
  },
  {
    user_id: 1,
    notification_id: 5,
    identifier: "notif-med-3",
    header: "Medication Reminder",
    message: "Take Cholecalciferol 1000 IU now.",
    is_finished: false,
    reference_id: 7,
    date: "2025-06-03T09:00:00.000Z",
    type: "meds"
  },
  // Refills
  {
    user_id: 1,
    notification_id: 6,
    identifier: "notif-refill-1",
    header: "Refill Needed",
    message: "Your Metoprolol prescription is running low.",
    is_finished: false,
    reference_id: 2,
    date: "2025-06-10T08:00:00.000Z",
    type: "refill"
  },
  {
    user_id: 1,
    notification_id: 7,
    identifier: "notif-refill-2",
    header: "Refill Needed",
    message: "Order more Sevelamer before your next dialysis.",
    is_finished: false,
    reference_id: 4,
    date: "2025-07-12T12:00:00.000Z",
    type: "refill"
  },
  {
    user_id: 1,
    notification_id: 8,
    identifier: "notif-refill-3",
    header: "Refill Needed",
    message: "You're running low on Iron Sucrose.",
    is_finished: false,
    reference_id: 8,
    date: "2025-07-15T09:00:00.000Z",
    type: "refill"
  }
];


export const todaysItems: Items[] = [
  {
    user_id: 1,
    interval_id: 11, 
    item_id: 1,
    name: "Water",
    amount: 450, // ml
    type: "water"
  },
  {
    user_id: 1,
    interval_id: 11,
    item_id: 2,
    name: "Green Tea",
    amount: 300,
    type: "coffee"
  },
  {
    user_id: 1,
    interval_id: 11,
    item_id: 3,
    name: "Apple Juice",
    amount: 250,
    type: "juice"
  },
  {
    user_id: 1,
    interval_id: 11,
    item_id: 4,
    name: "Black Coffee",
    amount: 180,
    type: "coffee"
  },
  {
    user_id: 1,
    interval_id: 11,
    item_id: 5,
    name: "Sparkling Water",
    amount: 300,
    type: "water"
  },
  {
    user_id: 1,
    interval_id: 11,
    item_id: 6,
    name: "Large McDonalds Coke",
    amount: 950,
    type: "water"
  }
];

export const todaysInterval: Intervals = {
  user_id: 1,
  interval_id: 11,
  fluid_amount: 2430,
  arrival_weight: undefined, 
  leaving_weight: undefined, 
  sentiment: undefined, 
  start_date: "2025-08-31T14:00:00.000Z", 
  end_date: "2025-09-03T14:00:00.000Z", 
  created_date: "2025-09-03T08:00:00.000Z"
};