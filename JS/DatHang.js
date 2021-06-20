
function positons(){
    document.getElementById("positon").style.display = "block";
    document.getElementById("photo-info").style.display = "none";
    document.getElementById("lich-trinh-1").style.background = "red";
    document.getElementById("lich-trinh-2").style.background = "white";
    //document.getElementById("positon").style.height = "800px"
}

function photoinfos(){
    document.getElementById("positon").style.display = "none";
    document.getElementById("photo-info").style.display = "block";
    document.getElementById("lich-trinh-2").style.background = "red";
    document.getElementById("lich-trinh-1").style.background = "white";
    //document.getElementById("photo-info").style.height = "1200px"
}

function TaoDoiTuongItemDatHang(idTour){
    var ItemDatHang = new Object();
    ItemDatHang.idTour = idTour;
    return ItemDatHang;
}

function onClickDuaVaoHeQuanTri(idTour){
    alert('id tour '+idTour);
    //3. lấy thông tin có trong local lên
    var danhsachItem = layDanhSachItemtuLocalStorage();

    //4.nếu tour tồn tại trong đặt hàng thì tăng số lượng lên
    var coTonTaitrongDanhSachItemDatHang = false
    for (var i=0; i<danhsachItem.length; i++){
        var itemDatHangHienTai  = danhsachItem[i];
        if(itemDatHangHienTai.idTour == idTour){
            coTonTaitrongDanhSachItemDatHang = true;
        }
    }

    //nếu không tồn tại => tạo ra đối tượng và thêm vào danh sách đặt hàng 
    if(coTonTaitrongDanhSachItemDatHang == false){
        var itemDatHang = TaoDoiTuongItemDatHang(idTour, 1);
        danhsachItem.push(itemDatHang);
    }

    //5. nếu sản phẩm chưa tồn tại trong đặt thì thêm mới một item vào đặt hàng
    luuDanhSachItemGioHangvaoLocalStorage(danhsachItem);
}
