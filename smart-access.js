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


/* ================================================================
   2 — نظام دبل كليك شامل يعمل على:
      - الروابط A
      - الأزرار BUTTON
      - القوائم SELECT
      - أي عنصر عليه onclick
      - الهاتف + الكمبيوتر
================================================================ */

let lastTouchTarget = null;
let lastTouchTime = 0;

// منع تنفيذ click الحقيقي على العناصر التفاعلية
function isInteractive(el) {
    return (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.tagName === "SELECT" ||
        el.onclick ||
        el.getAttribute("href") ||
        el.getAttribute("role") === "button"
    );
}

/* ====== منع اللمس المباشر على الهاتف للعناصر التفاعلية فقط ====== */
document.addEventListener(
    "touchstart",
    function (e) {
        if (isInteractive(e.target)) {
            e.preventDefault(); // يمنع تنفيذ الضغط الحقيقي
        }
    },
    { passive: false }
);

/* ====== نظام الدبل كليك ====== */
document.addEventListener(
    "click",
    function (e) {
        let target = e.target;

        if (!isInteractive(target)) return;

        let now = Date.now();

        // إيقاف التنفيذ الحقيقي
        e.preventDefault();
        e.stopImmediatePropagation();

        let text = target.innerText.trim();

        // هل هذا هو الضغط الثاني؟
        if (lastTouchTarget === target && now - lastTouchTime < 500) {
            window.speechSynthesis.cancel();

            if (target.tagName === "A" && target.href) {
                window.location.href = target.href;
                return;
            }

            if (target.tagName === "BUTTON") {
                let handler = target.getAttribute("onclick");
                if (handler) eval(handler);
                return;
            }

            if (target.tagName === "SELECT") {
                target.dispatchEvent(new Event("change"));
                return;
            }

            if (typeof target.onclick === "function") {
                target.onclick();
                return;
            }

            lastTouchTarget = null;
            return;
        }

        // الضغطة الأولى = نطق فقط
        window.speechSynthesis.cancel();
        if (text !== "") speakText(text);

        lastTouchTarget = target;
        lastTouchTime = now;
    },
    true
);



/* ================================
   3 — وضع التكبير البصري
================================ */
function enableZoomMode() {
    document.body.style.fontSize = "20px";
    document.querySelectorAll("*").forEach((el) => {
        el.style.lineHeight = "1.6";
    });
    if (navigator.vibrate) navigator.vibrate([40, 40]);
}

/* ================================
   4 — مترجم لغة الإشارة (فيديو)
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
   5 — تفعيل قراءة النص عند اللمس
================================ */
function enableTapReading() {
    window.enableTextReading = true;
    if (navigator.vibrate) navigator.vibrate([60]);
}
