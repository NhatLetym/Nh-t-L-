
function onclickTaoSanPham(){
    
    // 1. Truy cập các node để lấy ra dữ liệu 
    var nodeHinhAnh = document.getElementById('HinhAnh');
    var hinhanh = nodeHinhAnh.value;
    console.log('Hình ảnh tour là: '+hinhanh)
    nodeHinhAnh.value='';

    var nodeTen = document.getElementById('Ten');
    var ten = nodeTen.value;
    console.log('Tên tour là: '+ten);
    nodeTen.value='';

    var nodeGiaGoc = document.getElementById('GiaGoc');
    var giagoc = parseInt(nodeGiaGoc.value);
    console.log('Giá gốc là: '+giagoc);
    nodeGiaGoc.value='';

    var nodePhanTramGiamGia = document.getElementById('PhanTramGiamGia');
    var phantramgiamgia = parseFloat(nodePhanTramGiamGia.value);
    console.log('Phần trăm giảm giá là: '+phantramgiamgia);
    nodePhanTramGiamGia.value='';

    var nodeKhoiHanh = document.getElementById('KhoiHanh')
    var khoihanh = nodeKhoiHanh.value;
    console.log('Khởi hành tour là: '+khoihanh);
    nodeKhoiHanh.value='';
    
    var nodeThoiGian = document.getElementById('ThoiGian');
    var thoigian = nodeThoiGian.value;
    console.log('Thời gian là: '+thoigian);
    nodeThoiGian.value='';

    //2.Tạo node đối tượng từ các đối tượng nhập vào
    var nodeTour = TaoDoiTuongSanPham(hinhanh, ten, giagoc, phantramgiamgia, khoihanh, thoigian, null); 
    console.log(nodeTour);
    //console.log('Hình ảnh tour là: '+Tour.hinhanh +' Tên tour là: '+Tour.ten+' Giá gốc là: '+Tour.giagoc+'Phần trăm giảm giá'+Tour.phantramgiamgia+'Khởi hành từ: '+Tour.khoihanh+' Thời gian '+Tour.thoigian);

    //3. đưa sản phẩm vào danh sách
    var jsondanhsachtour = localStorage.getItem('danhsachTour');
    var danhsachTour = JSON.parse(jsondanhsachtour);
    if(danhsachTour == null){
        danhsachTour = new Array();
    }
    console.log(danhsachTour);

    //danhsachTour.push(thongtin);
    //5: Thêm sản phẩm người dùng nhập bào trong danh sách cũ
    danhsachTour.push(nodeTour);

    //6: cập nhật lại danh sách xuống local strorge
    var dulich = JSON.stringify(danhsachTour);
    //Lưu trữ danh sách tour vào local storage
    localStorage.setItem('danhsachTour', dulich);
    alert('Thêm tour thành công');
    
}


function layTourTheoID(idTour){
    var Tour = new Object();

    //1. load toàn bộ danh sách sản phẩm dưới local storage lên
    var danhsachTour = LaydanhsachTourduoiLocalStorage();

    //2.Tìm ra đối tượng nào trong danh sách mà có id 
    for(var i=0; i<danhsachTour.length; i++){
        var tourHienTai = danhsachTour[i];
        if(tourHienTai.id == idTour){
            Tour = tourHienTai;
        }
    }

    Tour = TaoDoiTuongSanPham(Tour.HinhAnh, Tour.Ten, Tour.GiaGoc, Tour.PhanTramGiamGia, Tour.KhoiHanh, Tour.ThoiGian, Tour.id);

    return Tour;
    
}

function LaydanhsachTourduoiLocalStorage(){
    //1. load json
    var jsondanhsachTour = localStorage.getItem('danhsachTour');
    
    //2.Chuyển json thành đối tượng
    var danhSachTour = JSON.parse(jsondanhsachTour);
    return danhSachTour;
}


