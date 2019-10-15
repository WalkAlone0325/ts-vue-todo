<template>
  <div class="todo-page">
    <ul>
      <todo-item 
				v-for="(item, index) in list" 
				:key="index"
				:item="item"
				:index="index"
				:editting-index="edittingIndex"
				@on-save="handleSave"
				@on-edit="handleEdit"
				@on-cancel="handleCancel"
				@on-complete="handleComplete"
				></todo-item>
    </ul>
		<a-button @click="turn">跳转</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoItem from '../components/todo-item';

@Component({
	name: 'TodoPage',
	components: { TodoItem },
})
export default class Todo extends Vue {
	public edittingIndex = -1;
	public list = [
		{
			text: '学习typescript',
			complete: false,
		},
		{
			text: '学习vue',
			complete: false,
		},
	];
	public handleSave({index, content}) {
		console.log(index, content);
		this.list[index].text = content;
		this.handleCancel();
	}
	public handleEdit(index) {
		this.edittingIndex = index;
	}
	public handleCancel() {
		this.edittingIndex = -1;
	}
	public handleComplete(index) {
		this.list[index].complete = true;
	}
	public turn() {
		this.$router.push({
			name: 'show',
		});
	}
}
</script>
