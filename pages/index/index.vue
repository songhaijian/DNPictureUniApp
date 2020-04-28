<template>
	<view>
		<view>
			<view class="tab_title">
				<view class="tab_control">
					<uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text"
					 active-color="#d4237a"></uni-segmented-control>
				</view>
				<view class="iconfont icon-search">

				</view>
			</view>
			<view class="tab_content">
				<view v-if="current === 0">
					<home-recommend></home-recommend>
				</view>
				<view v-if="current === 1">
					<home-category></home-category>
				</view>
				<view v-if="current === 2">
					<home-new></home-new>
				</view>
				<view v-if="current === 3">
					<home-album></home-album>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import homeAlbum from "./home-album/home-album.vue";
	import homeCategory from "./home-category/home-category.vue";
	import homeNew from "./home-new/home-new";
	import homeRecommend from "./home-recommend/home-recommend.vue";
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui';
	export default {
		components: {
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend,
			uniSegmentedControl
		},
		data() {
			return {
				items: [{
					title: "推荐"
				}, {
					title: "分类"
				}, {
					title: "最新"
				}, {
					title: "专辑"
				}],
				current: 1
			}

		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss">
	.tab_title {
		display: flex;

		.tab_control {
			margin-left: 10%;
			flex: 6;
		}

		.icon-search {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
		}
	}
</style>
