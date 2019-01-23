
$('.threadButton').on('click', event => {

	if(($(event.target).siblings("ul").find("a").hasClass("hidden"))){
	   $(event.target).siblings("ul").find("a").removeClass("hidden");
	   }
	else if 
		(!($(event.target).siblings("ul").find("a").hasClass("hidden"))){
		$(event.target).siblings("ul").find("a").addClass("hidden");
	}
});

