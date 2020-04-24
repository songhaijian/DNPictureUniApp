<template>
	<view>
		<!-- 推荐开始 -->
		<view class="recommend_wrap">
			<view class="recommend_item" v-for="item in recomendList" :key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view>
		<!-- 推荐结束 -->
		<!-- 月份开始 -->
		<view class="month_wrap">
			<view class="month_title_wrap">
				<view class="month_left">
					<view class="month_date">
						<view class="month_year">
							{{monthObj.Month}}/
						</view>
						<view class="month_month">
							{{monthObj.Day}}月
						</view>
					</view>
					<view class="month_title">
						{{monthObj.title}}
					</view>
				</view>
				<view class="month_right">
					更多>
				</view>
			</view>
			<view class="month_content">
				<view class="month_content_item" v-for="item in monthObj.items" :key="item.id">
					<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 月份结束 -->
		<!-- 热门开始 -->
		<view class="hot_wrap">
			<view class="hot_title">
				热门
			</view>
			<view class="hot_content">
				<view class="hot_content_item" v-for="item in hotList" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 热门结束 -->
	</view>
</template>

<script>
	import monentUtils from "moment"
	export default {
		data() {
			return {
				recomendList: [],
				monthObj: {},
				hotList: []
			}
		},
		mounted() {
			this.request({
				url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
				data: {
					limit: 30,
					order: "hot",
					skip: 0
				}
			}).then(result => {
				// 推荐数据
				this.recomendList = result.res.homepage[1].items
				//月份数据
				this.monthObj = result.res.homepage[2]
				this.monthObj.Month = monentUtils(this.monthObj.stime).format("MM")
				this.monthObj.Day = monentUtils(this.monthObj.stime).format("DD")
				// 热门数据
				this.hotList = result.res.vertical
			})
		}
	}
</script>

<style lang="scss">
	.recommend_wrap {
		display: flex;
		flex-wrap: wrap;

		.recommend_item {
			width: 50%;
			border: 5rpx solid #fff;
		}
	}

	.month_title_wrap {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: 20rpx 10rpx;

		.month_left {
			display: flex;
			align-items: baseline;
			font-weight: 600;

			.month_date {
				color: $base-color;
				display: flex;
				align-items: baseline;

				.month_year {
					font-size: 36rpx;
				}

				.month_month {
					font-size: 30rpx;
				}
			}

			.month_title {
				margin-left: 20rpx;
				font-size: 30rpx;
				color: #666;
			}
		}

		.month_right {
			color: $base-color;
			font-size: 24rpx;
		}
	}

	.month_content {
		display: flex;
		flex-wrap: wrap;

		.month_content_item {
			width: 33.33%;
			border: 5rpx solid #fff;
		}
	}

	.hot_wrap {
		.hot_title {
			font-size: 35rpx;
			font-weight: 600;
			margin: 10px 0;
			margin-left: 10rpx;
			font-size: 30rpx;
			border-left: 10rpx solid $base-color;
			padding-left: 20rpx;
		}

		.hot_content {
			display: flex;
			flex-wrap: wrap;

			.hot_content_item {
				width: 33.33%;
				border: 5rpx solid #fff;
			}
		}
	}
</style>
