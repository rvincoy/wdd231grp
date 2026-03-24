document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Logic
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (menuButton && dropdownMenu) {
        menuButton.addEventListener("click", () => {
            dropdownMenu.classList.toggle("show");
        });

        window.addEventListener("click", (event) => {
            if (!event.target.closest(".dropdown-nav")) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Form Submission Logic
    const feedbackForm = document.getElementById("feedbackForm");
    const responseDiv = document.getElementById("feedbackResponse");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents page reload
            
            const name = document.getElementById("fb-name").value;
            
            // Show a success message to the user
            responseDiv.style.color = "green";
            responseDiv.textContent = `Thank you for your feedback, ${name}! It has been submitted.`;
            
            // Reset the form fields
            feedbackForm.reset();
        });
    }
});