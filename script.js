// قائمة الألوان مع معلوماتها
const colors = [
    { name: 'أحمر', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
    { name: 'أخضر', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
    { name: 'أزرق', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
    { name: 'أصفر', hex: '#FFFF00', rgb: 'rgb(255, 255, 0)' },
    { name: 'برتقالي', hex: '#FFA500', rgb: 'rgb(255, 165, 0)' },
    { name: 'بنفسجي', hex: '#800080', rgb: 'rgb(128, 0, 128)' },
    { name: 'وردي', hex: '#FFC0CB', rgb: 'rgb(255, 192, 203)' },
    { name: 'بني', hex: '#A52A2A', rgb: 'rgb(165, 42, 42)' },
    { name: 'رمادي', hex: '#808080', rgb: 'rgb(128, 128, 128)' },
    { name: 'أسود', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'أبيض', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
    { name: 'ذهبي', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
    { name: 'فضي', hex: '#C0C0C0', rgb: 'rgb(192, 192, 192)' },
    { name: 'تركواز', hex: '#40E0D0', rgb: 'rgb(64, 224, 208)' },
    { name: 'زهري', hex: '#FF69B4', rgb: 'rgb(255, 105, 180)' }
];

// تهيئة العناصر
const colorsGrid = document.getElementById('colorsGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('colorModal');
const closeBtn = document.querySelector('.close-btn');
const colorPreview = document.querySelector('.modal-content .color-preview');
const colorNameElement = document.getElementById('colorName');
const hexCodeElement = document.getElementById('hexCode');
const rgbCodeElement = document.getElementById('rgbCode');
const copyButton = document.getElementById('copyButton');

// دالة لإنشاء بطاقات الألوان
function createColorCards(colorsArray) {
    colorsGrid.innerHTML = '';
    colorsArray.forEach(color => {
        const card = document.createElement('div');
        card.className = 'color-card';
        card.innerHTML = `
            <div class="color-preview" style="background-color: ${color.hex}"></div>
            <div class="color-info">
                <div class="color-name">${color.name}</div>
                <div class="color-hex">${color.hex}</div>
            </div>
        `;
        
        // إضافة حدث النقر لفتح النافذة المنبثقة
        card.addEventListener('click', () => showColorDetails(color));
        
        colorsGrid.appendChild(card);
    });
}

// دالة لعرض تفاصيل اللون في النافذة المنبثقة
function showColorDetails(color) {
    colorPreview.style.backgroundColor = color.hex;
    colorNameElement.textContent = color.name;
    hexCodeElement.textContent = color.hex;
    rgbCodeElement.textContent = color.rgb;
    modal.style.display = 'block';
}

// دالة البحث عن الألوان
function searchColors(query) {
    const filteredColors = colors.filter(color => 
        color.name.includes(query) || 
        color.hex.toLowerCase().includes(query.toLowerCase())
    );
    createColorCards(filteredColors);
}

// إضافة مستمعي الأحداث
searchInput.addEventListener('input', (e) => searchColors(e.target.value));

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

copyButton.addEventListener('click', () => {
    const hexCode = hexCodeElement.textContent;
    navigator.clipboard.writeText(hexCode).then(() => {
        copyButton.textContent = 'تم النسخ!';
        setTimeout(() => {
            copyButton.textContent = 'نسخ الرمز';
        }, 2000);
    });
});

// تهيئة العرض الأولي للألوان
createColorCards(colors);
