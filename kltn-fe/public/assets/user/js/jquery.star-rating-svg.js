<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
    /* 1. Visualizing things on Hover */
    document.querySelectorAll('#stars li').forEach(star => {
        star.addEventListener('mouseover', function () {
            var onStar = parseInt(this.dataset.value, 10); // The star currently mouse on

            // Highlight all stars before the current hovered star
            Array.from(this.parentElement.children).forEach((child, index) => {
                if (child.classList.contains('star')) {
                    if (index < onStar) {
                        child.classList.add('hover');
                    } else {
                        child.classList.remove('hover');
                    }
                }
            });
        });

        star.addEventListener('mouseout', function () {
            // Remove hover class from all stars
            Array.from(this.parentElement.children).forEach(child => {
                if (child.classList.contains('star')) {
                    child.classList.remove('hover');
                }
            });
        });
    });

    /* 2. Action to perform on click */
    document.querySelectorAll('#stars li').forEach(star => {
        star.addEventListener('click', function () {
            var onStar = parseInt(this.dataset.value, 10); // The star currently selected
            var stars = Array.from(this.parentElement.children).filter(child => child.classList.contains('star'));

            // Remove selected class from all stars
            stars.forEach(star => star.classList.remove('selected'));

            // Add selected class to stars up to the clicked star
            for (let i = 0; i < onStar; i++) {
                stars[i].classList.add('selected');
            }

            // Response message
            var ratingValue = parseInt(document.querySelector('#stars li.selected:last-child')?.dataset.value || 0, 10);
            var msg = "";
            if (ratingValue > 1) {
                msg = `Thanks! You rated this ${ratingValue} stars.`;
            } else {
                msg = `We will improve ourselves. You rated this ${ratingValue} stars.`;
            }
            responseMessage(msg);
        });
    });
});

function responseMessage(msg) {
    alert(msg);
=======
$(document).ready(function(){
  
  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
	var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
	// Now highlight all the stars that's not after the current hovered star
	$(this).parent().children('li.star').each(function(e){
	  if (e < onStar) {
		$(this).addClass('hover');
	  }
	  else {
		$(this).removeClass('hover');
	  }
	});
	
  }).on('mouseout', function(){
	$(this).parent().children('li.star').each(function(e){
	  $(this).removeClass('hover');
	});
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
	var onStar = parseInt($(this).data('value'), 10); // The star currently selected
	var stars = $(this).parent().children('li.star');
	
	for (i = 0; i < stars.length; i++) {
	  $(stars[i]).removeClass('selected');
	}
	
	for (i = 0; i < onStar; i++) {
	  $(stars[i]).addClass('selected');
	}
	
	// JUST RESPONSE (Not needed)
	var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
	var msg = "";
	if (ratingValue > 1) {
		msg = "Thanks! You rated this " + ratingValue + " stars.";
	}
	else {
		msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
	}
	responseMessage(msg);
	
  });
  
  
});


function responseMessage(msg) {
  alert(msg);  
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
}