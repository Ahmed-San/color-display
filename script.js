// قائمة الألوان مع معلوماتها
const colors = [
    // الألوان الأساسية
    { name: 'أحمر', hex: '#FF0000', rgb: 'rgb(255, 0, 0)', category: 'basic' },
    { name: 'أخضر', hex: '#00FF00', rgb: 'rgb(0, 255, 0)', category: 'basic' },
    { name: 'أزرق', hex: '#0000FF', rgb: 'rgb(0, 0, 255)', category: 'basic' },
    { name: 'أصفر', hex: '#FFFF00', rgb: 'rgb(255, 255, 0)', category: 'basic' },
    
    // الألوان الدافئة
    { name: 'برتقالي', hex: '#FFA500', rgb: 'rgb(255, 165, 0)', category: 'warm' },
    { name: 'أحمر داكن', hex: '#8B0000', rgb: 'rgb(139, 0, 0)', category: 'warm' },
    { name: 'برتقالي محمر', hex: '#FF4500', rgb: 'rgb(255, 69, 0)', category: 'warm' },
    { name: 'برتقالي فاتح', hex: '#FFB347', rgb: 'rgb(255, 179, 71)', category: 'warm' },
    { name: 'ذهبي', hex: '#FFD700', rgb: 'rgb(255, 215, 0)', category: 'warm' },
    
    // الألوان الباردة
    { name: 'أزرق سماوي', hex: '#87CEEB', rgb: 'rgb(135, 206, 235)', category: 'cool' },
    { name: 'تركواز', hex: '#40E0D0', rgb: 'rgb(64, 224, 208)', category: 'cool' },
    { name: 'نيلي', hex: '#4B0082', rgb: 'rgb(75, 0, 130)', category: 'cool' },
    { name: 'أزرق بحري', hex: '#000080', rgb: 'rgb(0, 0, 128)', category: 'cool' },
    { name: 'زمردي', hex: '#50C878', rgb: 'rgb(80, 200, 120)', category: 'cool' },
    
    // الألوان الباستيل
    { name: 'وردي فاتح', hex: '#FFB6C1', rgb: 'rgb(255, 182, 193)', category: 'pastel' },
    { name: 'أخضر نعناعي', hex: '#98FF98', rgb: 'rgb(152, 255, 152)', category: 'pastel' },
    { name: 'أزرق فاتح', hex: '#ADD8E6', rgb: 'rgb(173, 216, 230)', category: 'pastel' },
    { name: 'ليلكي', hex: '#E6E6FA', rgb: 'rgb(230, 230, 250)', category: 'pastel' },
    { name: 'خوخي', hex: '#FFE5B4', rgb: 'rgb(255, 229, 180)', category: 'pastel' },
    
    // الألوان المحايدة
    { name: 'رمادي فاتح', hex: '#D3D3D3', rgb: 'rgb(211, 211, 211)', category: 'neutral' },
    { name: 'بيج', hex: '#F5F5DC', rgb: 'rgb(245, 245, 220)', category: 'neutral' },
    { name: 'رمادي داكن', hex: '#A9A9A9', rgb: 'rgb(169, 169, 169)', category: 'neutral' },
    { name: 'بني فاتح', hex: '#DEB887', rgb: 'rgb(222, 184, 135)', category: 'neutral' },
    { name: 'رمادي متوسط', hex: '#808080', rgb: 'rgb(128, 128, 128)', category: 'neutral' }
];

