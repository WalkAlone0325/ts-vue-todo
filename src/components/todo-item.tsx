import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import './index.scss';

interface Item {
	text: string;
	complete: boolean;
}

@Component({
	name: 'TodoItem',
})
export default class TodoItem extends Vue {
	@Prop(Object) public item!: Item;
	@Prop(Number) public index!: number;
	@Prop(Number) public edittingIndex!: number;

	public edittingContent = '';

	@Watch('edittingIndex')
	public edittingChange(index) {
		if (index === this.index) {
			this.edittingContent = this.item.text;
		} else {
			this.edittingContent = '';
		}
	}

	// public save() {
	// 	this.$emit('on-save', {
	// 		index: this.index,
	// 		content: this.edittingContent,
	// 	});
	// }

	// @Emit('on-save')
	// // 下面绑定事件写 this.save.bind(this, this.index, this.edittingContent)
	// public save(index, content, event) {
	// 	// 阻止事件冒泡
	// 	// event.stopPropagation();
	// 	return {
	// 		index,
	// 		content,
	// 	};
	// }

	@Emit('on-save')
	// 下面绑定事件写 this.save.bind(this, this.index, this.edittingContent)
	public save() {
		return {
			index: this.index,
			content: this.edittingContent,
		};
	}

	public onedit(event) {
		// 阻止事件冒泡
		event.stopPropagation();
		this.$emit('on-edit', this.index);
	}

	public cancel(event) {
		// 阻止事件冒泡
		event.stopPropagation();
		this.$emit('on-cancel');
	}

	public complete() {
		this.$emit('on-complete', this.index);
	}

	protected render() {
		return (
			<li class='item-wrap'>
				{
					this.edittingIndex === this.index ? (
						<div>
							<a-input v-model={this.edittingContent} style='width: 200px'></a-input>
							<a-icon type='check' nativeOn-click={this.save}></a-icon>
							<a-icon type='close' nativeOn-click={this.cancel}></a-icon>
						</div>
					) : (
						<div>
							<span
							 on-click={this.complete}
							 style={this.item.complete ? {textDecoration: 'line-through' } : {}}>{this.item.text}</span>
							<a-icon type='edit' nativeOn-click={this.onedit}></a-icon>
						</div>
					)
				}
			</li>
		);
	}
}
