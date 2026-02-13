document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider");

    slider.addEventListener("mouseup", goNext);
    slider.addEventListener("touchend", goNext);

    function goNext() {
        window.location.href = "seite-2.html";
    }
});
