<template>
	<q-layout view="lHh Lpr lFf">
		<q-header>
		<q-toolbar>
			<q-btn
				flat dense round
				icon="menu"
				aria-label="Menu"
				@click="leftDrawerOpen = !leftDrawerOpen" />
		</q-toolbar>

		<!-- Top Bar Title & Date -->
		<div class="q-px-lg q-pt-xl q-mb-md">
			<div class="text-h3">Welcome</div>
			<div class="text-subtitle1">{{ todaysDate }}</div>
		</div>

		<!-- Header Image -->
		<q-img src="../assets/mountains.jpeg" class="header-image absolute-top"></q-img>

		</q-header>

		<!-- Drawer -->
		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			:width="250"
			:breakpoint="600">

		<q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
		<q-list padding>

			<!-- To-Do Menu -->
			<q-item to="/" exact clickable v-ripple>
				<q-item-section avatar>
					<q-icon name="list" />
				</q-item-section>

				<q-item-section>
					Home Page
				</q-item-section>
			</q-item>

			<!-- Help Menu -->
			<q-item to="/help" exact clickable v-ripple>
				<q-item-section avatar>
					<q-icon name="help" />
				</q-item-section>

				<q-item-section>
					Help & Support
				</q-item-section>
			</q-item>

		</q-list>
		</q-scroll-area>

		<q-img class="absolute-top" src="../assets/mountains.jpeg" style="height: 192px">
		<div class="absolute-bottom bg-transparent">

			<q-avatar size="56px" class="q-mb-sm">
				<img src="../assets/avatar.png">
			</q-avatar>

			<div class="text-weight-bold">
				User Name
			</div>

			<div>
				@user-name
			</div>
		</div>
		</q-img>
	</q-drawer>

		<q-page-container>
			<keep-alive>
				<router-view />
			</keep-alive>
		</q-page-container>

	</q-layout>
</template>

<script>
import { date } from 'quasar';

import EssentialLink from "components/EssentialLink.vue";

export default {
	name: "MainLayout",
	components: { EssentialLink },
	data() {
		return {
			leftDrawerOpen: false,
		};
	},

	computed: {

		todaysDate() {
			let timeStamp = Date.now();
			return date.formatDate(timeStamp, 'dddd D MMMM');
		}
	}
};
</script>

<style lang="scss">
	.header-image {
		height: 100%;
		z-index: -1;
		opacity: 0.2;
		filter: grayscale(100%);
	}
</style>
