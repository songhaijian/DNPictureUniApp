<template>
	<scroll-view class="video_commen_wrap" scroll-y="true" enable-flex @scrolltolower="handleScrolltolower">
		<view class="view_commen_list_wrap">
			<view class="video_commen_item" v-for="(item,index) in pageList" :key="item.id" @click="handleItemClick(item)">
				<image :src="item.img" mode="widthFix"></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				pageList: [],
				hasMoreData: true
			}
		},
		props: {
			urlObj: Object
		},
		mounted() {
			this.getListData()
		},
		watch: {
			urlObj() {
				this.pageList = []
				this.getListData()
			}
		},
		methods: {
			//获取列表数据
			getListData() {
				this.request({
					url: this.urlObj.url,
					data: this.urlObj.param
				}).then(result => {
					if (result.res.videowp.length === 0) {
						this.hasMoreData = false
						uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						})
						return;
					}
					this.pageList = [...this.pageList, ...result.res.videowp]
				})
			},
			//到达底部
			handleScrolltolower() {
				if (this.hasMoreData) {
					this.urlObj.param.skip += this.urlObj.param.limit
					this.getListData()
				} else {
					uni.showToast({
						title: "没有更多数据了",
						icon: "none"
					})
				}

			},
			handleItemClick(item) {
				getApp().globalData.videoObj = item
				uni.navigateTo({
					url: "/pages/video-detail/video-detail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_commen_wrap {
		height: calc(100vh - 36px);

		.view_commen_list_wrap {
			display: flex;
			flex-wrap: wrap;

			.video_commen_item {
				width: 33.33%;
				border: 5rpx solid #fff;

				image {}
			}
		}

	}
</style>
