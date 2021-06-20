//Phần Tạo-------------------------------------------

//Xây dựng hàm sinh ID tự động, output là chuỗi ID duy nhất
function TaoID(){
    var id = '';

    //lấy ra milisecond ở thời điểm hiện tại
    id = Math.random().toString().substr(2,10)+"_" + String(new Date().getTime());
    return id;
}

function TaoDoiTuongSanPham(HinhAnh, Ten, GiaGoc, PhanTramGiamGia, KhoiHanh, ThoiGian, id){
    var Tour = new Object();
    //Bước 1: gắn các thuộc tính cho đối tượng
    Tour.HinhAnh = HinhAnh;
    Tour.Ten = Ten;
    Tour.GiaGoc = GiaGoc;
    Tour.PhanTramGiamGia = PhanTramGiamGia;
    Tour.KhoiHanh = KhoiHanh;
    Tour.ThoiGian = ThoiGian;

    if(id!=null){
        Tour.id = id;
    }
     else{
        Tour.id = TaoID();
    }
    
    //Bước 2: viết phương thức cho đối tượng
    Tour.TinhGiaBan = function(){
        //logic xử lý các phương thức 
        var GiaBan = this.GiaGoc * (1-this.PhanTramGiamGia);
        return GiaBan;
    }
    
    Tour.toJson = function(){
        var json = JSON.stringify(this);
        return json;
    }

    /* từ json chuyển thành một đối tượng đầy đủ các phương thức 
    input: json
    output: đối tượng đầy đủ*/
    Tour.fromJSON = function(json){
        var DoiTuongDayDu = new Object();
        //Bước 1: chuyển từ json thành đối tượng 
        var DoiTuong = JSON.parse(json);

        //Bước 2: chuyển đối tượng thành đối tượng đầy đủ phương thức
        var DoiTuongDayDu = TaoDoiTuongSanPham(DoiTuong.HinhAnh, DoiTuong.Ten, DoiTuong.GiaGoc, DoiTuong.PhanTramGiamGia, DoiTuong.KhoiHanh, DoiTuong.ThoiGian,DoiTuong.id);
        return DoiTuongDayDu;
    }
    /*Từ json của danh sách tour trả về một danh sách sản phẩm có đầy đủ các phương thức 
    Input: json của dan sách tour đầy đủ
    Output: danh sách tour đầy đủ*/
    Tour.fromJSONs = function(jsondanhsachtour){
        var danhsachTourDayDu = new Array();
        var danhsachTour = JSON.parse(jsondanhsachtour);

        for(var i =0; i<danhsachTour.length; i++){
            var tour = danhsachTour[i];
            var tourdaydu = TaoDoiTuongSanPham(tour.HinhAnh, tour.Ten, tour.GiaGoc, tour.PhanTramGiamGia, tour.KhoiHanh, tour.ThoiGian,tour.id);
            danhsachTourDayDu[i] = tourdaydu;
        }

        return danhsachTourDayDu;
    }

    return Tour;
}

/*Mô tả: chuyển một danh sách đối tượng, thành một đoạn HTML để hiển thị được danh sách tour ra màn hình
    Input: Danh sách tour
    Output: HTML hiển thị danh sách sản phẩm*/
function ChuyenDanhSachDoiTuongSanPhamThanhHTML(danhsachtour){
    var HTMLDanhSachTour = `<div class="content">`;
    for (var i = 0; i<danhsachtour.length; i++){
        var Tour = danhsachtour[i];
        var htmltour = ChuyenDoiTuongSanPhamThanhHTML(Tour);
        HTMLDanhSachTour = HTMLDanhSachTour + htmltour;
    }
    HTMLDanhSachTour = HTMLDanhSachTour+ `</div>`
    return HTMLDanhSachTour;
}

function ChuyenDoiTuongSanPhamThanhHTML(Tour){
    //tạo lại các đối tượng có đầy đủ các funtion 
    Tour = TaoDoiTuongSanPham(Tour.HinhAnh, Tour.Ten, Tour.GiaGoc, Tour.PhanTramGiamGia, Tour.KhoiHanh, Tour.ThoiGian, Tour.id);
    console.log(Tour);

    var html =``;
     html+= `<div class ="col-3 col-m-6 col-s-12 image">`
     html+=    `<div class="product">`
     html+=    `<img onclick="onClickDuaVaoDatHang(\'`+ Tour.id +`\')" class="list-img" src='../`+Tour.HinhAnh+`'/>`
     html+=    `<a href="DatHangMoi.html" onclick="onClickDuaVaoDatHang(\'`+ Tour.id +`\')">`+Tour.Ten+``
     html+=        `<img class='icon-hot' src="../icon-hot.gif">`
     html+=   ` </a>`
        
     html+=    `<label class="price">`+ Tour.TinhGiaBan() +`đ</label>`
     html+=   ` <strike>`+Tour.GiaGoc+`đ</strike><br/><br/>`
     html+=    `<label class="mess" ><b>Khởi hành:</b>`+Tour.KhoiHanh+`</label><br/>`
     html+=    `<label class="mess"><b>Thời gian:</b>`+Tour.ThoiGian+`</label><br/>`
     html+=    `<label class="mess" ><b>Ngày đi:</b>  Hàng Ngày</label><br/>`
        
     html+=    `</div>`
     html+=    `</div>`
    return html;
}
