const tapButton = document.getElementById('tapButton');
const scoreDisplay = document.getElementById('score');
const energyLevelBar = document.getElementById('energyLevel');
const energyText = document.getElementById('energyText');

let score = 0;
let maxEnergy = 100;
let currentEnergy = maxEnergy;
const energyPerTap = 1;
const energyRegenRate = 5; // প্রতি সেকেন্ডে কত এনার্জি রিচার্জ হবে

// --- ট্যাপ হ্যান্ডলিং ফাংশন ---
function handleTap() {
    if (currentEnergy >= energyPerTap) {
        // ১. স্কোর বৃদ্ধি
        score += 1;
        scoreDisplay.textContent = score + ' 🪙';

        // ২. এনার্জি হ্রাস
        currentEnergy -= energyPerTap;
        updateEnergyDisplay();

        // ৩. ট্যাপ ভাইব্রেশন (টেলিগ্রামের জন্য)
        if (window.Telegram && window.Telegram.WebApp.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        
    } else {
        // যদি এনার্জি শেষ হয়
        console.log('এনার্জি শেষ! কিছুক্ষণ অপেক্ষা করুন।'); 
        if (window.Telegram && window.Telegram.WebApp.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
    }
}

// --- এনার্জি বার আপডেট ফাংশন ---
function updateEnergyDisplay() {
    const percentage = (currentEnergy / maxEnergy) * 100;
    energyLevelBar.style.width = percentage + '%';
    energyText.textContent = `${currentEnergy} / ${maxEnergy}`;
}

// --- এনার্জি রিচার্জ ফাংশন (প্রতি সেকেন্ডে চলে) ---
function regenEnergy() {
    if (currentEnergy < maxEnergy) {
        currentEnergy = Math.min(maxEnergy, currentEnergy + energyRegenRate);
        updateEnergyDisplay();
    }
}

// --- অ্যাপ ইনিশিয়ালাইজেশন ---
function initApp() {
    // ট্যাপ ইভেন্ট যোগ করা
    tapButton.addEventListener('click', handleTap);
    
    // প্রতি সেকেন্ডে রিচার্জ শুরু
    setInterval(regenEnergy, 1000); 

    // টেলিগ্রাম Web App SDK ব্যবহার করা
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand(); // পূর্ণ স্ক্রীন করার জন্য
    }

    // প্রথমবার ডিসপ্লে আপডেট
    updateEnergyDisplay();
}

// অ্যাপ শুরু
initApp();

