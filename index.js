
handleCart();
handleNav();

//处理购物车
function handleCart(){	



	
	//1.获取元素
	var oCart = document.querySelector('.head1-right');
	var oCartLink = document.querySelector('.head1-right-box a');
	var oCartContent = document.getElementById('box1');
	var oLoder = document.querySelector('.loader');
	var oEmptyCart = document.getElementById('s1');

	oCart.onmouseenter = function(){
		//1.改变购物车图标的背景色和字体颜色
		oCartLink.style.background = '#fff';
		oCartLink.style.color = '#ff6700';
		//2.加载loading图标
		oLoder.style.display = 'block'
		//3.显示购物车内容,假设购物车
		animate(oCartContent,{height:120},true,function(){
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
	//2.批量监听导航列表事件
	for(var i = 0;i<aNavItem.length;i++){
		//2.1鼠标移入事件
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			animate(oNavContent,{height:180},true,function(){
				oNavContent.style.overflow = 'visible'
			});
			loadData(this.index);
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
		for(var i = 0;i<data.length-2;i++){
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