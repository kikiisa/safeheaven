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
import { ref } from 'vue';
import { toast } from 'vue-sonner'
import Input from './ui/input/Input.vue';
import { useQuery } from '@tanstack/vue-query';
import { categoryVerbal } from '@/lib/Api/CategoryVerbal';
import { validateDeskripsiVerbal, ValidateSelectVerbal, validateVerbalDate, validateImageVerbal } from '@/lib/Validations/SosValidations';
import { useForm } from '@tanstack/vue-form';
import { Sos } from '@/lib/Api/Sos';

const imageInput = ref(null);

const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['categoryVerbal'],
    queryFn: categoryVerbal,
    staleTime: 3000,
    cacheTime: 1000 * 60 * 5,
})

const emit = defineEmits(['submit'])
let loading = ref(false);
const form = useForm({
    defaultValues: {
        category: "",
        date: "",
        description: "",
        image: null,
    },
    onSubmit: async (values) => {
        
        loading.value = true
        navigator.geolocation.getCurrentPosition(async (position) => {
            const formData = new FormData();
            formData.append('category', values.value.category);
            formData.append('date', values.value.date);
            formData.append('longitude', position.coords.longitude);
            formData.append('latitude', position.coords.latitude);
            formData.append('description', values.value.description);
            if (values.value.image instanceof File) {
                formData.append('image', values.value.image);
            }
            const response = await Sos(formData);
            console.log(response);
            // console.log("Response dari API:", response); // Log response untuk debugging

            if (response.status === 200) {
                toast.success(response.data.message);

                // Reset seluruh state form (seperti 'touched', 'errors')
                form.reset();

                // SECARA EKSPLISIT atur nilai setiap field kembali ke default
                form.setFieldValue('category', undefined);
                form.setFieldValue('date', '');
                form.setFieldValue('description', '');
                form.setFieldValue('image', null);

                // Kosongkan nilai input file secara manual dari DOM
                if (imageInput.value) {
                    // console.log('Mencoba mengosongkan elemen input file:', imageInput.value);
                    imageInput.value.value = null;
                }
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
    },
})
</script>
<template>
    <section class="flex justify-center gap-3">
        <form @submit.prevent="form.handleSubmit" class="w-full">
            <div class="flex flex-col gap-4">
                <div class="grid w-full items-center gap-1.5 ">
                    <Label>Kategori Verbal</Label>
                    <form.Field name="category" v-slot="{ field, state }" :validators="{
                        required: (value) => !!value || 'Kategori wajib dipilih'
                    }">
                        <Select v-model="field.value" @update:modelValue="field.handleChange">
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
                        <!-- Error handling -->
                        <p v-if="state.meta.touched && state.meta.errors.length" class="text-red-500 text-sm">
                            {{ state.meta.errors[0] }}
                        </p>
                    </form.Field>
                </div>
                <form.Field class="grid w-full items-center" name="date" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => validateVerbalDate({ value }) }">
                    <Label>Kejadian Verbal</Label>
                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-1' : ''"
                        placeholder="Masukkan kejadian verbal" class="w-full" type="date" :id="field.name"
                        :name="field.name" :value="state.value" @input="field.handleChange($event.target.value)"
                        @blur="field.handleBlur"></Input>
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state.meta.errors[0] }}
                    </small>
                </form.Field>
                <form.Field name="description" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => validateDeskripsiVerbal({ value }) }"
                    class="grid w-full items-center gap-1.5">
                    <Label>Deskripsi Laporan</Label>
                    <Textarea :class="state.meta.errors[0] ? 'border-red-500 border-1' : ''"
                        placeholder="Masukkan deskripsi laporan" class="w-full" :id="field.name" :name="field.name"
                        :value="state.value" @input="field.handleChange($event.target.value)"
                        @blur="field.handleBlur"></Textarea>
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state.meta.errors[0] }}
                    </small>
                </form.Field>
                <form.Field name="image" class="grid w-full items-center gap-1.5" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => validateImageVerbal({ value }) }">
                    <Label :for="field.name">Lampiran Foto</Label>

                    <input ref="imageInput" type="file" accept="image/*" :id="field.name" :name="field.name" class="w-full border border-gray-300 rounded-md px-3 py-2 truncate
           focus:outline-none focus:ring-2 focus:ring-blue-500
           transition-colors" :class="state.meta.errors[0] ? 'border-red-500' : ''"
                        @change="(e) => field.handleChange(e.target.files[0])" @blur="field.handleBlur" />

                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state.meta.errors[0] }}
                    </small>
                </form.Field>
                <Button class="w-full mt-4 bg-green-400 cursor-pointer" :disabled="loading">
                    <span v-if="loading">Mengirim..... <i class="pi pi-spin pi-spinner"></i></span>
                    <span class="font-bold" v-else>Kirim Pesan S.O.S <i class="pi pi-send"></i></span>
                </Button>
            </div>
        </form>
    </section>
</template>