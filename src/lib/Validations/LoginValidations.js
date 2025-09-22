export const validateEmail = ({value}) => {
   if(!value) return "Email tidak boleh kosong ya"
   if(!value.includes("@")) return "Email tidak valid"
};

export const validatePassword = ({value}) => {
    if(!value) return "Password tidak boleh kosong"
    if(value.length < 8) return "Password minimal 8 karakter"
}