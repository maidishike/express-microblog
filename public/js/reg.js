
// 注册
$('#submit').click(function() {
  var data = $('#register').serializeArray();
  $.post('/reg', data, function(data) {
    if (!data.bool) {
      alert(data.error);
      return;
    }
    alert('注册成功');
    window.location.href="/";
  });
});
