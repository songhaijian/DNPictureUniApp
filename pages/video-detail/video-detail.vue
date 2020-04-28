<template>
	<view class="video_detail_wrap">
		<image class="video_detail_bg" :src="videoObj.img"></image>
		<view class="video_detail_tool">
			<view :class="['iconfont',muted?'icon-jingyin':'icon-shengyin']" @click="handleMuted"></view>
			<view class="iconfont icon-zhuanfa">
				<button open-type="share"></button>
			</view>
		</view>
		<view class="video_detail_video_wrap">
			<video class="video_detail_video" :src="videoObj.video" objectFit="fill" :muted="muted"></video>
		</view>
		<view class="video_detail_download">
			<view class="video_detail_download_btn" @click="handleDownloadVideo">
				下载高清
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj: {},
				muted: false
			}
		},
		methods: {
			handleMuted() {
				this.muted = !this.muted
			},
			async handleDownloadVideo() {
				await uni.showLoading({
					title: "下载中..."
				})
				const tempFile = await uni.downloadFile({
					url: this.videoObj.video
				})
				await uni.saveVideoToPhotosAlbum({
					filePath: tempFile[1].tempFilePath
				})
				await uni.hideLoading()
				await uni.showToast({
					title: "下载成功"
				})
			}
		},
		onLoad() {
			this.videoObj = getApp().globalData.videoObj
		}
	}
</script>

<style lang="scss" scoped>
	.video_detail_wrap {
		position: relative;

		.video_detail_bg {
			position: absolute;
			width: 100vh;
			height: 100vh;
			filter: blur(10px);
			z-index: -1;
		}

		.video_detail_tool {
			height: 100rpx;
			display: flex;
			justify-content: flex-end;

			.iconfont {
				margin: 10rpx;
				width: 80rpx;
				color: #fff;
				font-size: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.3);
			}

			.icon-zhuanfa {
				position: relative;

				button {
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
		}

		.video_detail_video_wrap {
			display: flex;
			justify-content: center;

			.video_detail_video {
				width: 360rpx;
				height: 600rpx;
			}
		}

		.video_detail_download {
			display: flex;
			justify-content: center;

			.video_detail_download_btn {
				width: 360rpx;
				height: 80rpx;
				border: 1rpx solid #fff;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				margin-top: 40rpx;
				background-color: rgba(0, 0, 0, 0.6);
				font-size: 35rpx;
			}
		}
	}
</style>
