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
import { register } from "@/lib/Api/Register";
import { toast } from "vue-sonner";
import { reactive, ref } from "vue";
const isLoading = ref(false)

const form = reactive({

    name: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
});

const handleForm = async () => {
    isLoading.value = true
    try {
        const response = await register({
            full_name: form.full_name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            
        })
        toast.success(response.data.message);
        form.reset();
        isLoading.value = false

    } catch (e) {
        if (e.response?.data?.errors) {

            toast.error(e.response.data.errors);
        }
        isLoading.value = false
    }
}

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
                <form @submit.prevent="handleForm">

                    <div class="grid gap-3">
                        <div class="grid grid-cols-1 gap-6">

                            <div class="flex flex-col gap-3">
                                <Label for="nama_lengkap">Nama Lengkap</Label>
                                <Input v-model="form.full_name" type="text" placeholder="Masukkan nama lengkap Anda" />
                            </div>
                            <div class="flex flex-col gap-3">
                                <Label for="email">Email</Label>
                                <Input placeholder="Masukkan Email" v-model="form.email" />
                            </div>
                            <div class="flex flex-col gap-3">
                                <Label for="phone">Nomor Telepon</Label>
                                <Input v-model="form.phone" placeholder="Masukkan Nomor Telepon Aktif" />


                                <small class="text-sm text-slate-500"><span class="pi pi-info-circle"></span>
                                    Dimulai dari 08*****</small>
                            </div>
                            <div class="flex flex-col gap-3">
                                <Label>Password</Label>
                                <Input v-model="form.password" type="password" placeholder="*************" />
                            </div>
                        </div>
                        <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading">
                            <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i
                                    class="pi pi-spin pi-spinner"></i></span>
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