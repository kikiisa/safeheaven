<script setup>
import Label from '@/components/ui/label/Label.vue';
import Select from '@/components/ui/select/Select.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectGroup from '@/components/ui/select/SelectGroup.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectLabel from '@/components/ui/select/SelectLabel.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';

import Textarea from './ui/textarea/Textarea.vue';
import Button from './ui/button/Button.vue';
import { reactive, ref } from 'vue';
import { toast } from 'vue-sonner'
import Input from './ui/input/Input.vue';
import { useQuery } from '@tanstack/vue-query';
import { categoryVerbal } from '@/lib/Api/CategoryVerbal';
import { Sos } from '@/lib/Api/Sos';
const imageInput = ref(null);

const { data, isLoading } = useQuery({
    queryKey: ['categoryVerbal'],
    queryFn: categoryVerbal,
    staleTime: 3000,
    cacheTime: 1000 * 60 * 5,
})
const emit = defineEmits(['submit'])
let loading = ref(false);
const form = reactive({
    category: "",
    date: "",
    description: "",
    image: null,
})

const handleSos = async () => {

    loading.value = true
    navigator.geolocation.getCurrentPosition(async (position) => {
        const formData = new FormData();
        formData.append('category', form.category);
        formData.append('date', form.date);
        formData.append('longitude', position.coords.longitude);
        formData.append('latitude', position.coords.latitude);
        formData.append('description', form.description);
        if (form.image instanceof File) {
            formData.append('image', form.image);
        }
        const response = await Sos(formData);

        if (response.status === 200) {
            toast.success(response.data.message);
            form.category = ""
            form.date = ""
            form.description = ""
            form.image = null
            loading.value = false;
        } else if (response.status === 422) {
            toast.error(response.response.data.message);
            loading.value = false;
        } else {
            toast.error("Terjadi kesalahan saat mengirim laporan.");
            loading.value = false;
        }
    }, (error) => {
        toast.error("Akses lokasi diperlukan untuk mengirim laporan.");
        loading.value = false;
    });
    // emit('submit', values.value);
}

</script>
<template>
    <section class="flex justify-center gap-3">
        <form @submit.prevent="handleSos" class="w-full">
            <div class="flex flex-col gap-4">
                <div class="grid w-full items-center gap-1.5 ">
                    <Label>Kategori Verbal</Label>

                    <Select v-model="form.category">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Pilih Jenis Verbal" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih Jenis Verbal</SelectLabel>
                                <SelectItem v-if="isLoading" value="loading" disabled>
                                    Loading...
                                </SelectItem>

                                <SelectItem v-for="category in data" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Label>Kejadian Verbal</Label>
                <Input placeholder="Masukkan kejadian verbal" class="w-full" v-model="form.date" type="date">

                </Input>

                <div class="grid w-full items-center gap-1.5">
                    <Label>Deskripsi Laporan</Label>
                    <Textarea v-model="form.description" placeholder="Masukan deskripsi laporan"
                        class="w-full"></Textarea>

                </div>
                <div class="grid w-full items-center gap-1.5">
                    <Label>Lampiran Foto</Label>

                    <input ref="imageInput" type="file" accept="image/*" class="w-full border border-gray-300 rounded-md px-3 py-2 truncate
                           focus:outline-none focus:ring-2 focus:ring-red-500
                           transition-colors" @change="(e) => form.image = e.target.files[0]" />

                </div>

                <Button class="w-full mt-4 bg-red-600 cursor-pointer" :disabled="loading">
                    <span v-if="loading">Mengirim..... <i class="pi pi-spin pi-spinner"></i></span>
                    <span class="font-bold" v-else>Kirim Pesan S.O.S <i class="pi pi-send"></i></span>
                </Button>

            </div>
        </form>
    </section>
</template>