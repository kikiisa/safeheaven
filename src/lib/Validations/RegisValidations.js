export const validateEmail = ({value}) => {
    if(!value) return "* Email tidak boleh kosong ya"
    if(!value.includes("@")) return "* Email tidak valid"
};

export const validatePassword = ({value}) => {
    if(!value) return "* Password tidak boleh kosong"
    if(value.length < 8) return "* Password minimal 8 karakter"
}

export const validateConfirmPassword = ({value}) => {
    if(!value) return "* Konfirmasi Password tidak boleh kosong"
}

export const validateName = ({value}) => {
    if(!value) return "* Nama Lengkap tidak boleh kosong"
}


export const validateUsername = ({value}) => {
    if(!value) return "* Username tidak boleh kosong"
}

export const validatePhone = ({value}) => {
    if(!value) return "* Phone tidak boleh kosong"
    if(isNaN(Number(value))) return "* Phone harus berupa angka"
}

export const Password = ({value}) => {
    if(!value) return "* Password tidak boleh kosong"
    if(value.length < 8) return "* Password minimal 8 karakter"
}
