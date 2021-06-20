function ChuyenDoiTuongItemGioHangThanhHTML(itemDatHang){
    var Tour = layTourTheoID(itemDatHang.idTour);
    console.log(Tour);

    var html= '<div class="subject">\n'+
    '            <b class="word">\n'+
    '              ĐƠN ĐẶT TOUR<br/>\n'+
    '              <bdo><hr size="2" color ="red" style="width:50px; float:left; " /></bdo>\n'+
    '            </b>\n'+
    '          </div>\n'+
    '          \n'+
    '          <div class="img" id="imgs">\n'+
    '            <img src="../'+Tour.HinhAnh+'" class="anh-sapa">\n'+
    '          </div>\n'+
    '          <div class="name-sub">\n'+
    '            <b class="word" id="word-tour">\n'+
    '              '+Tour.Ten+' ('+Tour.ThoiGian+')\n'+
    '            </b>\n'+
'                <input id="idTour" value="'+Tour.id+'" readonly>\n'+
    '          </div>';
    return html;

}

//Mô tả chuyển một danh sách thành html
//Input: danh sách Item đặt hàng
//Output: html hiển thị danh sách item đặt hàng

function ChuyenDanhSachItemGioHangsangHTML (danhsachItem){
    var htmlTong = '';
    for(var i=0; i<danhsachItem.length; i++){
        htmlTong = ChuyenDoiTuongItemGioHangThanhHTML(danhsachItem[i]);

    }
    return htmlTong;
}

function HienThiDanhSachItemGioHang(){
    //1. Lấy danh sách item đặt hàng dưới local storage lên
    var danhsachItem = layDanhSachItemtuLocalStorage();
    console.log(danhsachItem);

    //2. chuyển danh sách item đặt hàng thành html
    var HTML = ChuyenDanhSachItemGioHangsangHTML(danhsachItem);
    console.log(HTML);

    //3. truy cập node đặt hàng để hiển thị html danh sách đặt hàng
    var nodeHQT = document.getElementById('product');
    nodeHQT.innerHTML = HTML;
    
}
