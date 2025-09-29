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
const auth = useAuthStore();
const props = defineProps({
  class: { type: null, required: false },
});
const form = useForm({
  defaultValues: {
    email: "",
    password: ""
  },
  onSubmit: async (values) => {
    const response = await login({
      email: values.value.email,
      password: values.value.password
    })
    console.log(response);
    if(response.status == 200) {
      toast.success(response.data.message);
      form.reset();
      auth.setAuth(response.data.token, response.data.data);
      return router.push("/beranda")
    }
    if (response.status == 401) {
      toast.error(response.response.data.message);
      form.reset();
    }

    if(response.status == 422) {
      toast.error(response.response.data.message);
    }
  }
})
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Selamat Datang </CardTitle>
        <CardDescription>
          Login dengan nama pengguna atau Google akun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="form.handleSubmit">
          <div class="grid gap-6">
            <div class="flex flex-col gap-4">
              <Button variant="outline" class="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor" />
                </svg>
                Login with Google
              </Button>
            </div>
            <div
              class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card text-muted-foreground relative z-10 px-2">
                Atau lanjutkan dengan
              </span>
            </div>
            <div class="grid gap-6">
              <!-- Email -->
              <div class="grid gap-3">
                <form.Field name="email" v-slot="{ field, state }" :validators="{
                  onBlur: ({ value }) => validateEmail({ value }),
                }">
                  <Label for="email">Email</Label>
                  <Input type="email" :class="state.meta.errors[0] ? 'border-red-500 border-2' : ''"
                    placeholder="m@example.com" :id="field.name" :name="field.name" :value="state.value"
                    @input="field.handleChange($event.target.value)" @blur="field.handleBlur" />
                  <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                  </small>
                </form.Field>
              </div>

              <!-- Password -->
              <div class="grid gap-3">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
                    Lupa password?
                  </a>
                </div>

                <form.Field name="password" v-slot="{ field, state }" :validators="{
                  onBlur: ({ value }) => validatePassword({ value }),
                  
                }">
                  <Input type="password" placeholder="********" :id="field.name" :name="field.name" :value="state.value"
                    @input="field.handleChange($event.target.value)" @blur="field.handleBlur"
                    :class="state.meta.errors[0] ? 'border-red-500 border-2' : ''" />
                  <small v-if="state.meta.errors.length" class="text-red-500">
                    {{ state.meta.errors[0] }}
                  </small>
                  
                </form.Field>
              </div>

              <Button type="submit" class="w-full bg-green-400">Login</Button>
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
