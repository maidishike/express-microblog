$(function() {
  $('#btn_avatar').click(function() {
    $('#input_avatar').trigger('click');
  });
  $('#input_avatar').change(function() {
    $('#avatar_form').submit();
  });
});
