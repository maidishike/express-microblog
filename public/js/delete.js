$(function() {
  $('.btn-delete').click(function() {
    var dataset = this.dataset,
        name = dataset.name,
        day = dataset. day,
        title = dataset. title;
    if (confirm('确认删除该文章？')) {
      $.ajax({
        type: 'GET',
        url: '/remove/' + name + '/' + day + '/'  + title,
        success: function(res) {
          var msg;
          if (res.bool) {
            alert(res.msg);
            window.location.reload(true);
          }else {
            alert(res.msg);
          }
        },
        error: function(err) {
          alert('服务器响应失败');
        }
      })
    }
  });
});
