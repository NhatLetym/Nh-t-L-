var index=1;
changeImage = function(){
    var img = ["../voucher1.jpg","../voucher2.jpg","../voucher3.png"];
    document.getElementById('imgs').src=img[index];
    index++;
    if(index==3){
        index=0;
    }
}
setInterval(changeImage,2000);