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
import Input from './ui/input/Input.vue';
import { useQuery } from '@tanstack/vue-query';
import { categoryVerbal } from '@/lib/Api/CategoryVerbal';
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['categoryVerbal'],
  queryFn: categoryVerbal,
  staleTime: 3000, // cache dianggap fresh selama 3 detik
  cacheTime: 1000 * 60 * 5, // opsional: simpan cache 5 menit
})
</script>
<template>
    <section class="flex justify-center gap-3">
        <div class="w-full">
            <div class="flex flex-col gap-4">
                <div class="grid w-full items-center gap-1.5 ">
                    <Label>Kategori Verbal</Label>
                    
                    <Select>
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Pilih Jenis Verbal" />
                        </SelectTrigger>
                        
                        
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Pilih Jenis Verbal</SelectLabel>
                                <SelectItem v-if="isLoading" value="loading">Loading...</SelectItem>
                                <SelectItem :value="category.id" v-for="category in data" :key="category.name">
                                    {{ category.name }}
                                </SelectItem>
                                
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div class="grid w-full items-center gap-1.5">
                    <Label>Kejadian Verbal</Label>
                    <Input placeholder="Masukkan kejadian verbal" class="w-full" type="date"></Input>
                </div>
                <div class="grid w-full items-center gap-1.5">
                    <Label>Deskripsi Laporan</Label>
                    <Textarea placeholder="Masukkan deskripsi laporan" class="w-full"></Textarea>
                </div>
                <div class="grid w-full items-center gap-1.5">
                    <Label>Lampiran Foto</Label>
                    <Input placeholder="Upload Foto" class="w-full" type="file"></Input>
                </div>
                <Button class="w-full mt-4 bg-green-400 cursor-pointer">Kirim S.O.S <span class="pi pi-send"></span></Button>
            </div>
        </div>
    </section>
</template>