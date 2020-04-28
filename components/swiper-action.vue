<template>
	<view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				touchStartPosition: 0,
				touchStartPositionY: 0,
				touchStartTime: 0
			}
		},
		methods: {
			handleTouchStart(event) {
				this.touchStartPosition = event.changedTouches[0].clientX
				this.touchStartPositionY = event.changedTouches[0].clientY
				this.touchStartTime = Date.now()
			},
			handleTouchEnd(event) {
				const touchEndPosition = event.changedTouches[0].clientX
				const touchEndPositionY = event.changedTouches[0].clientY
				const touchEndTime = Date.now()
				if (touchEndTime - this.touchStartTime > 2000) {
					return;
				}
				let swiperDirection = ""
				if (Math.abs(touchEndPosition - this.touchStartPosition) > 50 &&
					Math.abs(touchEndPositionY - this.touchStartPositionY < 50)) {
					swiperDirection = touchEndPosition - this.touchStartPosition > 0 ? "right" : "left"
				} else {
					return;
				}
				this.$emit("swiperAction", {
					swiperDirection
				})
			}
		}
	}
</script>

<style>
</style>
