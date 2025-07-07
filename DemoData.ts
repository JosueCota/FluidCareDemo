import { Intervals, Items, Notifications, User } from "./DataTypes";

export const todaysNotifications: Notifications[] = [
  {
    notification_id: 1,
    identifier: "23123123",
    message:
      "Your interval is about to end, make sure to update your medicine!",
    date: "2011-10-05T14:48:00.000Z",
    type: "interval",
    is_finished: false,
  },
  {
    notification_id: 2,
    identifier: "178238674",
    message: "Take your morning pills!",
    date: "2011-10-05T14:48:00.000Z",
    type: "meds",
    is_finished: true,
  },
  {
    notification_id: 3,
    identifier: "123871923",
    message: "Take your afternoon pills!",
    date: "2011-10-05T14:48:00.000Z",
    type: "meds",
    is_finished: true,
  },
  {
    notification_id: 4,
    identifier: "12370129830",
    message: "Take your night pills!",
    date: "2011-10-05T14:48:00.000Z",
    type: "meds",
    is_finished: false,
  },
  {
    notification_id: 4,
    identifier: "232311111",
    message: "Refill your ibuprofen 200mg for 30 tablets.",
    date: "2011-10-05T14:48:00.000Z",
    type: "refill",
    is_finished: false,
  },
];

export const intervalItems: Items[] = [
    {
        user_id: 1,
        interval_id: 1,
        item_id: 1,
        name: "Coke",
        amount: 350,
        type: "soda"
    },
    {
        user_id: 1,
        interval_id: 1,
        item_id: 2,
        name: "Sprite",
        amount: 250,
        type: "soda"
    },
    {
        user_id: 1,
        interval_id: 1,
        item_id: 3,
        name: "Water",
        amount: 350,
        type: "water"
    },
    {
        user_id: 1,
        interval_id: 4,
        item_id: 4,
        name: "Water",
        amount: 425,
        type: "soda"
    },
    {
        user_id: 1,
        interval_id: 5,
        item_id: 5,
        name: "Gatorade",
        amount: 100,
        type: "energy"
    },
];

export const intervals: Intervals[] = [
    // {
    //     user_id: 1,
    //     interval_id: 1,
    //     fluid_amount: 1,
    //     arrival_weight:1,
    //     leaving_weight:1,
    //     start_date: string,
    //     end_date: string,
    //     created_date: string,
    // }
];

export const currentInterval: Intervals = {
    user_id: 1,
    interval_id: 1,
    fluid_amount: 1475,
    arrival_weight: undefined,
    leaving_weight:undefined,
    start_date: new Date().toISOString(),
    end_date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    created_date: new Date().toISOString()
}

export const user : User = {
    id: 1,
    name: "Test User",
    dial_days:"1:3:5",
    dial_time: "12:30"
}

