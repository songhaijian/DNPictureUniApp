
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/horizontal/horizontal","pages/video/video","pages/search/search","pages/mine/mine","pages/album-detail/album-detail","pages/img-detail/img-detail","pages/category-detail/category-detail","pages/video-detail/video-detail"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"懂你找图","navigationBarBackgroundColor":"#000"},"tabBar":{"color":"#8a8a8a","selectedColor":"#d4237a","backgroundColor":"#fff","position":"bottom","borderStyle":"black","list":[{"pagePath":"pages/index/index","iconPath":"./static/img/home_normal.png","selectedIconPath":"./static/img/home_active.png","text":"首页"},{"pagePath":"pages/horizontal/horizontal","iconPath":"./static/img/horizontal_normal.png","selectedIconPath":"./static/img/horizontal_avtive.png","text":"横屏"},{"pagePath":"pages/video/video","iconPath":"./static/img/video_normal.png","selectedIconPath":"./static/img/video_active.png","text":"精美视频"},{"pagePath":"pages/search/search","iconPath":"./static/img/search_normal.png","selectedIconPath":"./static/img/search_active.png","text":"搜索"},{"pagePath":"pages/mine/mine","iconPath":"./static/img/mine_normal.png","selectedIconPath":"./static/img/mine_active.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"DNPicture","compilerVersion":"2.6.15","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/horizontal/horizontal","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"横屏"}},{"path":"/pages/video/video","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"精美视频"}},{"path":"/pages/search/search","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/album-detail/album-detail","meta":{},"window":{"navigationBarTitleText":"专辑详情"}},{"path":"/pages/img-detail/img-detail","meta":{},"window":{"navigationBarTitleText":"图片详情"}},{"path":"/pages/category-detail/category-detail","meta":{},"window":{"navigationBarTitleText":"图片分类详情"}},{"path":"/pages/video-detail/video-detail","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});