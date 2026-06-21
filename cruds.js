  //مميزات البرنامج
//اضافة منتج 
//اضافة المنتج المراد مع التكرار الذي يريده اليوزر
//بامكان اليوزر قراءة المنتجات 
//وبامكانه حذف اي منتج مع ظهور رسالة نجاح تاكد العملية 
//حذف كل المنتجات بضغطة مع طباعة رسالة انه تم الحذف بنجاح
//يستطيع تعديل اي منتج يريده مع طباعة رسالة نجاح عند انتهاء التعديل
//ب امكانه البحث عن المنتج اما عن طريق الاسم او التصنيف category
//حفظ المنتجات بشكل دائم في local storage
//قادر على حساب ضريبة المنتج و مصاريف الاعلانات و ايجاد السعر النهائي
// لن يتم اضافة البيانات الا اذا كانت صحيحة
//بداية الكود نستدهي المتغيرات ثم ننشأ دوال متخصصة بكل عملية 
  let price=document.getElementById('price');
    let taxes=document.getElementById('taxes');
    let ads=document.getElementById('ads');
    let discount=document.getElementById('discount');
    let total=document.getElementById('total');
    let count=document.getElementById('count');
    let category=document.getElementById('category')
    let submit=document.getElementById('submit')
    let title=document.getElementById('title')
    let mode='create'
    let tmp;
    function getTotal(){
    if(price.value!=''){
    
        let result=(+price.value + +taxes.value+ +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }
    }
    let datapro;
    if(localStorage.product!=null){
        datapro=JSON.parse(localStorage.product)
    }else{
        datapro=[];
    }
    submit.onclick=function(){
        let newpro={ 
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
           total:total.innerHTML,
           count:count.value,
           category:category.value.toLowerCase(),
        }
        if(title.value!=''&&price.value!=''&&category.value!=''){
  if(mode==='create'){
              if( newpro.count>1){
        for(let i=0;i<newpro.count;i++){
            datapro.push(newpro)
        }
     }
        else{
            datapro.push(newpro)

        } showToast('Product added successfully', 'success');
        }else{
                datapro[tmp]=newpro;
                mode='create';
                submit.innerHTML='create';
                count.style.display='block'
                clearData();
                showToast('Product updated successfully', 'success');
        }
     //  local storage حفظ ال
        localStorage.setItem('product',JSON.stringify(datapro)) 
        
        showData();
        }
      
        else {
         showToast('Please fill title, price and category', 'error')}
        
      }  
      
    
    function clearData(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
    }function showData()
    {
        getTotal()
        let table ='';
        for(let i=0;i<datapro.length;i++)
        {    table+=
        `
             <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})"id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> 
        `
        }
    
        
        document.getElementById('table').innerHTML=table;
          let btnDelete=document.getElementById('deleteALL')
        if(datapro.length>0){
          
            btnDelete.innerHTML=`
           <button onclick="deleteALL()">deleteALL(${datapro.length})</button>
            `
        }else{
            btnDelete.innerHTML='';
        }
    }                                //مشان ضل متذكر         
    showData();//استدعيناها هون لحتى تضل شغالة البيانات وما تنحذف حتىى ولو عملت ريلود
    function deleteData(i){
        datapro.splice(i,1);
        showToast('Product deleted', 'success');
        localStorage.product=JSON.stringify(datapro)
        showData();
    }
    function deleteALL(){
        localStorage.clear();
        datapro.splice(0);
showToast('All products deleted', 'success');
        showData();
    }
    function updateData(i){
        title.value=datapro[i].title;
        price.value=datapro[i].price;
        taxes.value=datapro[i].taxes;
        ads.value=datapro[i].ads;
        discount.value=datapro[i].discount;
          getTotal();
          count.style.display='none';
        category.value=datapro[i].category;
      
        
        submit.innerHTML='update';
        mode='update'
        tmp=i;
        scroll({
            top:0,
            behavior:'smooth'
        })
    }

  let searchmood='title';
  function getsearchmood(id)
  {
    let search=document.getElementById('search')
    if(id=='searchtitle'){
        searchmood='title';
        search.placeholder='Search By Title'
    }else{
        searchmood='category';
         search.placeholder='Search By Category'
    }
     search.focus()
     search.value='';
     showData();
  }
  function searchData(value){
    let table='';
  if(searchmood=='title'){
    for(let i=0;i<datapro.length;i++){
        if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
             table+=
            `
             <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})"id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> 
        `
        }
    }



  } 
  
  
  
  
  else{
    for(let i=0;i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
             table+=
            `
             <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})"id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> 
        `
        }
    }
  }document.getElementById('table').innerHTML=table;
  }
  let bttn=document.getElementById('bttn')
  window.onscroll=function(){
    if(window.scrollY>=200){
        bttn.style.display='block'
    }else{
         bttn.style.display='none'
    }
  }
bttn.onclick=function(){
window.scrollTo({left:0,
        top:0,
        behavior:"smooth"
    })
}
 
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '☀️ Light';
} else {
    document.body.classList.remove('light-theme');
    themeToggle.innerHTML = '🌙 Dark';
}

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '🌙 Dark';
    } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '☀️ Light';
    }
});
   
function showToast(message, type = 'success') {
    const toast = document.getElementById('toastMessage');
    const toastText = document.getElementById('toastText');
    toast.classList.remove('success', 'error', 'show')
    toastText.textContent = message;
    toast.classList.add(type);
    toast.classList.remove('hidden');
     
    void toast.offsetWidth; 
    toast.classList.add('show');   
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);  
    }, 2000);
}
