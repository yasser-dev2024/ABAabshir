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

/* ================================
   DOUBLE CLICK GLOBAL SYSTEM
   ضغطة = نطق فقط
   ضغطة ثانية = تنفيذ الأمر
================================ */
let lastClickTarget = null;
let lastClickTime = 0;

document.addEventListener("click", function (e) {

    let target = e.target;
    let now = Date.now();

    // منع تشغيل لوجيك الدبل كليك على نافذة مترجم الإشارة
    if (target.closest("#signBox")) return;

    let isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.onclick ||
        target.getAttribute("href") ||
        target.getAttribute("role") === "button";

    if (!isInteractive) return;

    // إيقاف التنفيذ الحقيقي للحدث
    e.preventDefault();
    e.stopImmediatePropagation();

    let text = target.innerText.trim();

    // إذا كانت ضغطة ثانية خلال 500 مللي ثانية = تنفيذ فعلي
    if (lastClickTarget === target && (now - lastClickTime < 500)) {

        window.speechSynthesis.cancel(); // إيقاف النطق

        // تنفيذ الروابط
        if (target.tagName === "A" && target.href) {
            window.location.href = target.href;
            return;
        }

        // تنفيذ الأزرار
        if (target.tagName === "BUTTON") {
            let handler = target.getAttribute("onclick");
            if (handler) eval(handler);
            return;
        }

        // تنفيذ SELECT
        if (target.tagName === "SELECT") {
            target.dispatchEvent(new Event("change"));
            return;
        }

        // إن كان عنصر عليه onclick
        if (target.onclick) {
            target.onclick();
            return;
        }

        lastClickTarget = null;
        return;
    }

    // الضغطة الأولى: نطق فقط
    window.speechSynthesis.cancel();
    if (text !== "") speakText(text);

    lastClickTarget = target;
    lastClickTime = now;
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
    video.src = "assets/videos/sign.mp4";  
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
