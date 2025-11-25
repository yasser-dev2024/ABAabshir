console.log("Abshir UI Loaded Successfully");

// رسالة نجاح الإرسال
function sendForm() {
    document.getElementById("successMessage").classList.remove("hidden");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}


// ============================
//  تحديد الدولة تلقائيًا
// ============================
function detectLocation() {
    const status = document.getElementById("locationStatus");
    status.textContent = "جاري تحديد الموقع...";

    if (!navigator.geolocation) {
        status.textContent = "المتصفح لا يدعم تحديد الموقع.";
        return;
    }

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        status.textContent = "تم الحصول على الموقع.. جاري تحديد الدولة";

        // نستخدم Nominatim API
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(data => {
                const countryName = data.address.country || "غير معروف";

                document.getElementById("country").innerHTML =
                    `<option selected>${countryName}</option>`;

                status.textContent = "تم تحديد الدولة تلقائيًا ✔";
            });
    }

    function error() {
        status.textContent = "لم نتمكن من تحديد الموقع. تأكد من السماح للموقع.";
    }
}
