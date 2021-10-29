document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    window.location.href = "laporan_list.html";
}

$(document).ready(function () {
    $('body').fadeIn("slow");

    get_list();

    $('#refresh').click(function () {
        get_list();

    });

    function get_list() {
        server_api = localStorage.getItem('glob_server');
        device_id = localStorage.getItem('device_id');
        id_korban = getParameterByName('id');

        $('#loading_spinner').show();
        $.ajax({
            url: server_api + '/laporan/detail/',
            type: 'get',
            crossDomain: true,
            data: {
                'device_id': device_id,
                'id_korban': id_korban
            }, success: function (result) {

//                $('#laporan_list').html('');

                if (result.status) {
                    row = result.data;
                    $('#tanggal').html(from_date2date(row.created_at));
                    $('#nama_pelapor').html(row.nama_pelapor);
                    $('#umur_pelapor').html(row.umur_pelapor);
                    $('#nohp_pelapor').html(row.nohp_pelapor);
                    $('#jkel_pelapor').html(row.jkel_pelapor);
                    $('#alamat_pelapor').html(row.alamat_pelapor);
                    $('#nama_korban').html(row.nama_korban);
                    $('#umur_korban').html(row.umur_korban);
                    $('#nohp_korban').html(row.nohp_korban);
                    $('#jkel_korban').html(row.jkel_korban);
                    $('#alamat_korban').html(row.alamat_korban);
                    $('#jenis_aduan').html(row.aduan_lain);

                    $('#jenis_aduan').append('<br>');
                    for (var i = 0; i < row.jenis_aduan.length; i++) {
                        $('#jenis_aduan').append(row.jenis_aduan[i].keterangan + ',<br>');
                    }
                    
                    $('#status_laporan').html(get_status_laporan(row.status_laporan));

                }

                $('#loading_spinner').hide();

            }, error: function (err) {
                alert('Periksa Koneksi ' + JSON.stringify(err));
                $('#loading_spinner').hide();

            }
        });
    }

    function from_date2date(date_str) {
        const d = new Date(date_str);
        var html = '';
        html = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

        return  html;
    }

    function get_status_laporan(status_laporan) {
//        var status_laporan=status_laporan
        var html = '';
        if (status_laporan == 1) {
            html = '<span class="badge badge-primary">Sudah Ditangani</span>';
        } else if (status_laporan == 2) {
            html = '<span class="badge badge-warning">Dalam Prosess</span>';
        } else {
            html = '<span class="badge badge-danger">Belum Ditangani</span>';
        }
        return html;
    }
});