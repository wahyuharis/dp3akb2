document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    window.location.href = "index.html";
}

$(document).ready(function () {
    $('body').fadeIn("slow");
    var pesan = getParameterByName('pesan');

    if (pesan == null || pesan.length < 1) {

    } else {
        setTimeout(function () {
            $('#myModal').modal('show');
        }, 500);
    }

    get_list();

    $('#refresh').click(function () {
        get_list();
    });

    $('#prev').click(function () {
        page_store = $('#page').val() * 1;
        page_store = page_store - 1;
        if (page_store < 0) {
            page_store = 0;
        }
        $('#page').val(page_store);

        get_list(page_store);
    });

    $('#next').click(function () {
        page_store = $('#page').val() * 1;
        page_store = page_store + 1;
        if (page_store < 0) {
            page_store = 0;
        }
        $('#page').val(page_store);

        get_list(page_store);
    });

    function get_list(page = 0) {
        server_api = localStorage.getItem('glob_server');
        device_id = localStorage.getItem('device_id');
        $('#loading_spinner').show();
        $.ajax({
            url: server_api + '/laporan/',
            type: 'get',
            crossDomain: true,
            data: {
                'device_id': device_id,
                'page': page
            }, success: function (result) {

                $('#laporan_list').html('');
                var html = '';
                if (result.status) {
                    data = result.data;
                    for (var i = 0; i < data.length; i++) {

                        row = data[i];

                        html = '<tr>' +
                                ' <td>' +
                                ' <a href="laporan_detail.html?id=' + row.id_korban + '" class="btn btn-primary btn-sm" >' +
                                '<i class="fas fa-file-alt"></i>' +
                                '</a>' +
                                ' </td>' +
                                '<td>' + from_date2date(row.created_at) + '</td>' +
                                ' <td>' + row.nama_pelapor + '</td>' +
                                '<td>' + row.nama_korban + '</td>' +
                                '<td>' + get_status_laporan(row.status_laporan) + '</td>' +
                                '</tr>';
                        $('#laporan_list').append(html);
                    }
                }
                $('#loading_spinner').hide();

                if (result.data.length < 1) {
                    $('#next').hide();
                } else {
                    $('#next').show();
                }

            }, error: function (err) {
                alert('Periksa Koneksi ' + JSON.stringify(err));
                $('#loading_spinner').hide();

            }
        });
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

    function from_date2date(date_str) {
        const d = new Date(date_str);

        var html = '';

        html = d.getDate() + "/" + (d.getMonth() + 1) + "<br>" + d.getFullYear();

        return  html;
    }
});