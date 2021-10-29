document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    run();
}
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
    navigator.app.exitApp();
}


function run() {
    server_api = localStorage.getItem('glob_server');
    if(server_api==null){
        localStorage.setItem('glob_server','http://192.168.43.159/dp3akb/api/');
    }
    
    $('img').click(function () {
        window.location.href = 'home.html';
    });

    if(device.uuid==null){
        localStorage.setItem('device_id','browsrid123');
    }else{
        localStorage.setItem('device_id',device.uuid);
    }

}