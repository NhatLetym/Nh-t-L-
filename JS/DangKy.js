function send(){
    var list=new Array();
    var khachhang;
    khachhang= JSON.parse(localStorage.getItem('khachhang')) || [];

    var nodedanhxung= document.getElementById('exampleDataList')
    var danhxung=nodedanhxung.value;
    
    var nodehoten= document.getElementById('name')
    var hoten=nodehoten.value;

    var nodesdt= document.getElementById('sdt')
    var sdt=nodesdt.value;

    var nodeemail= document.getElementById('email')
    var email=nodeemail.value;

    var nodeadd= document.getElementById('add')
    var add=nodeadd.value;

    var nodenote= document.getElementById('note')
    var note=nodenote.value;


    if(hoten =="" || sdt =="" || email == "" || add== ""){
        alert("Không được để trống");
        return false;
    }
    else if(isNaN(sdt) || sdt.length!=10){//isNaN = không pải số
        alert("Số điện thoại không đúng!");
        return false;
    }
    else{
        var thongtin={danhxung,hoten,sdt,email,add,note};
        list.push(thongtin);
        console.log(list);
        khachhang.push(thongtin);
        localStorage.setItem('khachhang', JSON.stringify(khachhang));

        //confirm(dichvu)
        return true;
    } 
    
}

