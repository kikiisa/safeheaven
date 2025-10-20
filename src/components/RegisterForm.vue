<script setup>
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const props = defineProps({
    class: { type: null, required: false },
});


import { useRouter } from "vue-router";
const router = useRouter();
import { useForm } from "@tanstack/vue-form";
import { validateEmail, validateName, validatePassword, validatePhone } from "@/lib/Validations/RegisValidations";
import { register } from "@/lib/Api/Register";
import { toast } from "vue-sonner";
import { ref } from "vue";
const isLoading = ref(false)

const form = useForm({
    defaultValues: {
        name: "",
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    },
    onSubmit: async (values) => {
        isLoading.value = true
        try {
            const response = await register({
                full_name: values.value.full_name,
                email: values.value.email,
                phone: values.value.phone,
                password: values.value.password,
                confirm_password: values.value.confirm_password
            })
            toast.success(response.data.message);
            form.reset();
            isLoading.value = false
            
        } catch (e) {
            if (e.response.data.errors) {
                const firstError = Object.values(e.response.data.errors)[0][0];
                toast.error(firstError);
            }
            isLoading.value = false
        }
    }
});

</script>
<template>
    <div :class="cn('flex flex-col gap-6', props.class)">
        <Card>
            <CardHeader class="text-center">
                <CardTitle class="text-xl"> Daftar Akun Baru </CardTitle>
                <CardDescription>
                    Buat akun baru dengan mengisi formulir di bawah ini
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="form.handleSubmit">

                    <div class="grid gap-3">
                        <div class="grid grid-cols-1 gap-6">
                            <form.Field v-slot="{ field, state }" name="full_name" :validators="{
                                onBlur: ({ value }) => validateName({ value }),
                            }">
                                <div class="flex flex-col gap-3">
                                    <Label for="nama_lengkap">Nama Lengkap</Label>
                                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-2' : ''"
                                        @blur="field.handleBlur" @input="field.handleChange($event.target.value)"
                                        :id="field.name" :name="field.name" :value="state.value" type="text"
                                        placeholder="Masukkan nama lengkap Anda" required />
                                    <small v-if="state.meta.errors.length" class="text-red-500">
                                        {{ state.meta.errors[0] }}
                                    </small>
                                </div>
                            </form.Field>
                            <form.Field v-slot="{ field, state }" name="email" :validators="{
                                onBlur: ({ value }) => validateEmail({ value }),
                            }">
                                <div class="flex flex-col gap-3">
                                    <Label for="nama_lengkap">Email</Label>
                                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-2' : ''"
                                        @blur="field.handleBlur" @input="field.handleChange($event.target.value)"
                                        :id="field.name" :name="field.name" :value="state.value" type="email"
                                        placeholder="Masukkan Email" required />

                                    <small v-if="state.meta.errors.length" class="text-red-500">
                                        {{ state.meta.errors[0] }}
                                    </small>
                                </div>
                            </form.Field>
                            <form.Field v-slot="{ field, state }" name="phone" :validators="{
                                onBlur: ({ value }) => validatePhone({ value }),
                            }">
                                <div class="flex flex-col gap-3">
                                    <Label :for="field.name">Nomor Telepon</Label>
                                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-2' : ''"
                                        @blur="field.handleBlur" @input="field.handleChange($event.target.value)"
                                        :id="field.name" :name="field.name" :value="state.value" type="text"
                                        placeholder="Masukkan Nomor Telepon Aktif" required />

                                    <small v-if="state.meta.errors.length" class="text-red-500">
                                        {{ state.meta.errors[0] }}
                                    </small>
                                    <small class="text-sm text-slate-500"><span class="pi pi-info-circle"></span>
                                        Dimulai dari 08*****</small>
                                </div>
                            </form.Field>
                            <form.Field v-slot="{ field, state }" name="password" :validators="{
                                onBlur: ({ value }) => validatePassword({ value }),
                            }">
                                <div class="flex flex-col gap-3">
                                    <Label :for="field.name">Password</Label>
                                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-2' : ''"
                                        @blur="field.handleBlur" @input="field.handleChange($event.target.value)"
                                        :id="field.name" :name="field.name" :value="state.value" type="password"
                                        placeholder="*************" required />

                                    <small v-if="state.meta.errors.length" class="text-red-500">
                                        {{ state.meta.errors[0] }}
                                    </small>

                                </div>
                            </form.Field>
                        </div>
                        <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading">
                            <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i class="pi pi-spin pi-spinner"></i></span>
                            <span v-else>Daftar</span>
                        </Button>
                        <div class="text-center text-sm">
                            Sudah punya akun?
                            <RouterLink :to="{ name: 'login' }" class="underline underline-offset-4"> Masuk di sini
                            </RouterLink>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        <div
            class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Dengan mendaftar, Anda menyetujui
            <a href="#">Syarat Layanan</a> dan <a href="#">Kebijakan Privasi</a> kami.
        </div>
    </div>
</template>