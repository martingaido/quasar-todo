<template>
	<q-page class="bg-grey-3 column">

		<!-- Add Task Field -->
		<div class="row q-pa-sm bg-primary">

			<q-input
				class="col"
				square
				filled
				bg-color="white"
				v-model="newTask"
				placeholder="Add Task"
				dense
				autofocus
				@keyup.enter="addTask">
				<template v-slot:append>
					<q-btn
						round
						dense
						flat
						icon="add"
						@click="addTask" />
				</template>
			</q-input>
		</div>

		<q-list class="bg-white" separator bordered>

			<q-item
				v-for="(task, index) in tasks"
				:key="task.id"
				@click="completeTask(index, task.done)"
				:class="{ 'done bg-blue-1' : task.done }"
				clickable
				v-ripple>

				<q-item-section avatar>
					<q-checkbox
						v-model="task.done"
						class="no-pointer-events"
						color="primary" />
				</q-item-section>

				<q-item-section>
					<q-item-label>
						{{ task.title }}
					</q-item-label>
				</q-item-section>

				<q-item-section v-if="task.done" side>
					<q-btn
						flat
						round
						dense
						color="primary"
						icon="delete"
						@click.stop="deleteTask(index)" />
				</q-item-section>

			</q-item>
		</q-list>

		<div class="no-tasks absolute-center" v-if="!tasks.length">

			<q-icon
				name="check"
				size="100px"
				color="primary">
			</q-icon>

			<div class="text-h5 text-primary text-center">
				No Tasks
			</div>
		</div>

	</q-page>
</template>

<script>
export default {

	data() {
		return {

			newTask: '',
			tasks: [],
		}
	},

	methods: {

		addTask() {

			/* Push into Local Array */
			this.tasks.push({
				id    : Date.now(),
				date  : new Date(),
				title : this.newTask,
				done  : false
			});

			/* Save into LocalStorage */
			localStorage.setItem('ToDoTasks', JSON.stringify(this.tasks));

			this.newTask = '';
			this.$q.notify('👍 Task Successfully Created');
		},

		deleteTask(index) {

			this.$q.dialog({

				title      : 'Confirm',
				message    : 'Really want to delete this item?',
				cancel     : true,
				persistent : true

			}).onOk(() => {

				/* Delete Item in Local Array */
				this.tasks.splice(index, 1);

				/* Save Local Storage */
				localStorage.setItem('ToDoTasks', JSON.stringify(this.tasks));

				this.$q.notify('😉 Task Successfully Deleted');
			});
		},

		completeTask(index, e) {

			if(e === true) {

				/* Update Task in Local Array */
				this.tasks[index].done = false;

				/* Update LocalStorage */
				localStorage.setItem('ToDoTasks', JSON.stringify(this.tasks));

			} else {

				/* Update Task in Local Array */
				this.tasks[index].done = true;

				/* Update LocalStorage */
				localStorage.setItem('ToDoTasks', JSON.stringify(this.tasks));
			}
		}
	},

	mounted() {

		/* Fetch All Tasks from LocalStorage */
		if(localStorage.getItem('ToDoTasks')) {

			this.tasks = JSON.parse(localStorage.getItem('ToDoTasks'));

		} else {

			this.tasks = [];
			localStorage.setItem('ToDoTasks', this.tasks);
		}
	}
}
</script>

<style lang="scss">
	.done {
		.q-item__label {
			text-decoration: line-through;
			color: #bbb;
		}
	}

	.no-tasks {
		opacity: 0.5;
	}
</style>
