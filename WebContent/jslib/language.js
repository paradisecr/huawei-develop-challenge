
var current_language = 'zh_CN';
var current_url = 'index.jsp?lang=zh_CN';
function chi(language) {
	window.location.href = "index.jsp?lang=zh_CN";
}

function eng(language) {
	window.location.href = "index.jsp?lang=en_US";
}

$(document).ready(function(){
	current_language = $.cookie('current_language')==null ? 'zh_CN' :$.cookie('current_language');
	$("#lang").val(current_language);
	current_url = "index.jsp?lang=" + current_language;
});
