
handleCart();
handleNav();
handleCarousel();

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
		id:'',
		aImg:['images/ad1.jpg','images/ad2.jpg','images/ad3.jpg'],
		width:830,
		height:440,
		playDuration:1000
	});	
}