<script setup lang="ts">
import HeaderDashboard from '@/components/ui/HeaderDashboard.vue';
import Bottom from '@/components/ui/navigation/bottom.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Button from '@/components/ui/button/Button.vue';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table/'
import Badge from '@/components/ui/badge/Badge.vue';
import BaseModal from '@/components/ui/modal/baseModal.vue';
import SosForm from '@/components/SosForm.vue';
import { useQuery } from '@tanstack/vue-query';
import { DetailDesa } from '@/lib/Api/Desa';
import { formatPhoneNumber } from '@/lib/formatPhone';
const open = defineModel('open', { type: Boolean, default: false })
const handleClose = () => {
    open.value = false
}

const { data,isLoading,isError } = useQuery({
    queryKey: ['DetailDesa'],
    queryFn: DetailDesa,
})
</script>
<template>
    <div class="main-menu-wraper">
        <Alert class="mt-3">
            <AlertTitle>Tentang Aplikasi</AlertTitle>
            <AlertDescription>
                SafeHaven v1.0 adalah aplikasi yang dirancang untuk mendukung upaya PPKS (Pencegahan dan Penanganan
                Kekerasan Seksual), khususnya di Masyarakat.
            </AlertDescription>
        </Alert>
        <Button @click="open = true" class="w-full bg-red-600 mt-3 cursor-pointer">Lapor Sekarang <i
                class="pi pi-send"></i></Button>
        <BaseModal :open="open" title="Layanan SOS" @close="handleClose"
            description="Untuk mendapatkan bantuan dalam keadaan darurat.">
            <SosForm />
        </BaseModal>
    </div>
    <Card class="w-full mt-4">
        <CardHeader>
            <CardTitle><span class="pi pi-phone"></span> Daftar Nomor Telepon Penting</CardTitle>
            <CardDescription>
                Hubungi nomor-nomor darurat berikut jika dibutuhkan.
            </CardDescription>
        </CardHeader>
        <CardContent v-if="data">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Instansi</TableHead>
                        <TableHead>Telepon dan Whatsapps</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Operator Desa {{ data.nama_desa }}</TableCell>
                        <TableCell>
                            <a :href="`https://wa.me/${formatPhoneNumber(data.no_operator_desa)}`" target="_blank">
                                <Badge class=" cursor-pointer hover:bg-slate-800"><i class="pi pi-whatsapp"></i>
                                    {{ data.no_operator_desa }}</Badge>
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Polsek Kecamatan Setempat</TableCell>
                        <TableCell>
                            <a :href="`https://wa.me/${formatPhoneNumber(data.no_polsek_kecamatan)}`" target="_blank">
                                <Badge class="cursor-pointer hover:bg-slate-800">
                                    <i class="pi pi-whatsapp"></i> {{ data.no_polsek_kecamatan }}
                                </Badge>
                            </a>
                            
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
</template>