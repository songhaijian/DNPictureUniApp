<template>
	<view>
		<view class="category_detail_tab_wrap">
			<uni-segmented-control class="category_detail_tab" :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem"
			 style-type="text" active-color="#d4237a"></uni-segmented-control>
			<view class="iconfont icon-search category_detail_tab_search">

			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_wrap" enable-flex @scrolltolower="handleScrolltolower">
			<view class="view_wrap">
				<view class="categoty_detail_item" v-for="(item,index) in listData" :key="item.id" @click="handleGoToImgDetail(listData,index)">
					<image :src="
				 item.thumb" mode="widthFix">
					</image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from "@dcloudio/uni-ui";
	export default {
		components: {
			uniSegmentedControl,
		},
		onLoad(options) {
			this.id = options.id
			this.getPageData()
		},
		data() {
			return {
				items: [{
					title: '最新',
					type: "new"
				}, {
					title: '热门',
					type: "hot"
				}],
				current: 0,
				listData: [],
				id: 0,
				requestParams: {
					limit: 30,
					skip: 0,
					order: "new"
				}
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				} else {
					return;
				}
				this.requestParams.skip = 0
				this.requestParams.order = this.items[this.current].type
				this.listData = []
				this.getPageData()
			},
			getPageData() {
				this.request({
					url: "http://157.122.54.189:9088/image/v1/vertical/category/" + this.id + "/vertical",
					data: this.requestParams
				}).then(result => {
					this.listData = [...this.listData, ...result.res.vertical]
				})
			},
			handleScrolltolower() {
				this.requestParams.skip += this.requestParams.limit
				this.getPageData()
			},
			//点击跳转图片详情
			handleGoToImgDetail(imgList, imgIndex) {
				getApp().globalData.imgList = imgList
				getApp().globalData.imgIndex = imgIndex
				uni.navigateTo({
					url: "/pages/img-detail/img-detail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category_detail_tab_wrap {
		display: flex;

		.category_detail_tab {
			flex: 5;
			margin: 0 100rpx;
		}

		.category_detail_tab_search {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.scroll_wrap {
		height: calc(100vh - 36px);

		.view_wrap {
			display: flex;
			flex-wrap: wrap;

			.categoty_detail_item {
				border: 5rpx solid #fff;
				width: 33.33%;
			}
		}

	}
</style>
