<script setup>
import Label from '@/components/ui/label/Label.vue';
import Textarea from './ui/textarea/Textarea.vue';
import Button from './ui/button/Button.vue';
import Input from './ui/input/Input.vue';
import {  ref, watch, computed } from 'vue'; // Import 'watch' and 'computed'
import { toast } from 'vue-sonner'
import { useQuery } from '@tanstack/vue-query';
import { createReportQuestion, Question } from '@/lib/Api/Question';
import { useForm } from '@tanstack/vue-form';
import { validateNamaPelaku, ValidateTempat, Validatewaktu } from '@/lib/Validations/ReportValidations';
import { generateText } from '@/lib/GeminiAi';
import { ResultReport } from '@/lib/Api/ResultReport';
import baseModal from './ui/modal/baseModal.vue';
const { isLoading, data } = useQuery({
    queryKey: ['Question'],
    queryFn: Question
});

const currentPage = ref(1);
const questionsPerPage = 5; 
const loading = ref(false)
const resultScreening = ref(null)
const openModal = defineModel('open', { type: Boolean, default: false })
const handleCLose = () => {
    openModal.value = false
}


const form = useForm({
    defaultValues: {
        nama_pelaku: "",
        waktu_kejadian: "",
        tanggal_kejadian: "",
        tempat_kejadian: "",
        answers: [],
    },
    onSubmit: async (values) => {
   
        loading.value = true;
        try {
            const formData = new FormData();
            formData.append('nama_pelaku', values.value.nama_pelaku);
            formData.append('waktu_kejadian', values.value.waktu_kejadian);
            formData.append('tanggal_kejadian', values.value.tanggal_kejadian);
            formData.append('tempat_kejadian', values.value.tempat_kejadian);
              values.value.answers.forEach((ans, index) => {
                formData.append(`answers[${index}][report_questions_id]`, ans.report_questions_id);
                formData.append(`answers[${index}][answer]`, ans.answer);
            });
            const response = await createReportQuestion(formData);
            const Report = await ResultReport(formData);
            const generateReport = await generateText(`berikan hasil level screening (yang meliputi 1. Level Screening dan 2. Penjelasan ) dari pertanyaan berikut '${Report.data.data}'buat dalam output murni (html) tanpa tag pembuka (<html>)`)
            openModal.value = true
            resultScreening.value = generateReport
            toast.success(response.data.message);

            form.reset();
            initializeDefaultAnswers(data.value?.data?.data);
            currentPage.value = 1;
            loading.value = false;
        } catch (e) {
            
            const errorMessage = e.response?.data?.message || "Terjadi kesalahan saat mengirim laporan.";
            toast.error(errorMessage);
            loading.value = false;
        }
        
    }
});

const allQuestions = computed(() => data.value?.data?.data || []);

