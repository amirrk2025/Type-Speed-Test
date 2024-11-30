const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const originTextElement = document.querySelector("#origin-text p");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");

// آرایه‌ای از متن‌های نمونه
const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "JavaScript is a versatile and powerful programming language.",
    "Coding is both a skill and an art.",
    "Frontend development requires creativity and precision."
];

// انتخاب متن تصادفی
function getRandomText() {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
}

// مقداردهی اولیه
let originText = getRandomText();
originTextElement.innerHTML = originText;

// تایمر
let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;

// تابع اضافه کردن صفر به زمان
function leadingZero(time) {
    return time <= 9 ? "0" + time : time;
}

// اجرای تایمر
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// بررسی تایپ
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered === originText) {
        testWrapper.style.borderColor = "green";
        clearInterval(interval);
    } else {
        testWrapper.style.borderColor = textEntered === originTextMatch ? "yellow" : "red";
    }
}

// بازنشانی تست
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    // انتخاب متن جدید
    originText = getRandomText();
    originTextElement.innerHTML = originText;
}

// شروع تایمر
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// افزودن Event Listener‌ها
testArea.addEventListener("keypress", start);
testArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);
