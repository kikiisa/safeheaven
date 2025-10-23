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
import { validateEmail} from "@/lib/Validations/RegisValidations";
import { register } from "@/lib/Api/Register";
import { toast } from "vue-sonner";
import { ref } from "vue";
import { sendLinkReset } from "@/lib/Api/ResetPassword";
const isLoading = ref(false)

const form = useForm({
    defaultValues: {
        email: "",
      
    },
    onSubmit: async (values) => {
        isLoading.value = true
        try {
            const response = await sendLinkReset({
                email: values.value.email,
            })
            console.log(response);
            form.reset();
            isLoading.value = false
            
        } catch (e) {
           console.log(e)
        }
    }
});

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
                <form @submit.prevent="form.handleSubmit">

                    <div class="grid gap-3">
                        <div class="grid grid-cols-1 gap-6">
                            
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
                          
                        </div>
                        <Button class="bg-red-500 hover:bg-red-600" :disabled="isLoading">
                            <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i class="pi pi-spin pi-spinner"></i></span>
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