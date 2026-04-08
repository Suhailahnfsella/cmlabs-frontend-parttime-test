<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbItem {
    name: string
    path: string
    isCurrent?: boolean
}

const route = useRoute()

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const crumbs: BreadcrumbItem[] = []

    crumbs.push({
        name: 'Home',
        path: '/home'
    })

    crumbs.push({
        name: 'Ingredients',
        path: '/'
    })

    const ingredientFromQuery = route.query.ingredient as string
    const ingredientName = (route.params.name as string) || (route.query.ingredient as string)
    const mealId = route.params.id as string
    const mealName = route.query.mealName as string

    if (ingredientName) {
        crumbs.push({
            name: decodeURIComponent(ingredientName),
            path: `/ingredient/${ingredientName}`
        })
    }

    if (mealId) {
        crumbs.push({
            name: mealName || 'Meal Details',
            path: `/meal/${mealId}`,
            isCurrent: true
        })
    }
    else if (ingredientName) {
        crumbs[crumbs.length - 1].isCurrent = true
    }
    else if (route.path === '/' || route.path === '/ingredients') {
        crumbs[crumbs.length - 1].isCurrent = true
    }
    else if (route.path === '/home') {
        crumbs[0].isCurrent = true
    }

    return crumbs
})
</script>

<template>
    <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center flex-wrap justify-center gap-1 md:gap-2 text-sm">
            <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
                <div class="flex items-center gap-1 md:gap-2">
                    <svg v-if="index > 0" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>

                    <svg v-if="crumb.name === 'Home'" class="w-4 h-4"
                        :class="crumb.isCurrent ? 'text-orange-500' : 'text-gray-500'" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>

                    <router-link v-if="!crumb.isCurrent" :to="crumb.path"
                        class="text-gray-500 hover:text-orange-600 transition-colors duration-200">
                        {{ crumb.name === 'Home' ? 'Home' : crumb.name }}
                    </router-link>
                    <span v-else class="text-orange-600 font-medium">
                        {{ crumb.name === 'Home' ? 'Home' : crumb.name }}
                    </span>
                </div>
            </li>
        </ol>
    </nav>
</template>