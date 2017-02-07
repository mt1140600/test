export const states = ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttrakhand","West Bengal"];
export const daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
export const productCategories = ["All Categories","Clothing","Electronics & Accessories","Footwear"];
export const businessType = ["Individual", "Limited", "Partnership", "Proprietorship", "Private Limited", "Other"];
export const operationalHours = [1,2,3,4,5,6,7,8,9,10,11,12];
export const googleApiKey = "AIzaSyBCIKVw7HU6SO6Zn7ff_DUEkQ7blpDwu3Q";
export const pathGeocode = "http://maps.googleapis.com/maps/api/geocode/json?address=";
export const reCaptchaSiteKey = "6Lf8BA4UAAAAAO09u8gvITIdIij2mGGVcdfIwLDB";
export const reCaptchaSecretKey = "6Lf8BA4UAAAAAP22CL02OVXJnlr3xoxZSEs4qIRA";

export const url = (process.env.NODE_ENV === "development")? "http://dev.adminapi.prokure.it": "http://adminapi.prokure.it";
// export const url = "http://localhost:3000";

export const pincodeToAddress = `${url}/api/bank_address?pincode=`;
export const requestOtp = `${url}/api/phone/request_otp/`;
export const requestOtpAgain = `${url}/api/phone/request_otp_again`;
export const verifyOtp = `${url}/api/merchant/phone/verify`;
export const saveForm = `${url}/api/merchant/update`;
export const getForm = `${url}/api/merchant/info`;
export const forgotPassword = `${url}/api/merchant/reset_password_request?merchantEmail=`;
export const newPasswordUrl = `${url}/api/merchant/reset_password?token=`;

export const cloudinaryCloudName = "prokure";
export const cloudinaryImageUploadPreset = "ahibedth";
export const cloduinaryMerchantInfoFolder = "MerchantInfo";
export const cloudinaryChatFolder = "SellerChat";
