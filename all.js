
let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];
////////////

const addTicket_btn = document.querySelector('.addTicket-btn');  //新增套票
const ticketCard_area = document.querySelector('.ticketCard-area');  //搜尋區的ul
const ticketName = document.querySelector('#ticketName');  //套票名稱
const ticketImgUrl = document.querySelector('#ticketImgUrl');  //圖片網址
const ticketRegion = document.querySelector('#ticketRegion');  //景點地區
const ticketPrice = document.querySelector('#ticketPrice');  //套票金額
const ticketNum = document.querySelector('#ticketNum');  //套票組數
const ticketRate = document.querySelector('#ticketRate');  //套票星級
const ticketDescription = document.querySelector('#ticketDescription');  //套票描述
const inputFields = document.querySelectorAll('.form-group input,#ticketRegion,textarea');  //所有輸入欄位與select
const errorMessage = document.querySelectorAll('.alert-message p');  //錯誤提示訊息
const regionSearch = document.querySelector('.regionSearch');  //搜尋區select class
const searchResult_text = document.querySelector('#searchResult-text');  //搜尋結果的文字
const cantFind_area = document.querySelector('.cantFind-area');  //搜尋區 cantFind

// Html字串函式化
function strHtml(item){
	let str2 ='';
	str2+=`
		<li class="ticketCard">
		<div class="ticketCard-img">
		  <a href="#">
			<img src="${item.imgUrl}">
		  </a>
		  <div class="ticketCard-region">${item.area}</div>
		  <div class="ticketCard-rank">${item.rate}</div>
		</div>
		<div class="ticketCard-content">
			<div>
				<h3>
				<a href="#" class="ticketCard-name">${item.name}</a>
				</h3>
				<p class="ticketCard-description">
				${item.description}
				</p>
			</div>
			<div class="ticketCard-info">
				<p class="ticketCard-num">
				<span><i class="fas fa-exclamation-circle"></i></span>
				剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
				</p>
				<p class="ticketCard-price">
				TWD <span id="ticketCard-price">${item.price}</span>
				</p>
			</div>
		</div>
		</li>
		`;
	return str2;
}

function noFound(){
	cantFind_area.setAttribute('style','display:block');
	let str3='';
	str3 += `
	<div class="cantFind-area">
		<h3>查無此關鍵字資料</h3>
		<img src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="">
	</div>
  	`;
	return str3;
}

//初始化環境
function init(){
    let str = '';
    data.forEach(function(item){
        str+=strHtml(item);  
    });
	cantFind_area.setAttribute('style','display:none');
    ticketCard_area.innerHTML = str;
	searchResult_text.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

init();

// 點擊新增套票邏輯
addTicket_btn.addEventListener('click',function(e){
    inputFields.forEach(function(item,index){  //欄位空值的錯誤訊息觸發邏輯
        if(item.value ===""){
		    errorMessage[index].innerHTML=`<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
        }
		else{
			errorMessage[index].innerHTML=``;   //欄位有值的話將"必填"清掉
     	}
    });
    if(  //判斷所有欄位不為空值時，將obj的value，PUSH進data，並初始化欄位為空值
        ticketName.value !=="" &&
        ticketImgUrl.value !=="" &&
        ticketRegion.value !=="" &&
        ticketDescription.value !=="" &&
        ticketNum.value !=="" &&
        ticketPrice.value !=="" &&
        ticketRate.value !==""
    ){
        let obj={
			"id": data.length+1,
			"name": ticketName.value,
			"imgUrl": ticketImgUrl.value,
			"area": ticketRegion.value,
			"description": ticketDescription.value,
			"group": ticketNum.value,
			"price": ticketPrice.value,
			"rate": ticketRate.value
		}
		data.push(obj);
        inputFields.forEach(item => item.value = "");  //使用forEach，箭頭函式讓輸入欄位的value設為空值
		searchResult_text.textContent = `本次搜尋共 ${data.length} 筆資料`;  // 成功新增後將data總筆數值帶入寫入HTML
        init();  // 成功新增後呼叫init() 再初始化一次新增之後，data中的資料
    }
});



//篩選套票邏輯
regionSearch.addEventListener('change',e=>{
	let str='';
	let filterNum = 0;  //設定搜尋的資料筆數
	
	//點擊的選項與資料庫一筆一筆做比對，並且呼叫strHtml存入、匹配筆數+1，最後將資料寫入HTML
    data.forEach(function(item,index){
        if(e.target.value === item.area || e.target.value === "全部地區"){
			str+=strHtml(item);
			filterNum++;
        }
    });

	cantFind_area.setAttribute('style','display:none');   //無資料顯示的畫面重設為none
	ticketCard_area.innerHTML = str;   //將字串寫入HTML
	searchResult_text.textContent = `本次搜尋共 ${filterNum} 筆資料`  // 將匹配資料的加總筆數值寫入HTML
	if(filterNum === 0){
		str = noFound();  //如果篩選筆數為0筆，str字串改為noFound()的字串，函式會將無資料畫面顯示
	}
});

