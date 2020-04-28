<template>
	<scroll-view class="caterory_wrap" scroll-y="true">
		<view class="category_list_wrap">
			<view class="caterory_item" v-for="(item,index) in categoryList" :key="item.id" @click="handleItemClick(item.id)">
				<image :src="item.cover" mode="aspectFill"></image>
				<view class="caterory_item_name">
					{{item.name}}
				</view>
			</view>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: []
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: "分类"
			})
			this.getPageListData()
		},
		methods: {
			//获取列表数据
			getPageListData() {
				this.request({
					url: "http://157.122.54.189:9088/image/v1/vertical/category"
				}).then(result => {
					this.categoryList = result.res.category
				})
			},
			//点击事件
			handleItemClick(id) {
				uni.navigateTo({
					url: "/pages/category-detail/category-detail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.caterory_wrap {
		height: calc(100vh - 36px);

		.category_list_wrap {
			display: flex;
			flex-wrap: wrap;
			.caterory_item {
				width: 33.33%;
				position: relative;
				border: 5rpx solid #fff;

				image {
					width: 100%;
					height: 240rpx;
				}

				.caterory_item_name {
					width: 100%;
					height: 60rpx;
					left: 0;
					bottom: 0;
					color: #fff;
					display: flex;
					padding-left: 10rpx;
					align-items: center;
					position: absolute;
					font-size: 35rpx;
					font-weight: 500;
					background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
				}
			}
		}

	}
</style>
