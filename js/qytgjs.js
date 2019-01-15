handleCart();
//处理购物车
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.head1-right');
	var oCartLink = document.querySelector('.head1-right-box a');
	var oCartContent = document.getElementById('box11');
	var oLoder = document.querySelector('.loader');
	var oEmptyCart = document.getElementById('s1');
	console.log(oCart)

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