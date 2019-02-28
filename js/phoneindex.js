handleCart();
handleNav();
handlebigphone();
handleCate();
handleCarousel();
handleSouSuo();
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
		animate(oCartContent,{height:90},true,function(){
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
//处理导航栏
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
//处理大手机
function handlebigphone(){
	var oAll = document.querySelector('.all')
	var aContentLeft = document.querySelector('.content1-left')
	var timer =0;
		oAll.onmouseover = function(){
			aContentLeft.style.display = 'block';
		}
		aContentLeft.onmouseover=function(){
			clearTimeout(timer);
			 aContentLeft.style.display='block';
		};
		oAll.onmouseout=function(){
			// oCateContent.style.display='block';
			timer =setTimeout(function(){
			 aContentLeft.style.display='none';
			},10)
		}
		aContentLeft.onmouseout=function(){
			clearTimeout(timer);
			 aContentLeft.style.display='none';
		};

}
//处理分类
function handleCate(){
	var aCateItem = document.querySelectorAll('.cate-item');
	var oCateContent = document.querySelector('.cate-content');
	var oCateBox = document.querySelector('.content1-left');
	var hideTimer = 0;
	oCateContent.onmouseenter = function(){
		oCateContent.style.display = 'block'
		oCateBox.style.display ='block'
	}
	oCateContent.onmouseleave = function(){
		oCateContent.style.display = 'none'
		oCateBox.style.display ='none'
	}
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
	hideTimer = setTimeout(function(){
		oCateBox.onmouseleave = function(){
			oCateContent.style.display = 'none';
		for(var j = 0;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item'
		}		
	}
	},500)		


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
//处理首页轮播图
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:['C:/Users/liyuphp/xiaomi/新建文件夹(2)/545a5b5f0cb6cff72c8abc13968a0adf(1).jpg','C:/Users/liyuphp/xiaomi/新建文件夹(2)/e56e83596263a461406da48e8786fc31(1).jpg'],
		width:1576,
		height:640,
		playDuration:1000
	});	
}
//处理搜索框
function handleSouSuo(){
	var oSbox = document.querySelector('.head2-bottom');
	var oIput = document.querySelector('.i1')

	oIput.onclick = function(ev){
		oSbox.style.display = 'block'
		ev.stopPropagation();
	}
	document.onclick = function(ev){
		oSbox.style.display = 'none'
		ev.stopPropagation();
	}
	oSbox.onclick = function(ev){
		oSbox.style.display = 'block'
		ev.stopPropagation();
	}
}