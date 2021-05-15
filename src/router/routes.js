
const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('src/pages/Todo.vue') },
			{ path: '/help', component: () => import('src/pages/Help.vue') }
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes
