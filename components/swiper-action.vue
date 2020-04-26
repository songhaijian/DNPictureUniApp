<template>
	<view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
		<view class="">
			滑动组件
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				touchStartPosition: 0,
				touchStartTime: 0
			}
		},
		methods: {
			handleTouchStart(event) {
				this.touchStartPosition = event.changedTouches[0].clientX
				this.touchStartTime = Date.now()
			},
			handleTouchEnd(event) {
				const touchEndPosition = event.changedTouches[0].clientX
				const touchEndTime = Date.now()
				if (touchEndTime - this.touchStartTime > 2000) {
					return;
				}
				let swiperDirection = ""
				if (Math.abs(touchEndPosition - this.touchStartPosition) > 10) {
					swiperDirection = touchEndPosition - this.touchStartPosition > 0 ? "right" : "left"
				} else {
					return;
				}
				console.log(swiperDirection)
			}
		}
	}
</script>

<style>
</style>
