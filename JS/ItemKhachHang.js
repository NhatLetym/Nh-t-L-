
//Phần Tạo-------------------------------------------

//Xây dựng hàm sinh ID tự động, output là chuỗi ID duy nhất
function TaoID(){
    var id = '';

    //lấy ra milisecond ở thời điểm hiện tại
    id = Math.random().toString().substr(2,10)+"_" + String(new Date().getTime());
    return id;
}

function TaoDoiTuongKhachHang(idTour,DanhXung,HoTen, SDT, Email , DiaChi, Note, id){
    var KhachHang = new Object();
    //Bước 1: gắn các thuộc tính cho đối tượng
    KhachHang.idTour = idTour;
    KhachHang.DanhXung = DanhXung;
    KhachHang.HoTen = HoTen;
    KhachHang.SDT = SDT;
    KhachHang.Email = Email;
    KhachHang.DiaChi = DiaChi;
    KhachHang.Note = Note;

    if(id!=null){
        KhachHang.id = id;
    }
     else{
        KhachHang.id = TaoID();
    }
    
    KhachHang.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

    /* từ json chuyển thành một đối tượng đầy đủ các phương thức 
    input: json
    output: đối tượng đầy đủ*/
    KhachHang.fromJSON = function(json){
        var DoiTuongDayDu = new Object();
        //Bước 1: chuyển từ json thành đối tượng 
        var DoiTuong = JSON.parse(json);

        //Bước 2: chuyển đối tượng thành đối tượng đầy đủ phương thức
        var DoiTuongDayDu = TaoDoiTuongKhachHang(DoiTuong.idTour,DoiTuong.DanhXung, DoiTuong.HoTen, DoiTuong.SDT, DoiTuong.Email , DoiTuong.DiaChi, DoiTuong.Note, DoiTuong.id);
        return DoiTuongDayDu;
    }
    /*Từ json của danh sách tour trả về một danh sách sản phẩm có đầy đủ các phương thức 
    Input: json của dan sách tour đầy đủ
    Output: danh sách tour đầy đủ*/
    KhachHang.fromJSONs = function(jsondanhsachkhachhang){
        var danhsachDoiTuongDayDu = new Array();
        var danhsachKhachHang = JSON.parse(jsondanhsachkhachhang);

        for(var i =0; i<danhsachKhachHang.length; i++){
            var khachhang = danhsachKhachHang[i];
            var DoiTuongdaydu = TaoDoiTuongKhachHang(khachhang.idTour,khachhang.DanhXung,khachhang.HoTen, khachhang.SDT, khachhang.Email , khachhang.DiaChi, khachhang.Note, khachhang.id);
            danhsachDoiTuongDayDu[i] = DoiTuongdaydu;
        }

        return danhsachDoiTuongDayDu;
    }

    return KhachHang;
}

function onclickTaoKhachHang(){
    // var list=new Array();
    // var khachhang;
    //khachhang= JSON.parse(localStorage.getItem('khachhang')) || [];
    var nodeidtour = document.getElementById('idTour');
    var idTour = nodeidtour.value;
    console.log('Danh xưng là: '+idTour);

    var nodedanhxung= document.getElementById('exampleDataList');
    var DanhXung = nodedanhxung.value;
    console.log('Danh xưng là: '+DanhXung);
    
    var nodehoten= document.getElementById('name');
    var HoTen=nodehoten.value;
    console.log('Tên khách hàng là: '+HoTen);
    // nodehoten.value='';

    var nodesdt= document.getElementById('sdt');
    var SDT = nodesdt.value;
    console.log('Số điện thoại là: '+SDT);
    // nodesdt.value='';

    var nodeemail= document.getElementById('email');
    var Email=nodeemail.value;
    console.log('Email là: '+Email);
    // nodeemail.value='';

    var nodeadd= document.getElementById('add');
    var DiaChi = nodeadd.value;
    console.log('địa chỉ là: '+DiaChi);
    // nodeadd.value='';

    var nodenote= document.getElementById('note');
    var Note = nodenote.value;
    console.log('ghi chú là: '+ Note);

    if(HoTen =="" || SDT =="" || Email == "" || DiaChi== ""){
        alert("Không được để trống");
        return false;
    }
    else if(isNaN(SDT) || SDT.length!=10){//isNaN = không pải số
        alert("Số điện thoại không đúng!");
        return false;
    }

    else{

        //2.Tạo node đối tượng từ các đối tượng nhập vào
        var nodeKhachHang = TaoDoiTuongKhachHang(idTour,DanhXung, HoTen, SDT, Email, DiaChi, Note, null); 
        console.log(nodeKhachHang);

        //3. đưa sản phẩm vào danh sách
        var jsondanhsachKhachHang = localStorage.getItem('danhsachKhachHang');
        var danhsachKhachHang = JSON.parse(jsondanhsachKhachHang);
        if(danhsachKhachHang == null){
            danhsachKhachHang = new Array();
        }
        console.log(danhsachKhachHang);

        //danhsachTour.push(thongtin);
        //5: Thêm sản phẩm người dùng nhập bào trong danh sách cũ
        danhsachKhachHang.push(nodeKhachHang);

        //6: cập nhật lại danh sách xuống local strorge
        var KhachHang = JSON.stringify(danhsachKhachHang);
        //Lưu trữ danh sách tour vào local storage
        localStorage.setItem('danhsachKhachHang', KhachHang);
        console.log('Thêm khách hàng thành công');
        //return true;
    }
}

