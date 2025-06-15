/**
<<<<<<< HEAD
=======

>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
	Abstract : Ajax Page Js File
	File : dz.ajax.js
	#CSS attributes: 
		.dzForm : Form class for ajax submission. 
<<<<<<< HEAD
		.dzFormMsg : Div Class | Show Form validation error/success message on ajax form submission
=======
		.dzFormMsg  : Div Class| Show Form validation error/success message on ajax form submission
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
		
	#Javascript Variable
	.dzRes : ajax request result variable
	.dzFormAction : Form action variable
	.dzFormData : Form serialize data variable
<<<<<<< HEAD
=======

>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
**/

/* Cookies Function */
function setCookie(cname, cvalue, exhours) {
	var d = new Date();
	d.setTime(d.getTime() + (30 * 60 * 1000)); /* 30 Minutes */
	var expires = "expires=" + d.toString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function deleteCookie(cname) {
	var d = new Date();
	d.setTime(d.getTime() + (1)); // 1/1000 second
	var expires = "expires=" + d.toString();
	document.cookie = cname + "=1;" + expires + ";path=/";
}
/* Cookies Function END */

<<<<<<< HEAD
function contactForm() {
	'use strict';

	// reCAPTCHA Callbacks
	window.verifyRecaptchaCallback = function (response) {
		document.querySelectorAll('input[data-recaptcha]').forEach(input => {
			input.value = response;
			input.dispatchEvent(new Event('change'));
		});
	};

	window.expiredRecaptchaCallback = function () {
		document.querySelectorAll('input[data-recaptcha]').forEach(input => {
			input.value = "";
			input.dispatchEvent(new Event('change'));
		});
	};

	// Handle dzForm submission
	document.querySelectorAll(".dzForm").forEach(form => {
		form.addEventListener('submit', async function (e) {
			e.preventDefault(); // STOP default action
			var msgDiv;
			var dzFormMsg = document.querySelector('.dzFormMsg');
			dzFormMsg.innerHTML = '<div class="gen alert dz-alert alert-success">Submitting..</div>';

			var dzFormAction = form.getAttribute('action');
			var dzFormData = new FormData(form);

			try {
				var response = await fetch(dzFormAction, {
					method: "POST",
					body: dzFormData,
					headers: {
						'Accept': 'application/json'
					}
				});
				var dzRes = await response.json();

				if (dzRes.status == 1) {
					msgDiv = `<div class="gen alert dz-alert alert-success">${dzRes.msg}</div>`;
				} else if (dzRes.status == 0) {
					msgDiv = `<div class="err alert dz-alert alert-danger">${dzRes.msg}</div>`;
				}

				dzFormMsg.innerHTML = msgDiv;

				setTimeout(() => {
					dzFormMsg.querySelector('.alert').style.display = 'none';
				}, 5000);

				form.reset();
				if (typeof grecaptcha !== 'undefined') {
					grecaptcha.reset();
				}
			} catch (error) {
				dzFormMsg.innerHTML = '<div class="err alert dz-alert alert-danger">An error occurred. Please try again.</div>';
			}
		});
	});

	// Handle dzSubscribe submission (MailChimp)
	document.addEventListener('submit', async function (e) {
		if (!e.target.matches('.dzSubscribe')) return;

		e.preventDefault(); // STOP default action
		var thisForm = e.target;
		var dzFormMsg = document.querySelector('.dzSubscribeMsg');
		var dzFormAction = thisForm.getAttribute('action');
		var dzFormData = new FormData(thisForm);
		var msgDiv;

		thisForm.classList.add('dz-ajax-overlay');

		try {
			var response = await fetch(dzFormAction, {
				method: "POST",
				body: dzFormData,
				headers: {
					'Accept': 'application/json'
				}
			});
			var dzRes = await response.json();

			thisForm.classList.remove('dz-ajax-overlay');

			if (dzRes.status == 1) {
				msgDiv = `<div class="gen alert dz-alert alert-success">${dzRes.msg}</div>`;
				setCookie('prevent_subscription', 'true', 1);
			} else if (dzRes.status == 0) {
				msgDiv = `<div class="err alert dz-alert alert-danger">${dzRes.msg}</div>`;
			}

			dzFormMsg.innerHTML = msgDiv;

			setTimeout(() => {
				dzFormMsg.querySelector('.alert').style.display = 'none';
			}, 5000);

			thisForm.reset();
		} catch (error) {
			thisForm.classList.remove('dz-ajax-overlay');
			dzFormMsg.innerHTML = '<div class="err alert dz-alert alert-danger">An error occurred. Please try again.</div>';
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	contactForm();
});
=======
function contactForm()
{
	window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    }
	'use strict';
	var msgDiv;
	$(".dzForm").on('submit',function(e)
	{
		e.preventDefault();	//STOP default action
		$('.dzFormMsg').html('<div class="gen alert dz-alert alert-success">Submitting..</div>');
		var dzFormAction = $(this).attr('action');
		var dzFormData = $(this).serialize();
		
		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
			success: function(dzRes){
				if(dzRes.status == 1){
					msgDiv = '<div class="gen alert dz-alert alert-success">'+dzRes.msg+'</div>';
				}
				
				if(dzRes.status == 0){
					msgDiv = '<div class="err alert dz-alert alert-danger">'+dzRes.msg+'</div>';
				}
				$('.dzFormMsg').html(msgDiv);
				
				
				setTimeout(function(){
					$('.dzFormMsg .alert').hide(1000);
				}, 5000);
				
				$('.dzForm')[0].reset();
                grecaptcha.reset();
			}
		})
	});
	
	
	/* This function is for mail champ subscription START*/
	$(document).on('submit', ".dzSubscribe",function(e){
		e.preventDefault();	//STOP default action
		var thisForm = $(this);
		var dzFormAction = thisForm.attr('action');
		var dzFormData = thisForm.serialize();
		thisForm.addClass('dz-ajax-overlay');
		
		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
			success: function(dzRes) {
				thisForm.removeClass('dz-ajax-overlay');
				
				if(dzRes.status == 1){
					msgDiv = '<div class="gen alert dz-alert alert-success">'+dzRes.msg+'</div>';
					setCookie('prevent_subscription', 'true', 1);
				}
				if(dzRes.status == 0){
					msgDiv = '<div class="err alert dz-alert alert-danger">'+dzRes.msg+'</div>';
				}
				
				$('.dzSubscribeMsg').html(msgDiv);
				setTimeout(function(){
					$('.dzSubscribeMsg .alert').hide(0);
				}, 5000);
				
				$('.dzSubscribe')[0].reset();
			}
		}) 
	});
	
	/* This function is for mail champ subscription END*/
	
}

jQuery(document).ready(function() {
    'use strict';
	contactForm();
})
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
