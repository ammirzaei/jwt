const yup = require('yup');

const registerSchema = yup.object().shape({
    email: yup.string().required('وارد کردن ایمیل الزامی است').email('لطفا ایمیل معتبر وارد نمایید'),
    fullName: yup.string().required('وارد کردن نام کامل الزامی است').min(4, 'نام وارد شده باید بیشتر از 4 کاراکتر باشد').max(150, 'نام وارد شده باید کمتر از 150 کاراکتر باشد'),
    password: yup.string().required('وارد کردن رمز عبور الزامی است').min(6, 'رمز عبور نباید کمتر از 6 کاراکتر باشد').max(150, 'رمز عبور نباید بیشتر 150 کاراکتر باشد'),
    repassword: yup.string().required('وارد کردن تکرار رمز عبور الزامی است').oneOf([yup.ref('password')], 'رمز های عبور با یکدیگر یکسان نیستند')
});

module.exports = {
    registerSchema
}