<template>
	<view>
		<view class="album_detail_top">
			<view class="album_detail_top_bg">
				<image :src="albumObj.cover" mode="widthFix"></image>
			</view>
			<view class="album_detail_top_info">
				<view class="album_detail_top_info_name">
					{{albumObj.name}}
				</view>
				<view class="album_detail_top_info_btn">
					关注专辑
				</view>
			</view>
		</view>
		<view class="album_detail_info">
			<view class="album_detail_user_info">
				<image :src="albumObj.user.avatar" mode="widthFix"></image>
				<view class="album_detail_nickname">
					{{albumObj.user.name}}
				</view>
			</view>
			<view class="album_detail_user_desc">
				<text>{{albumObj.desc}}</text>
			</view>
		</view>
		<view class="album_detail_list">
			<view class="album_detail_list_item" v-for="(item,index) in wallpaperList" :key="item.id" @click="handleGoToImgDetail(wallpaperList,index)">
				<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		onLoad(options) {
			this.requestUrl = "http://157.122.54.189:9088/image/v1/wallpaper/album/" + options.id + "/wallpaper"
			this.getPageData()
		},
		//滑动到底部
		onReachBottom() {
			if (this.hasMoreData) {
				this.requestParams.skip += this.requestParams.limit
				this.requestParams.first = 0
				this.getPageData()
			} else {
				uni.showToast({
					title: "没有更多数据了",
					icon: "none"
				})
			}

		},
		data() {
			return {
				requestUrl: "",
				requestParams: {
					limit: 30,
					order: "new",
					skip: 0,
					first: 1
				},
				albumObj: {},
				wallpaperList: [],
				hasMoreData: true
			}
		},
		methods: {
			// 获取页面数据
			getPageData() {
				this.request({
					url: this.requestUrl,
					data: this.requestParams
				}).then(result => {
					if (result.res.wallpaper.length === 0) {
						this.hasMoreData = false
						uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						})
						return;
					}
					if (Object.keys(this.albumObj).length === 0) {
						this.albumObj = result.res.album
					}
					this.wallpaperList = [...this.wallpaperList, ...result.res.wallpaper]
				});
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

<style lang="scss">
	.album_detail_top {
		position: relative;

		.album_detail_top_info {
			position: absolute;
			left: 0;
			bottom: 20rpx;
			color: #fff;
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
			align-items: center;
			width: 100%;

			.album_detail_top_info_name {
				font-size: 40rpx;
			}

			.album_detail_top_info_btn {
				background-color: $base-color;
				padding: 10rpx;
				border-radius: 10rpx;
			}
		}
	}

	.album_detail_info {
		padding: 20rpx;

		.album_detail_user_info {
			display: flex;

			image {
				width: 50rpx;
			}

			.album_detail_nickname {
				font-size: 30rpx;
				font-weight: 600;
				color: #000;
				margin-left: 20rpx;
			}
		}

		.album_detail_user_desc {
			margin-top: 10rpx;
		}
	}

	.album_detail_list {
		display: flex;
		flex-wrap: wrap;

		.album_detail_list_item {
			width: 33.33%;
			border: 5rpx solid #fff;
		}
	}
</style>
