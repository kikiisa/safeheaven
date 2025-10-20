<script setup>
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { profile } from '@/lib/Api/Auth';
import { Desa } from '@/lib/Api/Desa';
import { updateProfile } from '@/lib/Api/Profile';
import { genderValidate, validateEmail, validateName, validatePhone, validateUsername } from '@/lib/Validations/RegisValidations';
import { useForm} from '@tanstack/vue-form';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import Select from '@/components/ui/select/Select.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
const auth = useAuthStore();
import SelectValue from '@/components/ui/select/SelectValue.vue';
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth';
const isLoading = ref(false)
const form = useForm({
    defaultValues: {
        name: "",
        full_name: "",
        email: "",
        phone: "",
        jk: "",
        desa_id: "",
        password: "",
        confirm_password: "",
    },
    onSubmit: async (values) => {
        isLoading.value = true
        try {
            const response = await updateProfile(values.value);
            auth.setUser(response.data.data);
            auth.setAuth(localStorage.getItem("token"), response.data.data);
            toast.success(response.data.message);
            isLoading.value = false
        }catch(e)
        {
            isLoading.value = false
            const err = e.response.data.errors
            if (err) {
                const firstError = Object.values(err)[0][0];
                toast.error(firstError);
            }
        }
    }
});
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
        const { name, full_name, email, phone, jk, password, confirm_password,desa_id } = val.data.data
        form.setFieldValue("name", name ?? "");
        form.setFieldValue("full_name", full_name ?? "");
        form.setFieldValue("email", email ?? "");
        form.setFieldValue("phone", phone ?? "");
        form.setFieldValue("jk", jk ?? "");
        form.setFieldValue("desa_id", desa_id ?? "");
        form.setFieldValue("password", password ?? "");
        form.setFieldValue("confirm_password", confirm_password ?? "");
    }
})
</script>
<template>
    <section class="min-h-screen p-3">
        <div class="flex flex-col justify-center py-4 bg-white rounded-lg shadow-md mb-6">
            <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>
            <span class="text-sm text-center text-gray-500 mt-1">Ubah informasi pribadi.</span>
        </div>

        <form class="flex flex-col gap-3" @submit.prevent="form.handleSubmit">
            <div class="form-group grid grid-cols-1 gap-2">
                <form.Field v-slot="{ field, state }" name="name" :validators="{
                    onBlur: ({ value }) => validateUsername({ value })

                }">
                    <Label for="name" value="Nama">Username</Label>
                    <Input type="text" id="name" :name="field.name" :value="state.value"
                        @input="field.handleChange($event.target.value)" placeholder="Nama Pengguna"
                        :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'"
                        @blur="field.handleBlur" />
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state.meta.errors[0] }}
                    </small>
                </form.Field>
            </div>
            <form.Field class="grid grid-cols-1 gap-2" v-slot="{ field, state }" name="full_name" :validators="{
                onBlur: ({ value }) => validateName({ value })
            }">
                <Label for="full_name" value="Nama Lengkap">Nama Lengkap</Label>
                <Input type="text" placeholder="Enter Nama Lengkap" id="full_name" :name="field.name"
                    :value="state.value"
                    :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'"
                    @blur="field.handleBlur" @input="field.handleChange($event.target.value)" />
                <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                </small>
            </form.Field>
            <form.Field class="grid grid-cols-1 gap-2" v-slot="{ field, state }" name="email" :validators="{
                onBlur: ({ value }) => validateEmail({ value })

            }">
                <Label for="email" value="Email">Email</Label>
                <Input type="email" id="email" :name="field.name" :value="state.value"
                    :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'"
                    placeholder="Masukan Email" @blur="field.handleBlur"
                    @input="field.handleChange($event.target.value)" />
                <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                </small>
            </form.Field>

            <form.Field class="grid grid-cols-1 gap-2" v-slot="{ field, state }" name="phone" :validators="{
                onBlur: ({ value }) => validatePhone({ value })

            }">
                <Label for="phone" value="Nomor Telepon">Nomor Telephone</Label>
                <Input type="text" id="phone" :name="field.name" :value="state.value"
                    :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'"
                    placeholder="Masukan Nomor Telepon" @blur="field.handleBlur"
                    @input="field.handleChange($event.target.value)" />
                <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                </small>

            </form.Field>
            <form.Field class="flex gap-2" v-slot="{ field, state }" name="jk" :validators="{
                onChange: ({ value }) => genderValidate({ value })
            }">
                <div class="flex items-center gap-2 border p-3 rounded-xl">
                    <input type="radio" :id="`${field.name}-L`" :name="field.name" value="L"
                        :checked="state.value === 'L'" @change="field.handleChange('L')" />
                    <label :for="`${field.name}-L`" class="text-sm font-medium">Laki-Laki</label>
                </div>

                <div class="flex items-center gap-2 border p-3 rounded-xl">
                    <input type="radio" :id="`${field.name}-P`" :name="field.name" value="P"
                        :checked="state.value === 'P'" @change="field.handleChange('P')" />
                    <label :for="`${field.name}-P`" class="text-sm font-medium">Perempuan</label>
                </div>
                <p class="text-xs text-gray-500">Value sekarang: {{ state.value }}</p>
                  <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                </small>
            </form.Field>
            <form.Field v-slot="{ state, field }" name="desa_id" :validators="{
                onChange: ({ value }) => {
                    if (!value) return 'Desa penempatan harus dipilih'
                    return undefined
                }
            }">

                <Label for="desa_id" value="Desa Penempatan">Desa Penempatan</Label>
                <Select :model-value="String(field.state.value)" @update:model-value="(val) => field.handleChange(val)">
                    <SelectTrigger
                        :class="state.meta.errors[0] ? 'border-red-500 border-1 w-100' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'">
                        <SelectValue placeholder="Pilih Desa Penempatan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="item in desa" :key="item.id"  :value="String(item.id)">
                            {{ item.nama_desa }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                </small>

            </form.Field>

            <form.Field class="grid grid-cols-1 gap-2" v-slot="{ field, state }" name="password">
                <Label for="password" value="Kata Sandi">Kata Sandi</Label>
                <Input type="password" id="password" placeholder="Kata Sandi Baru" :name="field.name"
                    :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'"
                    :value="state.value" @input="field.handleChange($event.target.value)" @blur="field.handleBlur" />

            </form.Field>
            <form.Field class="grid grid-cols-1 gap-2" v-slot="{ field, state }" name="confirm_password">
                <Label for="confirm_password" value="Konfirmasi Kata Sandi">Konfirmasi Kata Sandi</Label>
                <Input type="password"
                    :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'"
                    @blur="field.handleBlur" id="confirm_password" placeholder="Konfirmasi Kata Sandi"
                    :name="field.name" :value="state.value" @input="field.handleChange($event.target.value)" />
                <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                </small>
                
            </form.Field>
            <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading">
                <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i class="pi pi-spin pi-spinner"></i></span>
                <span v-else>Simpan</span>
            </Button>
        </form>
    </section>
</template>