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
import { State, Mutation } from 'vuex-class';

@Component({
	name: 'TodoPage',
	components: { TodoItem },
})
export default class Todo extends Vue {
	// 获取store中state中的数据
	@State('todoList') public list;
	public edittingIndex = -1;

	@Mutation('updateTodoList') public updateList;
	@Mutation('todoItemComplete') public handleComplete;
	public handleSave({index, content}) {
		this.updateList({index, content});
		this.handleCancel();
	}
	public handleEdit(index) {
		this.edittingIndex = index;
	}
	public handleCancel() {
		this.edittingIndex = -1;
	}
	// public handleComplete(index) {
	// 	this.list[index].complete = true;
	// }
	public turn() {
		this.$router.push({
			name: 'show',
		});
	}
}
</script>
