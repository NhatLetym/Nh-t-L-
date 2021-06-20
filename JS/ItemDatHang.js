function TaoDoiTuongItem(idTour, soluong){
    var ItemDatHang = new Object();
    ItemDatHang.idTour = idTour;
    ItemDatHang.soluong = soluong;
    return ItemDatHang;
}

function onClickDuaVaoDatHang(idTour){
    //alert('id tour '+idTour);
    //Bước 1: Phân tích lưu trữ sản phẩm trong local strorage
    //đặt hàng gồm đối tượng là item đặt hàng, Item gồm các thông tin
    //1. sử dụng id tour để lưu và số lượng bn?


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
        var itemDatHang = TaoDoiTuongItem(idTour, 1);
        danhsachItem.push(itemDatHang);
    }

    //5. nếu sản phẩm chưa tồn tại trong đặt thì thêm mới một item vào đặt hàng
    luuDanhSachItemDatHangvaoLocalStorage(danhsachItem);
}

//Yêu cầu: lấy ra toàn bộ các item đặt hàng được lưu trữ trong local strorage
//input:
//output: danh sách toàn bộ item đặt hàng lưu trữ trong local strorage

function layDanhSachItemtuLocalStorage(){
    var danhsachItem = new Array();

    //1. lấy chuỗi json lưu trữ trong local strorage
    var jsondanhsachItem = localStorage.getItem('danhsachItemDatHang');

    //2. chuyển từ json qua danh sách item đặt hàng
    if(jsondanhsachItem != null){
        danhsachItem =JSON.parse(jsondanhsachItem);
    }
    return danhsachItem;
}


//lưu trữ danh sách Item đặt hàng
//Input: danh sách Item đặt hàng
//output: không có

function luuDanhSachItemDatHangvaoLocalStorage(danhsachItem){
    //1. chuyển thành chuỗi json
    var jsondanhsachItem = JSON.stringify(danhsachItem);

    //2. lưu vào local storage
    localStorage.setItem('danhsachItemDatHang', jsondanhsachItem);
}

function ChuyenDoiTuongItemDatHangThanhHTML(itemDatHang){
    var Tour = layTourTheoID(itemDatHang.idTour);
    console.log(Tour);

    var html= '<div class ="col-9 col-m-8 col-s-12 image">\n'+
    '            <div class="ct">\n'+
    '              <div class="gioi-thieu">\n'+
    '                <div class="a">\n'+
    '                  <h2 class="title">'+Tour.Ten+'('+Tour.ThoiGian+')</h2>\n'+
    '                  <img src="../'+Tour.HinhAnh+'" class="anh"/>\n'+
    '                </div> \n'+
    '              \n'+
    '              </div>\n'+
    '            </div>\n'+
    '          </div> \n'+
    '          <div class ="col-3 col-m-4 col-s-12 image">\n'+
    '            <div class="ct_bang">\n'+
    '              <div class="lt-row">\n'+
    '                <div class="ct-row">\n'+
    '                  <div class="row-1">Mã tour:</div>\n'+
    '                  <div class="row-2" id="row-id">'+Tour.id+'</div>\n'+
    '                </div>\n'+
    '                <div class="ct-row">\n'+
    '                  <div class="row-1">Khởi hành:</div>\n'+
    '                  <div class="row-2">'+Tour.KhoiHanh+'</div>\n'+
    '                </div>\n'+
    '                <div class="ct-row">\n'+
    '                  <div class="row-1">Điểm đến:</div>\n'+
    '                  <div class="row-2">SaPa</div>\n'+
    '                </div>\n'+
    '                <div class="ct-row">\n'+
    '                  <div class="row-1">Thời gian:</div>\n'+
    '                  <div class="row-2">'+Tour.ThoiGian+'</div>\n'+
    '                </div>\n'+
    '                <div class="ct-row">\n'+
    '                  <div class="row-1">Ngày đi:</div>\n'+
    '                  <div class="row-2">Hằng Ngày</div>\n'+
    '                </div>\n'+
    '                <div class="ct-row">\n'+
    '                  <div class="row-1">Phương tiện:</div>\n'+
    '                  <div class="row-2">ID3180</div>\n'+
    '                </div>\n'+
    '              </div>\n'+
    '              <div class="dat-tour">\n'+
    '                <div class="tour-text"><span>Giá người lớn</span></div>\n'+
    '                <div class="tour-gia">\n'+
    '                  <div class="gia-1"><span style="float:right">'+Tour.TinhGiaBan()+'đ</span></div>\n'+
    '                  <div class="gia-2"><strike style="float:right">'+Tour.GiaGoc+'đ</strike></div>\n'+
    '                </div>\n'+
    '                <div class="but">\n'+
    '                  <a href="Giohang.html">\n'+
    '                    <input type="button" onclick="onClickDuaVaoDatHang(\''+ Tour.id +'\')"  class="button-dm" value="ĐẶT TOUR">\n'+
    '                  </a>\n'+
    '                </div>\n'+
    '              </div>\n'+
    '            </div>\n'+
    '          </div>';
    return html;

}

//Mô tả chuyển một danh sách thành html
//Input: danh sách Item đặt hàng
//Output: html hiển thị danh sách item đặt hàng

function ChuyenDanhSachItemDatHangsangHTML (danhsachItem){
    var htmlTong = '';
    for(var i=0; i<danhsachItem.length; i++){
        htmlTong = ChuyenDoiTuongItemDatHangThanhHTML(danhsachItem[i]);

    }
    return htmlTong;
}

function HienThiDanhSachItemDatHang(){
    //1. Lấy danh sách item đặt hàng dưới local storage lên
    var danhsachItem = layDanhSachItemtuLocalStorage();
    console.log(danhsachItem);

    //2. chuyển danh sách item đặt hàng thành html
    var HTML = ChuyenDanhSachItemDatHangsangHTML(danhsachItem);
    console.log(HTML);

    //3. truy cập node đặt hàng để hiển thị html danh sách đặt hàng
    var nodeHQT = document.getElementById('item');
    nodeHQT.innerHTML = HTML;
}



//HienThiDanhSachGioHang();
