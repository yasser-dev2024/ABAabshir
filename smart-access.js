/* ==========================================================
   نظام دبل كليك موحّد للكمبيوتر والجوال
   ضغطة = نطق فقط
   ضغطة ثانية = تنفيذ الفعل
========================================================== */

let lastClickTarget = null;
let lastClickTime = 0;

function speak(text) {
    window.speechSynthesis.cancel();
    const s = new SpeechSynthesisUtterance(text);
    s.lang = "ar-SA";
    s.rate = 1.05;
    window.speechSynthesis.speak(s);
}

document.addEventListener("click", function (e) {

    let target = e.target;
    let now = Date.now();

    // استبعاد مترجم الإشارة من النظام
    if (target.closest("#signBox")) return;

    // عناصر تفاعلية فقط
    let interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.getAttribute("onclick") ||
        target.getAttribute("href");

    if (!interactive) return;

    // منع التنفيذ الفوري الافتراضي
    e.preventDefault();
    e.stopImmediatePropagation();

    let text = target.innerText.trim();

    // لو دبل كليك خلال 500ms = تنفيذ
    if (lastClickTarget === target && (now - lastClickTime) < 500) {

        // روابط
        if (target.tagName === "A" && target.href) {
            window.location.href = target.href;
            return;
        }

        // أزرار
        if (target.tagName === "BUTTON") {
            let handler = target.getAttribute("onclick");
            if (handler) eval(handler);
            return;
        }

        // قوائم
        if (target.tagName === "SELECT") {
            target.dispatchEvent(new Event("change"));
            return;
        }

        // onclick مباشر
        if (typeof target.onclick === "function") {
            target.onclick();
            return;
        }

        lastClickTarget = null;
        return;
    }

    // الضغطة الأولى: نطق فقط
    if (text !== "") speak(text);

    lastClickTarget = target;
    lastClickTime = now;
});
