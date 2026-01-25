/** @format */

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";

            fetch("contact.php", {
                method: "POST",
                body: formData,
            })
            .then((response) => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status >= 200 && status < 300 && body.success) {
                    // Show success with PHP's custom message
                    successMessage.querySelector("h3").textContent = "Thank You!";
                    successMessage.querySelector("p").textContent = body.message || "We will get back to you shortly.";
                    successMessage.style.display = "block";
                    errorMessage.style.display = "none";
                    contactForm.reset();

                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 5000);
                } else {
                    // Show error with PHP's exact message
                    errorMessage.querySelector("h3").textContent = "Error";
                    errorMessage.querySelector("p").textContent = body.message || "Please try again or contact us directly.";
                    errorMessage.style.display = "block";
                    successMessage.style.display = "none";

                    setTimeout(() => {
                        errorMessage.style.display = "none";
                    }, 5000);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                errorMessage.querySelector("p").textContent = "Network issue - please check your connection.";
                errorMessage.style.display = "block";

                setTimeout(() => {
                    errorMessage.style.display = "none";
                }, 5000);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            });
        });
    }

    // Directions button (unchanged)
    const directionsBtn = document.getElementById("directionsBtn");
    if (directionsBtn) {
        directionsBtn.addEventListener("click", function () {
            window.open(
                "https://www.google.com/maps/search/Pension+Mall+Kyaliwajjala+Trading+Centre+Wakiso",
                "_blank",
            );
        });
    }
});