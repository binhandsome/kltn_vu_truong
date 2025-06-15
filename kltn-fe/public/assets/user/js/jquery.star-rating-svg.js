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
}