const paginatedQuestions = computed(() => {
    const start = (currentPage.value - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    return allQuestions.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(allQuestions.value.length / questionsPerPage);
});

const isLastPage = computed(() => currentPage.value >= totalPages.value);
const isFirstPage = computed(() => currentPage.value === 1);

const nextPage = () => {
    if (!isLastPage.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (!isFirstPage.value) {
        currentPage.value--;
    }
};



const initializeDefaultAnswers = (questions) => {
    if (questions && questions.length > 0) {
        const defaultAnswers = questions.map(q => ({
            report_questions_id: q.id,
            answer: "tidak" // Default answer for all questions
        }));
        // Use setFieldValue to update the 'answers' array in the form state
        form.setFieldValue('answers', defaultAnswers);
    }
}

// Watch for the API data to load and initialize the default answers
watch(data, (newData) => {
    if (newData?.data?.data) {
        initializeDefaultAnswers(newData.data.data);
    }
}, { immediate: true }); // Run immediately if data is already available

 const toggleAnswer = (questionId, isChecked, handleChange, currentAnswers) => {
    // Find the index of the answer to modify
    const answerIndex = currentAnswers.findIndex(item => item.report_questions_id === questionId);
    
    if (answerIndex !== -1) {
        // Create a copy of the current answers array
        const newAnswers = [...currentAnswers];
        
        // Update the 'answer' property of the specific item
        newAnswers[answerIndex] = {
            ...newAnswers[answerIndex],
            answer: isChecked ? "ya" : "tidak" // Set to "ya" if checked, "tidak" if unchecked
        };
        
        // Update the form field value
        handleChange(newAnswers);
    } 
}
</script>

<template>
    <section class="flex justify-center">
        <baseModal :open="openModal" title="Hasil Screening" @close="handleCLose">
            <div class="content text-sm overflow-y-auto max-h-[calc(100vh-14rem)]" v-if="resultScreening" v-html="resultScreening">
    
            </div>

        </baseModal>
        <form class="w-full flex flex-col gap-3" @submit.prevent="form.handleSubmit">  
            <div class="form-group grid grid-cols-1 gap-2">
                <form.Field name="nama_pelaku" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => validateNamaPelaku({ value }) }">
                    <Label :for="field.name">Nama Pelaku</Label>
                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-1' : ''"
                        placeholder="Masukkan Nama Pelaku" class="w-full" :id="field.name" :name="field.name"
                        :value="state.value" @input="field.handleChange($event.target.value)" @blur="field.handleBlur">
                    </Input>
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state['meta'].errors[0] }}
                    </small>
                </form.Field>
            </div>
            
            <div class="form-group grid grid-cols-1 gap-2">
                <form.Field name="waktu_kejadian" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => Validatewaktu({ value }) }"> 
                    <label :for="field.name" class="text-sm font-medium text-gray-700">Pilih Waktu</label>
                    <Input :id="field.name" :name="field.name" :value="state.value"
                        @input="field.handleChange($event.target.value)" @blur="field.handleBlur" type="time"
                        :class="state.meta.errors[0] ? 'border-red-500 border-1' : 'w-full rounded border-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'" />
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state['meta'].errors[0] }}
                    </small>
                </form.Field>
            </div>
            
            <div class="form-group grid grid-cols-1 gap-2">
                <form.Field name="tempat_kejadian" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => ValidateTempat({ value }) }">
                    <Label :for="field.name">Lokasi Kejadian</Label>
                    <Textarea :class="state.meta.errors[0] ? 'border-red-500 border-1' : ''"
                        placeholder="Masukkan Lokasi Kejadian" class="w-full" :id="field.name" :name="field.name"
                        :value="state.value" @input="field.handleChange($event.target.value)" @blur="field.handleBlur">
                    </Textarea>
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state['meta'].errors[0] }}
                    </small>
                </form.Field>
            </div>
            
            <div class="form-group grid grid-cols-1 gap-2">
                <form.Field name="tanggal_kejadian" v-slot="{ field, state }"
                    :validators="{ onBlur: ({ value }) => ValidateTempat({ value }) }"> 
                    <Label :for="field.name">Tanggal Kejadian</Label>
                    <Input :class="state.meta.errors[0] ? 'border-red-500 border-1' : ''" type="date" :id="field.name"
                        :name="field.name" :value="state.value" @input="field.handleChange($event.target.value)"
                        @blur="field.handleBlur"></Input>
                    <small v-if="state.meta.errors.length" class="text-red-500">
                        {{ state['meta'].errors[0] }}
                    </small>
                </form.Field>
            </div>

            <form.Field name="answers" v-slot="{ field, state }">
                <div class="question" v-if="data?.data?.data">
                    <div class="head-question flex-col justify-center text-center mb-3 mt-3">
                        <h1 class="font-bold text-xl"><span class="pi pi-tags"></span> Pertanyaan Verbal</h1>
                        <span
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Silahkan
                            pilih jawaban yang sesuai (Halaman {{ currentPage }} dari {{ totalPages }})</span>
                    </div> 
                    
                    <div class="items-top flex gap-3 py-3 border-2 rounded-xl p-4" 
                        v-for="question in paginatedQuestions" :key="question.id">
                        
                        <input  
                            type="checkbox" 
                            :id="`question-${question.id}`"
                            :name="field.name"
                            
                            :checked="state.value.find(item => item.report_questions_id === question.id)?.answer === 'ya'"
                            
                            @change="e => toggleAnswer(question.id, e.target.checked, field.handleChange, state.value)" 
                        />
                        
                        <div class="grid gap-1.5 leading-none">
                            <label :for="`question-${question.id}`"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {{ question.question }}
                            </label>
                        </div>
                    </div>

                    <div class="flex justify-between mt-4">
                        <Button type="button" @click="prevPage" :disabled="isFirstPage" class="bg-gray-500 hover:bg-gray-600">
                            <i class="pi pi-chevron-left"></i> Sebelumnya
                        </Button>
                        <Button type="button" @click="nextPage" :disabled="isLastPage" class="bg-red-500 hover:bg-red-600">
                            Selanjutnya <i class="pi pi-chevron-right"></i>
                        </Button>
                    </div>
                    </div>
            </form.Field>
            <Button class="w-full mt-4 bg-red-600 cursor-pointer" :disabled="loading" v-if="isLastPage">
                <span v-if="loading">Mengirim..... <i class="pi pi-spin pi-spinner"></i></span>
                <span class="font-bold" v-else>Kirim Laporan <i class="pi pi-send"></i></span>
            </Button>
            <Button class="w-full mt-4 bg-gray-400 cursor-not-allowed" disabled v-else>
                <span class="font-bold">Lanjutkan untuk Kirim Laporan</span>
            </Button>
        </form>
    </section>
</template>