export const ValidateSelectVerbal = ({value}) => {
    if(!value) return "* Pesan tidak boleh kosong"
}

export const validateVerbalDate = ({value}) => {
    if(!value) return "* Tanggal tidak boleh kosong"
}

export const validateDeskripsiVerbal = ({value}) => {
    if(!value) return "* Deskripsi tidak boleh kosong"
}

export const validateImageVerbal = ({value}) => {
    if (!value) {
        return "* Foto tidak boleh kosong";
    }
    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(value.type)) {
        return "* File harus berupa gambar dengan format JPEG atau PNG";
    }
    if (value.size > 1024 * 1024) {
        return "* Ukuran file maksimal 1 MB";
    }
};

