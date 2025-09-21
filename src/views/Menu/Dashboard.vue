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
</script>
<template>
    <HeaderDashboard />
    <main class="lg:w-1/3 w-full mx-auto p-4">
        <div class="main-menu-wraper">
            <div class="main-menu left-0 w-full rounded-2xl bg-white shadow-lg z-50">
                <div class="flex justify-around items-center h-16">
                    <a href="#"
                        class="flex flex-col items-center text-gray-500 hover:text-[#05df72] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6.253v13m0-13C10.835 5.485 9.299 5 8 5H6c-2.21 0-4 1.79-4 4v10c0 2.21 1.79 4 4 4h2c1.299 0 2.835-.485 4-1.253m0-13C13.165 5.485 14.701 5 16 5h2c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4h-2c-1.299 0-2.835-.485-4-1.253m-4.253-15.5c-.753-.484-1.57-.753-2.427-.753s-1.674.269-2.427.753" />
                        </svg>
                        <span class="text-xs mt-1">Reading</span>
                    </a>

                    <a href="#"
                        class="flex flex-col items-center text-gray-500 hover:text-[#05df72] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span class="text-xs mt-1">SOS</span>
                    </a>

                    <a href="#"
                        class="flex flex-col items-center text-gray-500 hover:text-[#05df72] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0a2 2 0 110-4 2 2 0 010 4zm2 2h.01M12 21h.01" />
                        </svg>
                        <span class="text-xs mt-1">Report</span>
                    </a>

                    <a href="#"
                        class="flex flex-col items-center text-gray-500 hover:text-[#05df72] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 111.955 0 0112 2.944a11.955 11.955 0 018.982 3.039 12.011 12.011 0 013.039 8.982 11.955 11.955 0 01-3.039 8.982A12.011 12.011 0 0112 21.056a11.955 11.955 0 01-8.982-3.039A12.011 12.011 0 012.944 12c0-1.898.397-3.715 1.157-5.352z" />
                        </svg>
                        <span class="text-xs mt-1">Heal</span>
                    </a>
                </div>
            </div>
            <Alert class="mt-3">
                <AlertTitle>Tentang Aplikasi</AlertTitle>
                <AlertDescription>
                    SafeHaven v1.0 adalah aplikasi yang dirancang untuk mendukung upaya PPKS (Pencegahan dan Penanganan
                    Kekerasan Seksual), khususnya di lingkungan akademis seperti Universitas Negeri Gorontalo (UNG).
                </AlertDescription>
            </Alert>
            <Button class="w-full bg-green-400 mt-3 cursor-pointer">Lapor Sekarang <i class="pi pi-send"></i></Button>
        </div>
        <Card class="w-full mt-4">
            <CardHeader>
                <CardTitle><span class="pi pi-phone"></span> Daftar Nomor Telepon Penting</CardTitle>
                <CardDescription>
                    Hubungi nomor-nomor darurat berikut jika dibutuhkan.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Instansi</TableHead>
                            <TableHead>Nomor Telepon</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Polisi</TableCell>
                            <TableCell><Badge class=" cursor-pointer hover:bg-slate-800"><i class="pi pi-whatsapp"></i> 08123456789</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>PPA</TableCell>
                            <TableCell><Badge class=" cursor-pointer hover:bg-slate-800"><i class="pi pi-whatsapp"></i> 08123456789</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Admin Desa</TableCell>
                            <TableCell><Badge class=" cursor-pointer hover:bg-slate-800"><i class="pi pi-whatsapp"></i> 08123456789</Badge> </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </main>
    <Bottom />
</template>