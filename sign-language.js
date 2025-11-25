/* ======================================================
   نافذة مترجم لغة الإشارة (ثابتة في يمين الشاشة)
====================================================== */

const signBox = document.createElement("div");
signBox.style.position = "fixed";
signBox.style.top = "160px";           // أسفل الهيدر
signBox.style.right = "10px";          // يمين الشاشة
signBox.style.width = "140px";
signBox.style.height = "200px";
signBox.style.background = "rgba(0,0,0,0.55)";
signBox.style.borderRadius = "15px";
signBox.style.backdropFilter = "blur(6px)";
signBox.style.padding = "10px";
signBox.style.display = "flex";
signBox.style.alignItems = "center";
signBox.style.justifyContent = "center";
signBox.style.color = "#fff";
signBox.style.fontWeight = "bold";
signBox.style.textAlign = "center";
signBox.style.fontSize = "14px";
signBox.style.zIndex = "999999";
signBox.innerText = "مرر الماوس على النص\nلعرض لغة الإشارة";
document.body.appendChild(signBox);


/* ======================================================
    قاموس لغة الإشارة العربي للكلمات الأكثر استخداماً
====================================================== */

const signDictionary = {

    "السفارة": "🤟 إشارة السفارة",
    "الدولة": "👌 دولة",
    "تحديد": "👉",
    "موقع": "👇",
    "بلاغ": "✋ بلاغ",
    "أمني": "✊ أمني",
    "طارئ": "🚨",
    "مساعدة": "👐 مساعدة",
    "جواز": "📘",
    "سفر": "✈️",
    "إرسال": "📤",
    "عودة": "↩️",
    "ملف": "📄",
    "صورة": "📷",
    "فيديو": "🎥",

    // كلمات عامة
    "خدمات": "🤲",
    "خاصة": "🤟",
    "الإشارة": "✋",
    "قراءة": "👂",
    "نص": "📘",
};


/* ======================================================
    نظام اللمس الناطق + لغة الإشارة عند تمرير الماوس
====================================================== */

document.addEventListener("mouseover", function (e) {

    let text = e.target.innerText.trim();

    if (text.length === 0) return;

    // النطق
    const speak = new SpeechSynthesisUtterance(text);
    speak.lang = "ar-SA";
    speak.rate = 1.05;
    window.speechSynthesis.speak(speak);

    // لغة الإشارة
    let words = text.split(" ");

    let found = null;

    for (let w of words) {
        if (signDictionary[w]) {
            found = signDictionary[w];
            break;
        }
    }

    if (found) {
        signBox.innerText = found;
    } else {
        signBox.innerText = "🤟 إشارة النص";
    }
});
