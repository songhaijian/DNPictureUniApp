<template>
	<scroll-view class="album_wrap" :scroll-y="true" @scrolltolower="handleReachBottom">
		<!-- 轮播图开始 -->
		<swiper :indicator-dots="true" :autoplay="true" :circular="true" class="swiper_wrap">
			<swiper-item v-for="item in swiperList" :key="item.id">
				<image :src="item.thumb"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图结束 -->
		<!-- 专辑列表开始 -->
		<view class="album_list">
			<navigator v-for="item in albumList"
			 :key="item.id" class="album_list_item"
			 :url="'/pages/album-detail/album-detail?id='+ item.id">
				<view class="album_list_item_img">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album_list_item_info">
					<view class="album_list_item_info_name">
						{{item.name}}
					</view>
					<view class="album_list_item_info_desc">
						{{item.desc}}
					</view>
					<view class="album_list_item_info_attention">
						<view class="album_list_item_info_add_attention">
							+ 关注
						</view>
					</view>
				</view>
			</navigator>
		</view>
		<!-- 专辑列表结束 -->
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				albumList: [],
				requestParams: {
					limit: 30,
					order: "new",
					skip: 0
				},
				hasMoreData: true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: "专辑"
			})
			this.getList()
		},
		methods: {
			// 获取列表数据
			getList() {
				this.request({
					url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
					data: this.requestParams
				}).then(result => {
					if (result.res.album.length === 0) {
						this.hasMoreData = false
						return;
					}
					if (this.swiperList.length === 0) {
						this.swiperList = result.res.banner
					}
					this.albumList = [...this.albumList, ...result.res.album]
				})
			},
			// scrollview到达底部
			handleReachBottom() {
				if (this.hasMoreData) {
					this.requestParams.skip += this.requestParams.limit
					this.getList()
				} else {
					uni.showToast({
						title: "没有更多数据了",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.album_wrap {
		height: calc(100vh - 36px);
	}

	.swiper_wrap {
		height: 333.33rpx;

		image {
			height: 100%;
		}
	}

	.album_list_item {
		padding: 10rpx;
		display: flex;
		border-bottom: 1rpx solid #ccc;

		.album_list_item_img {
			padding: 10rpx;
			flex: 1;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}

		.album_list_item_info {
			flex: 2;
			overflow: hidden;

			.album_list_item_info_name {
				font-size: 30rpx;
				color: #000;
				padding: 10rpx 0;
			}

			.album_list_item_info_desc {
				padding: 10rpx 0;
				font-size: 24rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.album_list_item_info_attention {
				display: flex;
				justify-content: flex-end;
				padding: 10rpx;

				.album_list_item_info_add_attention {
					border: 2rpx solid $base-color;
					color: $base-color;
					padding: 10rpx;
				}
			}
		}
	}
</style>
