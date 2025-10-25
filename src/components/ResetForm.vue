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
import { toast } from "vue-sonner";
import { reactive, ref } from "vue";
import { sendLinkReset } from "@/lib/Api/ResetPassword";
const isLoading = ref(false)


const Form = reactive({
    email: "",
})

const handleResetPassword = async () => {
    isLoading.value = true
    try {
        const response = await sendLinkReset({
            email: Form.email,
        })
        router.push({
            name:"login"
        })
        toast.success("Reset Password Berhasil Dikirim Ke Email Anda");
        isLoading.value = false
    } catch (e) {
        toast.error(e.response?.data?.message);
        isLoading.value = false
        console.log(e)
    }
}
</script>
<template>
    <div :class="cn('flex flex-col gap-6', props.class)">
        <Card>
            <CardHeader class="text-center">
                <CardTitle class="text-xl">Reset Password</CardTitle>
                <CardDescription>
                    Silahkan masukan email yang terdaftar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleResetPassword">
                    <div class="grid gap-3">
                        <div class="grid grid-cols-1 gap-6">
                            <div class="flex flex-col gap-3">
                                <Label for="nama_lengkap">Email</Label>
                                <Input v-model="Form.email" type="email" placeholder="Masukkan Email" required />
                            </div>
                        </div>
                        <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading">
                            <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i
                                    class="pi pi-spin pi-spinner"></i></span>
                            <span v-else>Kirim Reset Password</span>
                        </Button>
                        <div class="text-center text-sm">
                            Sudah Reset Password akun?
                            <RouterLink :to="{ name: 'login' }" class="underline underline-offset-4"> Masuk di sini
                            </RouterLink>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>