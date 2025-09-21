<script setup>
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
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

</script>
<template>
    <section class="flex justify-center gap-3 mt-4">
        <Card class="w-full">
            <CardContent>
                <p class="font-semibold text-xl"><span class="text-green-600 pi pi-sound"></span>Laporkan
                    Sekarang</p>
                <span class="text-sm font-medium">Silahkan isi form berikut</span>
                <div class="flex flex-col gap-4 mt-4">
                    <div class="grid w-full items-center gap-1.5 ">
                        <Label>Kategori Verbal</Label>
                        <Select>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Pilih Jenis Verbal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Pilih Jenis Verbal</SelectLabel>
                                    <SelectItem value="verbal-abuse">
                                        Verbal Abuse
                                    </SelectItem>
                                    <SelectItem value="verbal-threat">
                                        Verbal Threat
                                    </SelectItem>
                                    <SelectItem value="verbal-harassment">
                                        Verbal Harassment
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
                    <Button class="w-full mt-4 bg-green-400 cursor-pointer">S.O.S</Button>
                </div>
            </CardContent>
        </Card>
    </section>
</template>