function layKhacHangTheoID(idKhacHang){
    var KhachHang = new Object();

    //1. load toàn bộ danh sách sản phẩm dưới local storage lên
    var danhsachKhachHang = LaydanhsachKhachHangduoiLocalStorage();

    //2.Tìm ra đối tượng nào trong danh sách mà có id 
    for(var i=0; i<danhsachKhachHang.length; i++){
        var KhachHangHienTai = danhsachKhachHang[i];
        if(KhachHangHienTai.id == idKhacHang){
            KhachHang = KhachHangHienTai;
        }
    }

    KhachHang = TaoDoiTuongKhachHang(KhachHang.idTour,KhachHang.DanhXung, KhachHang.HoTen, KhachHang.SDT, KhachHang.Email , KhachHang.DiaChi, KhachHang.Note, KhachHang.id);

    return KhachHang;
    
}

function LaydanhsachKhachHangduoiLocalStorage(){
    //1. load json
    var jsondanhsachKhachHang = localStorage.getItem('danhsachKhachHang');
    
    //2.Chuyển json thành đối tượng
    var danhsachKhachHang = JSON.parse(jsondanhsachKhachHang);
    return danhsachKhachHang;
}

/*Mô tả: chuyển một danh sách đối tượng, thành một đoạn HTML để hiển thị được danh sách tour ra màn hình
    Input: Danh sách tour
    Output: HTML hiển thị danh sách sản phẩm*/
function ChuyenDanhSachDoiTuongSanPhamThanhHTML(danhsachKhachHang){
    var HTMLDanhSachKhachHang ='' //'<div class="cart-item">';
    for (var i = 0; i<danhsachKhachHang.length; i++){
        var KhachHang = danhsachKhachHang[i];
        var htmlKhachHang = ChuyenDoiTuongKhachHangThanhHTML(KhachHang);
        HTMLDanhSachKhachHang = HTMLDanhSachKhachHang + htmlKhachHang;
    }
    //HTMLDanhSachKhachHang = HTMLDanhSachKhachHang+ '</div>'
    return HTMLDanhSachKhachHang;
}

function ChuyenDoiTuongKhachHangThanhHTML(KhachHang){
    //tạo lại các đối tượng có đầy đủ các funtion 
    KhachHang = TaoDoiTuongKhachHang(KhachHang.idTour, KhachHang.DanhXung, KhachHang.HoTen, KhachHang.SDT, KhachHang.Email, KhachHang.DiaChi, KhachHang.Note, KhachHang.id);
    console.log(KhachHang);

    var html = '<div class="cart-item"> \n'+
    '      <div class="item-img">		\n'+
    '           <input id="idTour" value="'+KhachHang.idTour+'" readonly>\n'+
    '      </div>\n'+
    '      <div class="cart-product">\n'+
    '            <label class="item-name">'+KhachHang.HoTen+'</label>\n'+
    '           <a class="item-size" href="#">Chi tiết</a>\n'+
    '     </div>\n'+
    '      <div class="cart-price">\n'+
    '       <label class="item-price">'+KhachHang.SDT+'</label>\n'+
    '      </div>\n'+
    '      <div class="cart-quality">\n'+
    '        <label class="item-add">'+KhachHang.DiaChi+'</label>\n'+
    '       </div> \n'+
    '       </div>';
    return html;
}

function HienThiDanhSachKhachHang(){
    //1.lấy danh sách tour dưới localstorage 
    var jsonDanhSachKhachHang = localStorage.getItem('danhsachKhachHang');
    var danhsachKhachHang = JSON.parse(jsonDanhSachKhachHang);
    console.log(danhsachKhachHang);

    //2. chuyển danh sách đối tượng tour sang đoạn HTML
    var HTML = ChuyenDanhSachDoiTuongSanPhamThanhHTML(danhsachKhachHang);

    //3. gắn đoạn HTML đó vào section pro
    var nodeTour = document.getElementById('cart');
    nodeTour.innerHTML = HTML;
}
