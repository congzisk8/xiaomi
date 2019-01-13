
handleCart();
handleNav();
handleCarousel();
handleCate();
handleCountdown();
handleFlashProudct();
handleElecOriduct();

//处理购物车
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.head1-right');
	var oCartLink = document.querySelector('.head1-right-box a');
	var oCartContent = document.getElementById('box11');
	var oLoder = document.querySelector('.loader');
	var oEmptyCart = document.getElementById('s1');

	oCart.onmouseenter = function(){
		//1.改变购物车图标的背景色和字体颜色
		oCartLink.style.background = '#fff';
		oCartLink.style.color = '#ff6700';
		//2.加载loading图标
		oLoder.style.display = 'block'
		//3.显示购物车内容,假设购物车完全显示，就获取购物车数据
		animate(oCartContent,{height:110},true,function(){
			oLoder.style.display = 'none';
			oEmptyCart.style.display = 'block';
		});
	}
	oCart.onmouseleave = function(){
		//1.改变购物车图标的背景色和字体颜色
		oCartLink.style.background = '#424242';
		oCartLink.style.color = '#b0b0b0';
		//2.隐藏购物车内容
		animate(oCartContent,{height:0},true,function(){
		//隐藏购物车数据和loading图片
		oLoder.style.display = 'none';
		oEmptyCart.style.display = 'none';
		});
	}	
}
//处理导航
function handleNav(){
	//1.获取导航列表
	var aNavItem = document.querySelectorAll('.header-nav-item')
	var oNavContent = document.querySelector('.header-nav-content')
	var oNavContentContainer = oNavContent.querySelector('.container')
	var hideTimer = 0;
	var loadTimer = 0
	//2.批量监听导航列表事件
	for(var i = 0;i<aNavItem.length-2;i++){
		//2.1鼠标移入事件
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			oNavContentContainer.innerHTML = '<div class="loader"></div>';
			animate(oNavContent,{height:180},true,function(){
				oNavContent.style.overflow = 'visible'
			});
			//模拟加载数据
			var index = this.index;
			//去除不必要的加载
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				loadData(index);
			},500)
		}
		//2.2鼠标移出事件
		aNavItem[i].onmouseleave = function(){
			hideNavContent();
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		hideNavContent();
	}
	function hideNavContent(){
		hideTimer = setTimeout(function(){
			oNavContent.style.overflow = 'hidden'			
			animate(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = 'none';
			})
		},500)		
	}
	function loadData(index){
		var data = aNavItemData[index];
		var html = '<ul>';
		for(var i = 0;i<data.length;i++){
				html +=	'<li>';
				html +=	'	<div class="img-box">';
				html +=	'		<a href="'+data[i].url+'">';
				html +=	'			<img src="'+data[i].img+'">';
				html +=	'		</a>';
				html +=	'	</div>';
				html +=	'	<p class="procude-name">'+data[i].name+'</p>';
				html +=	'	<p class="procude-price">'+data[i].price+'</p>';
				if(data[i].tag){
					html +=	'	<span class="tag">'+data[i].tag+'</span>';
				}
				html +=	'</li>';
		}
		html+='</ul>';

		oNavContentContainer.innerHTML = html;

	}
}
//处理首页轮播图
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:['新建文件夹/04-project/mi/images/b1.jpg','新建文件夹/04-project/mi/images/b2.jpg','新建文件夹/04-project/mi/images/b3.jpg'],
		width:1226,
		height:460,
		playDuration:1000
	});	
}
//处理分类
function handleCate(){
	var aCateItem = document.querySelectorAll('.cate-item');
	var oCateContent = document.querySelector('.cate-content');
	var oCateBox = document.querySelector('.cat-box');
	for(var i = 0;i<aCateItem.length;i++){
		aCateItem[i].index = i;
		aCateItem[i].onmouseenter = function(){
		for(var j = 0;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item'
		}			
			oCateContent.style.display = 'block';
			this.className = 'cate-item active';
			//加载数据
			loadData(this.index);
		}
	}
	oCateBox.onmouseleave = function(){
		oCateContent.style.display = 'none';
		for(var j = 0;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item'
		}		
	}

	function loadData(index){
		var data = aCateItemDate[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html +=	'<li>';
			html +=		'<a href="'+data[i].url+'">';
			html +=			'<img src="'+data[i].img+'">';
			html +=			'<span>'+data[i].name+'</span>';
			html +=		'</a>';
			html +=	'</li>';		
		}
		html += '</ul>';
		oCateContent.innerHTML = html;
	}
}
//处理倒计时
function handleCountdown(){
	var oTimenubm = document.querySelectorAll('.content3 .box1 .s3,.content3 .box1 .s10,.content3 .box1 .s5');
	var endDate = new Date('2019-1-15 15:06:59');
	var timer = 0
	function to2Str(num){
		return num > 9 ? '' +num : '0'+num;
	}
	function handleTimer(){
		var endTime = endDate.getTime();
		var allMinsecinds = endTime - Date.now();
		if(allMinsecinds < 0){
			allMinsecinds = 0;
			clearInterval(timer);
		}
		var allSeconds = parseInt(allMinsecinds/1000);
		var iHour = parseInt(allSeconds/3600);
		var iMinute = parseInt((allSeconds % 3600) /60);
		var iSeconds = (allSeconds % 3600)%60;
		oTimenubm[0].innerHTML = to2Str(iHour);
		oTimenubm[1].innerHTML = to2Str(iMinute);
		oTimenubm[2].innerHTML = to2Str(iSeconds);		
	}
	timer = setInterval(handleTimer,500);
	handleTimer();
}
//处理闪购
function handleFlashProudct(){
	var oProductList = document.querySelector('.prodoct-list');
	var aSpan = document.querySelectorAll('.biaoqian1,.biaoqian2');
	aSpan[1].onclick = function(){
		oProductList.style.marginLeft = '14px';
	}
	aSpan[0].onclick = function(){
		oProductList.style.marginLeft = '-978px';
	}
}
//处理家电部分
function handleElecOriduct(){
	var aTabItem = document.querySelectorAll('.tab-item');

}