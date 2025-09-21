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
import { Link } from "lucide-vue-next";
const props = defineProps({
    class: { type: null, required: false },
});
</script>
<template>
    <div :class="cn('flex flex-col gap-6', props.class)">
        <Card >
            <CardHeader class="text-center">
                <CardTitle class="text-xl"> Daftar Akun Baru </CardTitle>
                <CardDescription>
                    Buat akun baru dengan mengisi formulir di bawah ini
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div class="grid gap-6">
                        <div class="grid grid-cols-1 gap-6">
                            <div class="grid gap-3">
                                <Label for="nama_lengkap">Nama Lengkap</Label>
                                <Input id="nama_lengkap" name="nama_lengkap" type="text"
                                    placeholder="Masukkan nama lengkap Anda" required />
                            </div>
                            <div class="grid gap-3">
                                <Label for="nama_pengguna">Nama Pengguna</Label>
                                <Input id="nama_pengguna" name="nama_pengguna" type="text" placeholder="username123"
                                    required />
                            </div>
                            <div class="grid gap-3">
                                <Label for="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="nama@example.com" required />
                            </div>
                            <div class="grid gap-3">
                                <Label for="phone">Nomor Telepon</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="08xxxxxxxxxx" required />
                            </div>
                            <div class="grid gap-3">
                                <Label for="password">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="Minimal 8 karakter"
                                    required />
                            </div>
                            <div class="grid gap-3">
                                <Label for="confirm-password">Konfirmasi Password</Label>
                                <Input id="confirm-password" name="confirm_password" type="password"
                                    placeholder="Ulangi password" required />
                            </div>
                        </div>
                        <Button type="submit" class="w-full bg-green-400"> Login Sekarang </Button>
                        <div class="text-center text-sm">
                            Sudah punya akun?
                            <RouterLink :to="{name: 'login'}" class="underline underline-offset-4"> Masuk di sini </RouterLink>
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