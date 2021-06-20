//Yêu cầu: Tạo ra đối tượng item đặt
//input: idtour, soluong
//output: đối tượng item đặt hàng
//var keyLocalStrorageItemDatHang = 'danhsachItem';

function TaoDoiTuongItemHQT(idTour, soluong){
    var ItemDatHang = new Object();
    ItemDatHang.idTour = idTour;
    ItemDatHang.soluong = soluong;
    //ItemDatHang.idKhacHang = idKhacHang;
    return ItemDatHang;
}


function onClickDuaVaoHeQuanTri(idTour){
    //2. xây dựng hàm tạo nhanh đối tượng item giỏ hàng

    //3. lấy thông tin có trong local lên
    var danhsachItem = layDanhSachItemtuLocalStorage();

    //4.nếu tour tồn tại trong đặt hàng thì tăng số lượng lên
    var coTonTaitrongDanhSachItemDatHang = false
    for (var i=0; i<danhsachItem.length; i++){
        var itemDatHangHienTai  = danhsachItem[i];
        if(itemDatHangHienTai.idTour == idTour){
            danhsachItem[i].soluong++;
            coTonTaitrongDanhSachItemDatHang = true;
        }
    }

    //nếu không tồn tại => tạo ra đối tượng và thêm vào danh sách đặt hàng 
    if(coTonTaitrongDanhSachItemDatHang == false){
        var itemDatHang = TaoDoiTuongItemHQT(idTour, 1);
        danhsachItem.push(itemDatHang);
    }

    //5. nếu sản phẩm chưa tồn tại trong đặt thì thêm mới một item vào đặt hàng
    luuDanhSachItemHQTvaoLocalStorage(danhsachItem);
}

//Yêu cầu: lấy ra toàn bộ các item đặt hàng được lưu trữ trong local strorage
//input:
//output: danh sách toàn bộ item đặt hàng lưu trữ trong local strorage

function layDanhSachItemtuLocalStorage(){
    var danhsachItem = new Array();

    //1. lấy chuỗi json lưu trữ trong local strorage
    var jsondanhsachItem = localStorage.getItem('danhsachItem');

    //2. chuyển từ json qua danh sách item đặt hàng
    if(jsondanhsachItem != null){
        danhsachItem =JSON.parse(jsondanhsachItem);
    }
    return danhsachItem;
}



//Yêu cầu: Thêm tour vào HQT
// input: idtour, HQT
// output: HQT sau khi thêm tour

// function ThemTourVaoHQT(idTour, HQT){
//     var HQTkhiThem = HQT;

//     //1. Tạo ra đối tượng Item
//     var itemHQT = TaoDoiTuongItemHQT(idTour);

//     //2. Thêm vào giỏ hàng item mới
//     console.log(HQT);
//     HQTkhiThem.push(itemHQT);
//     return HQTkhiThem;
// }

//lưu trữ danh sách Item đặt hàng
//Input: danh sách Item đặt hàng
//output: không có

function luuDanhSachItemHQTvaoLocalStorage(danhsachItem){
    //1. chuyển thành chuỗi json
    var jsondanhsachItem = JSON.stringify(danhsachItem);

    //2. lưu vào local storage
    localStorage.setItem('danhsachItem', jsondanhsachItem);
}

function ChuyenDoiTuongItemHeQuanTriThanhHTML(itemDatHang){
    var Tour = layTourTheoID(itemDatHang.idTour);
    console.log(Tour);

    // var KhachHang = layKhacHangTheoID(itemDatHang.idKhacHang);
    // console.log(KhachHang);

    var html= '<div class="cart-item">			\n'+
                ' <div class="item-img">		\n'+
                    ' <img class="img" src="../'+Tour.HinhAnh+'" />\n'+
                ' </div>\n'+
                ' <div class="cart-product">\n'+
                    '<label class="item-name" >'+Tour.Ten+'</label>\n'+
                    ' <a class="item-size" href="#">Chi tiết</a>\n'+
                    '\n'+
                ' </div>\n'+
                '<div class="cart-price">\n'+
                    '<label class="item-price">'+Tour.TinhGiaBan()+'</label>\n'+
                    '<label class="item-old-price"><s>'+Tour.GiaGoc+'</s></label>\n'+
                    '<label class="item-discount">-10%</label>\n'+
                '</div>\n'+
                '<div class="cart-quality">\n'+
                    '<input id="txt2" class="txt-quality" type="text" value="1" />\n'+
                '</div>				\n'+
            '</div>\n';
    return html;

}

//Mô tả chuyển một danh sách thành html
//Input: danh sách Item đặt hàng
//Output: html hiển thị danh sách item đặt hàng

function ChuyenDanhSachItemHQTsangHTML (danhsachItem){
    var htmlTong = '';
    for(var i=0; i<danhsachItem.length; i++){
        htmlTong = htmlTong + ChuyenDoiTuongItemHeQuanTriThanhHTML(danhsachItem[i]);

    }
    return htmlTong;
}

function HienThiDanhSachItem(){
    //1. Lấy danh sách item đặt hàng dưới local storage lên
    var danhsachItem = layDanhSachItemtuLocalStorage();
    console.log(danhsachItem);

    //2. chuyển danh sách item đặt hàng thành html
    var HTML = ChuyenDanhSachItemHQTsangHTML(danhsachItem);
    console.log(HTML);

    //3. truy cập node đặt hàng để hiển thị html danh sách đặt hàng
    var nodeHQT = document.getElementById('content-left');
    nodeHQT.innerHTML = HTML;
}



//HienThiDanhSachGioHang();

