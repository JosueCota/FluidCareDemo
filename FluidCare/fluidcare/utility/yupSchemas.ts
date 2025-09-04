import * as Yup from "yup"

export const SignupSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'validation-short')
     .max(50, 'validation-long')
     .required('validation-required'),
   dryWeight: Yup.number()
     .min(0, 'validation-units')
     .integer("validation-integer")
     .lessThan(400)
     .required('validation-required'),
   dialDays: Yup.array()
   .test({
    message: "validation-days",
    test: arr => Array.isArray(arr) && arr.length >= 1
   }),
   dialTime: Yup.string()
   .required("validation-required")
 });

 export const UpdateUserSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'validation-short')
     .max(50, 'validation-long')
     .required('validation-required'),
   dialDays: Yup.array()
   .test({
    message: "validation-days",
    test: arr => Array.isArray(arr) && arr.length >= 1
   }),
   dialTime: Yup.string()
   .required("validation-required")
 });

 export const UpdateDryWeightSchema = Yup.object().shape({
    dryWeight: Yup.number()
      .min(10, 'validation-more-than-10')
      .integer("validation-integer")
      .lessThan(400)
      .required('validation-required'),
 })

export const ItemSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'validation-short')
     .max(25, 'validation-long')
     .required('validation-required'),
   amount: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .moreThan(1, "validation-too-little-2"),
   type: Yup.string()
   .required("validation-required")
 });


 export const FinalizingIntervalSchema = Yup.object().shape({
   arrivalWeight: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .test({
      message:"validation-finalize-bounds",
      test: num => num === -1 || num >= 10
    }),
   leavingWeight: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .test({
      message:"validation-finalize-bounds",
      test: num => num === -1 || num >= 10
    })
    .test("leaving-weight-more-than-arrival", "validation-leaving-weight", function(weight, context) {
      const { arrivalWeight } = context.parent
      if (arrivalWeight === -1 || weight === -1 ) {
        return true;
      }
      return weight < arrivalWeight && arrivalWeight - weight <= 8;
    }),
    sentiment: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError("validation-number")
    .min(1).max(5)
 });

export const DailyIntakeScheme = Yup.object().shape({
  fluidIntake: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .moreThan(10, "validation-more-than-10")
 });

 export const IntervalSchema = Yup.object().shape({
  totalAmount: Yup.number()
    .required("validation-required")
    .moreThan(10, "validation-more-than-10")
    .typeError('validation-number')
    .integer("validation-integer"),  
  arrivalWeight: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .test({
      message:"validation-finalize-bounds",
      test: num => num === -1 || num >= 10
    }),
   leavingWeight: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .test({
      message:"validation-finalize-bounds",
      test: num => num === -1 || num >= 10
    })
    .test("leaving-weight-more-than-arrival", "validation-leaving-weight", function(weight, context) {
      const { arrivalWeight } = context.parent
      if (arrivalWeight === -1 || weight === -1 ) {
        return true;
      }
      return weight < arrivalWeight && arrivalWeight - weight <= 8;
    }),
    startDate: Yup.date()
    .required("validation-required")
    .test("end-date-earlier-than-start", "validation-late", function(date, context) {
      const {endDate} = context.parent;
      if (!date || !endDate) return true; 
      return (date < endDate && date < new Date()) 
    }),
    endDate: Yup.date()
    .required("validation-required")
    .test("end-date-earlier-than-start", "validation-early-or-current", function(date, context) {
      const {startDate} = context.parent;
      date.setHours(12,0,0,0);
      if (!date || !startDate) return true; 
      return (date > startDate && date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
    })
 });

 export const UpdateIntervalSchema = Yup.object().shape({
    arrivalWeight: Yup.number()
    .moreThan(10, "validation-more-than-10")
    .integer("validation-integer")
    .typeError('validation-number')
    .required("validation-required"),
    leavingWeight: Yup.number()
    .integer("validation-integer")
    .typeError('validation-number')
    .moreThan(10, "validation-more-than-10")
    .required("validation-required"),
    totalFluid: Yup.number()
    .integer("validation-integer")
    .typeError('validation-number')
    .moreThan(10)
    .required("validation-required")
 })

export const CreateMedGroupSchema = Yup.object().shape({
  groupName: Yup.string()
    .min(2, 'validation-short')
    .max(50, 'validation-long')
    .required('validation-required'),
  days: Yup.array()
   .test({
    message: "validation-days",
    test: function(days, context) {
      const {reminder} = context.parent;
      if (!reminder) return true;
      if (Array.isArray(days) && days.length >= 1) return true; 
    }}),
  time: Yup.string()
  .test({
    message: "validation-required",
    test: function(time, context) {
      const {reminder} = context.parent;
      if (!reminder) return true;
      return time? true: false;
    }}),
  reminder: Yup.bool()
  .required(),
  notes: Yup.string()
  .min(2, "validation-short")
 })
 
export const CreateMedicationSchema = Yup.object().shape({
  medicationName: Yup.string()
    .min(2, 'validation-short')
    .max(50, 'validation-long')
    .required('validation-required'),
  amount: Yup.number()
    .required("validation-required")
    .integer("validation-integer")
    .typeError('validation-number')
    .moreThan(0, "validation-too-little-1"),
  notes: Yup.string()
    .min(2, "validation-short"),
  unit: Yup.string()
  .required(),
  refillReminder: Yup.date()
    .test("date-invalid-past", "validation-date-invalid-past", function(date) {
      if (!date) return true;
      return (date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) 
    }),
  });

export const SupportEmailSchema = Yup.object().shape({
  topic: Yup.string()
  .min(2, 'validation-short')
  .max(50, 'validation-long')
  .required('validation-required'),
  message: Yup.string()
  .min(2, 'validation-short')
  .required("validation-required"), 
});