/* ================================
   1 — قارئ صوتي للنصوص
================================ */
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ar-SA";
    speech.rate = 1.05;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

/* قراءة النص عند الضغط على أي عنصر */
document.addEventListener("click", function(e) {
    if (window.enableTextReading && e.target.innerText.trim() !== "") {
        speakText(e.target.innerText);
        if (navigator.vibrate) navigator.vibrate(40);
    }
});


/* ================================
   2 — وضع التكبير البصري
================================ */
function enableZoomMode() {
    document.body.style.fontSize = "20px";
    document.querySelectorAll("*").forEach(el => {
        el.style.lineHeight = "1.6";
    });
    if (navigator.vibrate) navigator.vibrate([40, 40]);
}


/* ================================
   3 — مترجم لغة الإشارة (فيديو)
================================ */
function showSignLanguageVideo() {
    let videoBox = document.createElement("div");
    videoBox.style.position = "fixed";
    videoBox.style.bottom = "85px";
    videoBox.style.left = "10px";
    videoBox.style.width = "150px";
    videoBox.style.height = "200px";
    videoBox.style.background = "rgba(0,0,0,0.7)";
    videoBox.style.borderRadius = "10px";
    videoBox.style.padding = "5px";
    videoBox.style.zIndex = "99999";
    videoBox.style.backdropFilter = "blur(4px)";

    let video = document.createElement("video");
    video.src = "assets/videos/sign.mp4";  // هنا ضع مسار فيديو مترجم الإشارة
    video.autoplay = true;
    video.loop = true;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.borderRadius = "10px";

    videoBox.appendChild(video);
    document.body.appendChild(videoBox);

    if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
}


/* ================================
   4 — تفعيل قراءة النص عند اللمس
================================ */
function enableTapReading() {
    window.enableTextReading = true;
    if (navigator.vibrate) navigator.vibrate([60]);
}

