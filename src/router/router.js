import { createRouter, createWebHistory } from 'vue-router'

import iconCollection from "@/assets/images/icon-dashboard.svg";

import CollectionPage from '../components/views/CollectionPage.vue'
import TestPage from '../components/views/TestPage.vue'
import TestPage2 from '../components/views/TestPage2.vue'
import TestPage3 from '../components/views/TestPage3.vue'

const ignoreShowLeftMenu = ['Child3']

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        { name: 'Collection', path: '/collection', meta: { image: iconCollection }, component: CollectionPage },
        {
            name: 'TestPage', path: '', meta: { image: iconCollection }, children: [
                { name: 'Child1', path: '/test/child1', component: TestPage },
                { name: 'Child2', path: '/test/child2', component: TestPage2 },
                { name: 'Child3', path: '/test/child3', component: TestPage3 },
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next('/collection')
    } else {
        next()
    }
})

export { ignoreShowLeftMenu, router }
