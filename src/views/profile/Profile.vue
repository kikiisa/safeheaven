<script setup>
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { profile } from '@/lib/Api/Auth';
import { Desa } from '@/lib/Api/Desa';
import { updateProfile } from '@/lib/Api/Profile';
import { useQuery } from '@tanstack/vue-query';
import { reactive, ref, watch } from 'vue';
import Select from '@/components/ui/select/Select.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
const auth = useAuthStore();
import SelectValue from '@/components/ui/select/SelectValue.vue';
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth';
const isLoading = ref(false)

const Form = reactive({
    name: "",
    full_name: "",
    email: "",
    phone: "",
    jk: "",
    desa_id: "",
    password: "",
    confirm_password: "",
})

const handleProfile = async () => {
    isLoading.value = true
    try {
        const response = await updateProfile(Form);
        auth.setUser(response.data.data);
        auth.setAuth(localStorage.getItem("token"), response.data.data);
        toast.success(response.data.message);
        isLoading.value = false
    } catch (e) {
        isLoading.value = false
        const err = e.response.data.errors
        toast.error(err);
        
    }
}
const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: profile
})

const { data: desa, isLoading: desaLoading } = useQuery({
    queryKey: ['desa'],
    queryFn: Desa,
})

watch(users, (val) => {
    if (val) {
        const { name, full_name, email, phone, jk, password, confirm_password, desa_id } = val.data.data
        Form.name = name ?? "";
        Form.full_name = full_name ?? "";
        Form.email = email ?? "";
        Form.phone = phone ?? "";
        Form.jk = jk ?? "";
        Form.desa_id = desa_id ?? "";
        Form.password = password ?? "";
        Form.confirm_password = confirm_password ?? "";
    }
})
</script>
<template>
    <section class="min-h-screen p-3">
        <div class="flex flex-col justify-center py-4 bg-white rounded-lg shadow-md mb-6">
            <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>
            <span class="text-sm text-center text-gray-500 mt-1">Ubah informasi pribadi.</span>
        </div>

        <form class="flex flex-col gap-3" @submit.prevent="handleProfile">
            <div class="form-group grid grid-cols-1 gap-2">

                <Label for="name" value="Nama">Username</Label>
                <Input type="text" id="name" v-model="Form.name" placeholder="Nama Pengguna" />
            </div>

            <div class="form-group grid grid-cols-1 gap-2">
                <Label for="full_name" value="Nama Lengkap">Nama Lengkap</Label>
                <Input type="text" placeholder="Enter Nama Lengkap" id="full_name" v-model="Form.full_name" />
            </div>


            <div class="grid grid-cols-1 gap-2">

                <Label for="email" value="Email">Email</Label>
                <Input type="email" id="email" v-model="Form.email" />
            </div>


            <div class="grid grid-cols-1 gap-2">
                <Label for="phone" value="Nomor Telepon">Nomor Telephone</Label>
                <Input type="text" id="phone" placeholder="Masukan Nomor Telepohne" v-model="Form.phone" />
            </div>

            <div class="flex items-center gap-2 border p-3 rounded-xl">
                <input type="radio" :id="`L`" value="L" :checked="Form.jk === 'L'" @change="Form.jk = 'L'" />
                <label :for="`L`" class="text-sm font-medium">Laki-Laki</label>
            </div>

            <div class="flex items-center gap-2 border p-3 rounded-xl">
                <input type="radio" :id="`P`" value="P" :checked="Form.jk === 'P'" @change="Form.jk = 'P'" />
                <label :for="`P`" class="text-sm font-medium">Perempuan</label>
            </div>
            <p class="text-xs text-gray-500">Value sekarang: {{ Form.jk }}</p>

            <div class="grid grid-cols-1 gap-2">
                <Label for="desa_id" value="Desa Penempatan">Desa Penempatan</Label>

                <Select v-model="Form.desa_id">
                    <SelectTrigger class="w-full">
                        <SelectValue>
                            {{
                                desa?.find((item) => String(item.id) === String(Form.desa_id))
                                    ?.nama_desa || "Pilih Desa Penempatan"
                            }}
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem v-for="item in desa" :key="item.id" :value="String(item.id)">
                            {{ item.nama_desa }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="grid grid-cols-1 gap-2">
                <Label for="password" value="Kata Sandi">Kata Sandi</Label>
                <Input type="password" id="password" placeholder="Kata Sandi Baru" v-model="Form.password"
                   />

            </div>
            <div class="grid grid-cols-1 gap-2">
                <Label for="confirm_password" value="Konfirmasi Kata Sandi">Konfirmasi Kata Sandi</Label>
                <Input type="password" 
                    id="confirm_password" placeholder="Konfirmasi Kata Sandi" v-model="Form.confirm_password" />
                <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading" type="submit">
                    <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i class="pi pi-spin pi-spinner"></i></span>
                    <span v-else>Simpan</span>
                </Button>
            </div>
        </form>
    </section>
</template>