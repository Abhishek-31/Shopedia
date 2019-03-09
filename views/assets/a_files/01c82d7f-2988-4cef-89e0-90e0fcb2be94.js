document.addEventListener("DOMContentLoaded", function() {
	if (button) {
    		var button = document.querySelector(".btn.unhelpful");  
		button.addEventListener("click", function() {
  			console.log( 'Do something' );
		});
	}
});