<script setup>
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
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
import { updatePassword } from "@/lib/Api/ResetPassword";
const isLoading = ref(false)

const token = router.currentRoute.value.query.token
const email = router.currentRoute.value.query.email

const Form = reactive({
    password: "",
    konfirmasi:"",
})

const handleResetPassword = async () => {
    isLoading.value = true
    try {
        const response = await updatePassword({
            password: Form.password,
            password_confirmation:Form.konfirmasi,
            token:token,
            email:email
        })
        console.log(response)
        router.push({
            name:"login"
        })
        toast.success("Reset Password Berhasil");
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
                <CardTitle class="text-xl">Ubah Password</CardTitle>
            </CardHeader>
            <CardContent>
                {{ token }}
                {{ email }}
                <form @submit.prevent="handleResetPassword">
                    <div class="grid gap-3">
                        <div class="grid grid-cols-1 gap-6">
                            <div class="flex flex-col gap-3">
                                <Label for="password">Password</Label>
                                <Input type="password" v-model="Form.password" placeholder="Masukkan Password" required />
                            </div>
                            <div class="flex flex-col gap-3">
                                <Label for="konfirmasi_password">Konfirmasi Password</Label>
                                <Input type="password" v-model="Form.konfirmasi" placeholder="Konfirmasi Password" required />
                            </div>
                        </div>
                        <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading">
                            <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i
                                    class="pi pi-spin pi-spinner"></i></span>
                            <span v-else>Simpan</span>
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