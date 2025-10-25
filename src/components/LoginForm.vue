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
import { login } from "@/lib/Api/Auth";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import { validateEmail, validatePassword } from "@/lib/Validations/LoginValidations";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "vue";
const auth = useAuthStore();

const props = defineProps({
  class: { type: null, required: false },
});

const isLoading = ref(false)
const Form = reactive({
  email: "",
  password: "",  
});

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const response = await login({
      login: Form.email,
      password: Form.password,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      auth.setAuth(response.data.token, response.data.data);
    
      return router.push("/beranda");
    }

    if (response.status === 401) {
      toast.error(response.response.data.message);
    
    }

    if (response.status === 422) {
      toast.error(response.response.data.message);
     
    }
  } catch (err) {
    if (e.response?.data?.errors) {
      toast.error(e.response.data.errors);
    }
    console.error(err);
    toast.error("Terjadi kesalahan saat login");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="mt-12">
      <CardHeader class="flex flex-col items-center justify-center text-center gap-2">
        <img src="../assets/logo.png" class="object-contain absolute top-[-30px]" alt="logo" width="250">
        <CardTitle class="text-xl"> Selamat Datang </CardTitle>
        <CardDescription>
          Silahkan masuk dengan account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <div class="grid gap-6">
            <div class="grid gap-6">
              <div class="grid gap-3">
                  <Label>Email / Username</Label>
                  <Input required v-model="Form.email" type="text" placeholder="Email atau Nama Pengguna" />
              </div>
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <a href="http://localhost:8000/reset-password"
                    class="ml-auto text-sm underline-offset-4 hover:underline">
                    Lupa password?
                </a>
                </div>
                 <div class="grid gap-3">
                 
                  <Input v-model="Form.password" required type="password" placeholder="Input Password" />
                </div>
              </div>

              <Button type="submit" class="w-full bg-red-600" :disabled="isLoading">
                <span class="ml-2" v-if="isLoading">Tunggu Sebentar<i class="pi pi-spin pi-spinner"></i></span>
                <span v-else>Masuk</span>
              </Button>
            </div>

            <div class="text-center text-sm">
              Belum punya akun?
              <RouterLink :to="{ name: 'pendaftaran' }" href="#" class="underline underline-offset-4"> Daftar di sini
              </RouterLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div
      class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
