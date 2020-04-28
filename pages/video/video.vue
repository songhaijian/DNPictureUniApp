<template>
	<view>
		<view class="video_tab_wrap">
			<uni-segmented-control class="video_tab" :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem"
			 style-type="text" active-color="#d4237a"></uni-segmented-control>
			<view class="video_tab_search">
				<text class="iconfont icon-search"></text>
			</view>
		</view>
		<view class="content">
			<view v-show="current < 4">
				<video-commen :urlObj="{url:this.items[this.current].url,param:this.items[this.current].param}"></video-commen>
			</view>
			<view v-show="current === 4">
				<video-category></video-category>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from "@dcloudio/uni-ui";
	import videoCommen from "@/pages/video/video-commen/video-commen.vue";
	import videoCategory from "@/pages/video/video-category/video-category.vue";
	export default {
		components: {
			uniSegmentedControl,
			videoCommen,
			videoCategory
		},
		data() {
			return {
				items: [{
					title: "推荐",
					url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
					param: {
						limit: 30,
						skip: 0,
						order: "hot"
					}
				}, {
					title: "娱乐",
					url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
					param: {
						limit: 30,
						skip: 0,
						order: "new"
					}
				}, {
					title: "最新",
					url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
					param: {
						limit: 30,
						skip: 0,
						order: "new"
					}
				}, {
					title: "热门",
					url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
					param: {
						limit: 30,
						skip: 0,
						order: "hot"
					}
				}, {
					title: "分类",
					url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
					param: {}
				}],
				current: 0
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

<style lang="scss" scoped>
	.video_tab_wrap {
		display: flex;

		.video_tab {
			flex: 1;
			margin-left: 10%;
		}

		.video_tab_search {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 10%;
		}
	}
</style>
