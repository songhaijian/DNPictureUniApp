<template>
	<view>
		<!-- 用户信息开始 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetailObj.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">
					{{imgDetailObj.user.name}}
				</view>
				<view class="user_time">
					{{imgDetailObj.newDate}}
				</view>
			</view>
		</view>
		<!-- 用户信息结束 -->
		<!-- 高清大图开始 -->
		<swiper-action @swiperAction="handlerSwiperAction">
			<image :src="imgDetailObj.thumb" mode="widthFix"></image>
		</swiper-action>
		<!-- 高清大图结束 -->
		<!-- 收藏和评论开始 -->
		<view class="rank_collect_wrap">
			<view class="rank_wrap">
				<text class="iconfont icon-dianzan">{{imgDetailObj.rank}}</text>
			</view>
			<view class="collect_wrap">
				<text class="iconfont icon-shoucang">收藏</text>
			</view>
		</view>
		<!-- 收藏和评论结束 -->
		<!-- 相关开始 -->
		<view class="about_wrap" v-if="aboutList.length">
			<view class="about_title">相关</view>
			<view class="about_item" v-for="(item,index) in aboutList" :key="item.id">
				<view class="about_item_img">
					<image :src="item.cover" mode="widthFix"></image>
				</view>
				<view class="about_item_info">
					<view class="about_item_album">
						专辑
					</view>
					<view class="about_item_name">
						{{item.name}}
					</view>
				</view>
				<view class="about_item_jiantou">
					<text class="iconfont icon-jiantou"></text>
				</view>

			</view>
		</view>
		<!-- 相关结束 -->
		<!-- 最热评论开始 -->
		<view class="hot_comment_wrap" v-if="hotList.length">
			<view class="hot_comment_title_wrap">
				<text class="iconfont icon-hot"></text>
				<text class="hot_comment_title">最热评论</text>
			</view>
			<view class="hot_comment_item" v-for="(item,index) in hotList" :key="item.id">
				<view class="hot_comment_item_user_wrap">
					<view class="hot_comment_item_user_icon">
						<image :src="item.user.avatar" mode="widthFix"></image>
					</view>
					<view class="hot_comment_item_user_info">
						<view class="hot_comment_item_user_name">
							{{item.user.name}}
						</view>
						<view class="hot_comment_item_user_time">
							{{item.newTime}}
						</view>
					</view>
					<view class="hot_comment_item_user_badge">
						<view class="hot_comment_item_user_badge_item" v-for="itemBadge in item.user.title" :key="index">
							<image :src="itemBadge.icon" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="hot_comment_item_comment_wrap">
					<view class="hot_comment_item_comment_text">
						{{item.content}}
					</view>
					<view class="hot_comment_item_comment_zan">
						<text class="iconfont icon-dianzan"></text>
						<text class="hot_comment_item_comment_zan_count">{{item.size}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 最热评论结束 -->
		<!-- 最新评论开始 -->
		<view class="hot_comment_wrap" v-if="commentList.length">
			<view class="hot_comment_title_wrap">
				<text class="iconfont icon-pinglun comment_icon"></text>
				<text class="hot_comment_title">最热评论</text>
			</view>
			<view class="hot_comment_item" v-for="(item,index) in commentList" :key="item.id">
				<view class="hot_comment_item_user_wrap">
					<view class="hot_comment_item_user_icon">
						<image :src="item.user.avatar" mode="widthFix"></image>
					</view>
					<view class="hot_comment_item_user_info">
						<view class="hot_comment_item_user_name">
							{{item.user.name}}
						</view>
						<view class="hot_comment_item_user_time">
							{{item.newTime}}
						</view>
					</view>
					<view class="hot_comment_item_user_badge">
						<view class="hot_comment_item_user_badge_item" v-for="itemBadge in item.user.title" :key="index">
							<image :src="itemBadge.icon" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="hot_comment_item_comment_wrap">
					<view class="hot_comment_item_comment_text">
						{{item.content}}
					</view>
					<view class="hot_comment_item_comment_zan">
						<text class="iconfont icon-dianzan"></text>
						<text class="hot_comment_item_comment_zan_count">{{item.size}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 最新评论结束 -->
		<!-- 下载图片开始 -->
		<view class="download_img_wrap" @click="handleDownloadImg">
			下载图片
		</view>
		<!-- 下载图片结束 -->
	</view>
</template>

<script>
	import momentUtils from "moment";
	import swiperAction from "@/components/swiper-action"
	momentUtils.locale("zh-cn");
	export default {
		components: {
			swiperAction
		},
		data() {
			return {
				imgDetailObj: {},
				aboutList: [],
				hotList: [],
				commentList: [],
				imgList: [],
				imgIndex: 0
			}
		},
		onLoad() {
			this.imgIndex = getApp().globalData.imgIndex
			this.imgList = getApp().globalData.imgList
			this.getPageData()
		},
		methods: {
			//获取页面数据
			getPageData() {
				this.imgDetailObj = this.imgList[this.imgIndex]
				this.imgDetailObj.bigHighImg = this.imgDetailObj.thumb + this.imgDetailObj.rule.replace("$<Height>", 360)
				this.imgDetailObj.newDate = momentUtils(this.imgDetailObj.atime * 1000).fromNow()
				this.getCommentData(this.imgDetailObj.id)
			},
			//获取评论数据
			getCommentData(imgId) {
				this.request({
					url: "http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/" + imgId + "/comment"
				}).then(result => {
					this.aboutList = result.res.album
					this.hotList = result.res.hot
					this.hotList.forEach(v => v.newTime = momentUtils(v.atime * 1000).fromNow())
					this.commentList = result.res.comment
					this.commentList.forEach(v => v.newTime = momentUtils(v.atime * 1000).fromNow())
				})
			},
			//滑动监听
			handlerSwiperAction(event) {
				if (event.swiperDirection == "left" && this.imgIndex < this.imgList.length - 1) {
					this.imgIndex++
					this.getPageData()
				} else if (event.swiperDirection == "right" && this.imgIndex > 0) {
					this.imgIndex--
					this.getPageData()
				} else {
					uni.showToast({
						title: "没有数据了",
						icon: "none"
					})
				}
			},
			//下载图片
			async handleDownloadImg() {
				await uni.showLoading({
					title: "下载中..."
				})
				const tempFile = await uni.downloadFile({
					url: this.imgDetailObj.img
				})
				const imgRes = await uni.saveImageToPhotosAlbum({
					filePath: tempFile[1].tempFilePath
				})
				await uni.hideLoading()
				await uni.showToast({
					title: "下载成功"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_info {
		padding: 20rpx;
		display: flex;

		.user_icon {
			padding: 0 20rpx;

			image {
				width: 90rpx;
				border-radius: 50%;
			}
		}

		.user_desc {
			.user_name {
				font-size: 30rpx;
				color: #000;
				font-weight: 500;
			}

			.user_time {
				font-size: 24rpx;
				color: #666;
				margin-top: 10rpx;
			}
		}
	}

	.rank_collect_wrap {
		display: flex;
		height: 80rpx;
		border-bottom: 1rpx solid #ccc;
		border-top: 1rpx solid #ccc;

		.rank_wrap {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.collect_wrap {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.about_wrap {
		padding-left: 10rpx;

		.about_title {
			color: #000;
			font-size: 30rpx;
			padding: 20rpx 0;
		}

		.about_item {
			display: flex;
			padding-bottom: 10rpx;
			border-bottom: 1rpx solid #ccc;

			.about_item_img {
				flex: 1;

				image {
					width: 100%;
				}
			}

			.about_item_info {
				flex: 2;
				margin-left: 10rpx;

				.about_item_album {
					background-color: $base-color;
					color: #fff;
					border-radius: 10rpx;
					width: 100rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
				}

				.about_item_name {
					margin-top: 10rpx;
					color: #000;
					font-size: 30rpx;
				}
			}

			.about_item_jiantou {
				flex: 0.5;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.hot_comment_wrap {
		.hot_comment_title_wrap {
			padding: 10rpx;

			.icon-hot {
				color: $base-color;
			}

			.hot_comment_title {
				color: #000;
				margin-left: 10rpx;
			}
		}

		.hot_comment_item {
			padding: 10rpx;
			border-bottom: 10rpx solid #eee;

			.hot_comment_item_user_wrap {
				display: flex;

				.hot_comment_item_user_icon {
					width: 15%;

					image {
						width: 100%;
					}
				}

				.hot_comment_item_user_info {
					margin-left: 10rpx;
					flex: 1;

					.hot_comment_item_user_name {
						color: #ccc;
					}

					.hot_comment_item_user_time {
						margin-top: 10rpx;
						color: #999;
					}
				}

				.hot_comment_item_user_badge {
					display: flex;

					.hot_comment_item_user_badge_item {
						image {
							width: 40rpx;
						}
					}
				}

			}

			.hot_comment_item_comment_wrap {
				margin-left: 15%;
				padding-left: 10rpx;
				margin-top: 10rpx;
				display: flex;

				.hot_comment_item_comment_text {
					color: #000;
					flex: 1;
				}

				.hot_comment_item_comment_zan {
					.hot_comment_item_comment_zan_count {
						margin-left: 10rpx;
					}
				}
			}
		}

	}

	.comment_icon {
		color: aqua !important;
	}

	.download_img_wrap {
		margin: 20rpx auto;
		text-align: center;
		line-height: 80rpx;
		border-radius: 10rpx;
		width: 90%;
		height: 80rpx;
		background-color: $base-color;
		color: #fff;
		font-size: 40rpx;
		font-weight: 500;
	}
</style>