// تهيئة العناصر
document.addEventListener('DOMContentLoaded', () => {
    const colorsGrid = document.getElementById('colorsGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const modal = document.getElementById('colorModal');
    const closeBtn = document.querySelector('.close-btn');
    const colorPreview = document.querySelector('.modal-color-preview');
    const colorNameElement = document.getElementById('colorName');
    const hexCodeElement = document.getElementById('hexCode');
    const rgbCodeElement = document.getElementById('rgbCode');
    const copyButton = document.getElementById('copyButton');
    const themeToggle = document.getElementById('checkbox');
    const favoriteButton = document.getElementById('favoriteButton');
    let currentColor = null;
    let favorites = JSON.parse(localStorage.getItem('favoriteColors') || '[]');

    // أزرار الأدوات
    const colorMixerBtn = document.getElementById('colorMixerBtn');
    const colorGeneratorBtn = document.getElementById('colorGeneratorBtn');
    const colorExtractBtn = document.getElementById('colorExtractBtn');

    // نوافذ الأدوات
    const colorMixerModal = document.getElementById('colorMixerModal');
    const colorGeneratorModal = document.getElementById('colorGeneratorModal');
    const colorExtractModal = document.getElementById('colorExtractModal');

    // دمج الألوان
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const color1Text = document.getElementById('color1Text');
    const color2Text = document.getElementById('color2Text');
    const mixRatio = document.getElementById('mixRatio');
    const mixRatioText = document.getElementById('mixRatioText');
    const mixedColorDisplay = document.getElementById('mixedColorDisplay');
    const mixedColorCode = document.getElementById('mixedColorCode');
    const saveMixedColor = document.getElementById('saveMixedColor');

    // مولد الألوان
    const paletteType = document.getElementById('paletteType');
    const baseColor = document.getElementById('baseColor');
    const generatedPalette = document.getElementById('generatedPalette');
    const saveGeneratedPalette = document.getElementById('saveGeneratedPalette');

    // استخراج الألوان
    const imageUpload = document.getElementById('imageUpload');
    const uploadButton = document.getElementById('uploadButton');
    const imagePreview = document.getElementById('imagePreview');
    const extractedColors = document.getElementById('extractedColors');
    const saveExtractedColors = document.getElementById('saveExtractedColors');

    // التحقق من الوضع المظلم المحفوظ
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }

    // تبديل الوضع المظلم
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // دالة إنشاء بطاقات الألوان
    function createColorCards(colorsArray) {
        colorsGrid.innerHTML = '';
        colorsArray.forEach(color => {
            const card = document.createElement('div');
            card.className = 'color-card';
            if (favorites.includes(color.hex)) {
                card.classList.add('favorite');
            }
            card.innerHTML = `
                <div class="color-preview" style="background-color: ${color.hex}"></div>
                <div class="color-info">
                    <div class="color-name">${color.name}</div>
                    <div class="color-hex">${color.hex}</div>
                </div>
            `;
            
            card.addEventListener('click', () => showColorDetails(color));
            colorsGrid.appendChild(card);
        });
    }

    // دالة عرض تفاصيل اللون
    function showColorDetails(color) {
        currentColor = color;
        colorPreview.style.backgroundColor = color.hex;
        colorNameElement.textContent = color.name;
        hexCodeElement.textContent = color.hex;
        rgbCodeElement.textContent = color.rgb;
        modal.style.display = 'flex';
        
        // تحديث حالة زر المفضلة
        favoriteButton.classList.toggle('active', favorites.includes(color.hex));
        favoriteButton.innerHTML = favorites.includes(color.hex) ? 
            '<i class="fas fa-heart"></i> إزالة من المفضلة' :
            '<i class="fas fa-heart"></i> إضافة للمفضلة';

        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    // دالة البحث عن الألوان
    function filterColors() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const filteredColors = colors.filter(color => {
            const matchesSearch = color.name.toLowerCase().includes(searchTerm) ||
                                color.hex.toLowerCase().includes(searchTerm) ||
                                color.rgb.toLowerCase().includes(searchTerm);
            
            let matchesCategory = true;
            if (category === 'favorites') {
                matchesCategory = favorites.includes(color.hex);
            } else {
                matchesCategory = category === 'all' || color.category === category;
            }
            
            return matchesSearch && matchesCategory;
        });

        createColorCards(filteredColors);
    }

    // نسخ رمز اللون
    copyButton.addEventListener('click', () => {
        const colorCode = hexCodeElement.textContent;
        navigator.clipboard.writeText(colorCode).then(() => {
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
            setTimeout(() => {
                copyButton.innerHTML = originalText;
            }, 2000);
        });
    });

    // إغلاق النافذة المنبثقة
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });

    // إضافة مستمع حدث لزر المفضلة
    favoriteButton.addEventListener('click', () => {
        if (!currentColor) return;
        
        const index = favorites.indexOf(currentColor.hex);
        if (index === -1) {
            favorites.push(currentColor.hex);
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i> إزالة من المفضلة';
        } else {
            favorites.splice(index, 1);
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i> إضافة للمفضلة';
        }
        
        favoriteButton.classList.toggle('active');
        localStorage.setItem('favoriteColors', JSON.stringify(favorites));
        
        // تحديث عرض البطاقات إذا كان الفلتر الحالي هو المفضلة
        if (categoryFilter.value === 'favorites') {
            filterColors();
        }
    });

    // إضافة مستمعي الأحداث
    searchInput.addEventListener('input', filterColors);
    categoryFilter.addEventListener('change', filterColors);

    // دالة تحويل اللون من HEX إلى RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // دالة تحويل اللون من RGB إلى HEX
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    // دالة دمج لونين
    function mixColors() {
        const color1 = hexToRgb(color1Input.value);
        const color2 = hexToRgb(color2Input.value);
        const ratio = mixRatio.value / 100;

        const mixed = {
            r: Math.round(color1.r * (1 - ratio) + color2.r * ratio),
            g: Math.round(color1.g * (1 - ratio) + color2.g * ratio),
            b: Math.round(color1.b * (1 - ratio) + color2.b * ratio)
        };

        const mixedHex = rgbToHex(mixed.r, mixed.g, mixed.b);
        mixedColorDisplay.style.backgroundColor = mixedHex;
        mixedColorCode.textContent = mixedHex;
    }

    // دالة إنشاء مجموعة ألوان
    function generatePalette() {
        const baseHex = baseColor.value;
        const baseRgb = hexToRgb(baseHex);
        const type = paletteType.value;
        let colors = [];

        switch (type) {
            case 'monochromatic':
                colors = Array.from({length: 5}, (_, i) => {
                    const lightness = 20 + (i * 15);
                    return `hsl(${baseHsl.h}, ${baseHsl.s}%, ${lightness}%)`;
                });
                break;
            case 'complementary':
                const complement = `hsl(${(baseHsl.h + 180) % 360}, ${baseHsl.s}%, ${baseHsl.l}%)`;
                colors = [baseHex, complement];
                break;
            case 'analogous':
                colors = Array.from({length: 5}, (_, i) => {
                    const hue = (baseHsl.h + (i - 2) * 30 + 360) % 360;
                    return `hsl(${hue}, ${baseHsl.s}%, ${baseHsl.l}%)`;
                });
                break;
            case 'triadic':
                colors = [
                    baseHex,
                    `hsl(${(baseHsl.h + 120) % 360}, ${baseHsl.s}%, ${baseHsl.l}%)`,
                    `hsl(${(baseHsl.h + 240) % 360}, ${baseHsl.s}%, ${baseHsl.l}%)`
                ];
                break;
        }

        generatedPalette.innerHTML = '';
        colors.forEach(color => {
            const div = document.createElement('div');
            div.className = 'palette-color';
            div.style.backgroundColor = color;
            div.setAttribute('data-color', color);
            div.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                showNotification('تم نسخ اللون');
            });
            generatedPalette.appendChild(div);
        });
    }

    // دالة استخراج الألوان من الصورة
    function extractColors(image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorMap = new Map();

        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const hex = rgbToHex(r, g, b);
            colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }

        const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([color]) => color);

        extractedColors.innerHTML = '';
        sortedColors.forEach(color => {
            const div = document.createElement('div');
            div.className = 'palette-color';
            div.style.backgroundColor = color;
            div.setAttribute('data-color', color);
            div.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                showNotification('تم نسخ اللون');
            });
            extractedColors.appendChild(div);
        });

        saveExtractedColors.disabled = false;
    }

    // مستمعات الأحداث
    colorMixerBtn.addEventListener('click', () => colorMixerModal.style.display = 'flex');
    colorGeneratorBtn.addEventListener('click', () => colorGeneratorModal.style.display = 'flex');
    colorExtractBtn.addEventListener('click', () => colorExtractModal.style.display = 'flex');

    // دمج الألوان
    color1Input.addEventListener('input', () => {
        color1Text.value = color1Input.value;
        mixColors();
    });
    color2Input.addEventListener('input', () => {
        color2Text.value = color2Input.value;
        mixColors();
    });
    mixRatio.addEventListener('input', () => {
        mixRatioText.textContent = mixRatio.value + '%';
        mixColors();
    });
    saveMixedColor.addEventListener('click', () => {
        const color = {
            name: 'لون مدموج',
            hex: mixedColorCode.textContent,
            rgb: `rgb(${Object.values(hexToRgb(mixedColorCode.textContent)).join(', ')})`,
            category: 'custom'
        };
        colors.push(color);
        createColorCards([color]);
        colorMixerModal.style.display = 'none';
        showNotification('تم حفظ اللون');
    });

    // مولد الألوان
    baseColor.addEventListener('input', generatePalette);
    paletteType.addEventListener('change', generatePalette);
    saveGeneratedPalette.addEventListener('click', () => {
        const newColors = Array.from(generatedPalette.children).map(div => ({
            name: 'لون مولد',
            hex: div.getAttribute('data-color'),
            rgb: `rgb(${Object.values(hexToRgb(div.getAttribute('data-color'))).join(', ')})`,
            category: 'custom'
        }));
        colors.push(...newColors);
        createColorCards(newColors);
        colorGeneratorModal.style.display = 'none';
        showNotification('تم حفظ مجموعة الألوان');
    });

    // استخراج الألوان
    uploadButton.addEventListener('click', () => imageUpload.click());
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    imagePreview.innerHTML = '';
                    imagePreview.appendChild(img);
                    extractColors(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    saveExtractedColors.addEventListener('click', () => {
        const newColors = Array.from(extractedColors.children).map(div => ({
            name: 'لون مستخرج',
            hex: div.getAttribute('data-color'),
            rgb: `rgb(${Object.values(hexToRgb(div.getAttribute('data-color'))).join(', ')})`,
            category: 'custom'
        }));
        colors.push(...newColors);
        createColorCards(newColors);
        colorExtractModal.style.display = 'none';
        showNotification('تم حفظ الألوان المستخرجة');
    });

    // عرض جميع الألوان عند تحميل الصفحة
    createColorCards(colors);
});
