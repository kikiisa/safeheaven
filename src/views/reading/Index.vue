<script setup>

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'


</script>
<template>
    <section>
        <div class="list-artikel mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    Card Content
                </CardContent>
                <CardFooter>
                    Card Footer
                </CardFooter>
            </Card>
        </div>
    </section>
</template>