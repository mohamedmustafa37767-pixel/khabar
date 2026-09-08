const API_URL = "https://noozra.com/api/articles?category=world&limit=20";

let newsData = [];


// ===============================
// خبر مباريات اليوم
// ===============================

const matchesNews = {
    headline: "أهم مباريات اليوم الأربعاء 9 سبتمبر 2026",
    description:
        "تتجه أنظار عشاق كرة القدم اليوم إلى مجموعة من المواجهات القوية في دوري أبطال أوروبا، أبرزها ليفربول ضد أتلتيكو مدريد ونابولي ضد أرسنال وبرشلونة ضد فينورد.",
   image_url: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg",
    source: "خبر",
    published_at: "2026-09-09"
};


// ===============================
// التأكد أن الخبر عربي
// ===============================

function isArabicNews(news) {

    const text =
        `${news.headline || ""} ${news.description || ""}`;

    return /[\u0600-\u06FF]/.test(text);
}


// ===============================
// عرض الصفحة الرئيسية
// ===============================

async function loadNews() {

    const newsContainer =
        document.getElementById("news");

    newsContainer.innerHTML = `
        <div class="news-card">
            <h2>جاري تحميل آخر الأخبار...</h2>
            <p>انتظر قليلًا من فضلك.</p>
        </div>
    `;

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل الأخبار");
        }

        const data = await response.json();

        newsData =
            (data.articles || []).filter(isArabicNews);

        showHome();

    } catch (error) {

        newsData = [];

        showHome();

        console.error(error);
    }
}


// ===============================
// الصفحة الرئيسية
// ===============================

function showHome() {

    let html = `
        <h2>أحدث الأخبار</h2>

        <div class="news-card">

            <img
                src="${matchesNews.image_url}"
                alt="أهم مباريات اليوم"
            >

            <h3>
                ${matchesNews.headline}
            </h3>

            <small>
                رياضة | 9 سبتمبر 2026
            </small>

            <p>
                ${matchesNews.description}
            </p>

            <h3>أبرز مباريات اليوم</h3>

            <ul>

                <li>
                    برشلونة × فينورد — 7:45 مساءً
                </li>

                <li>
                    شتوتجارت × فيكينج — 7:45 مساءً
                </li>

                <li>
                    ليفربول × أتلتيكو مدريد — 10:00 مساءً
                </li>

                <li>
                    باريس سان جيرمان × سلوفان براتيسلافا — 10:00 مساءً
                </li>

                <li>
                    سبورتنج لشبونة × جالاتا سراي — 10:00 مساءً
                </li>

                <li>
                    نابولي × أرسنال — 10:00 مساءً
                </li>

            </ul>

        </div>
    `;


    newsData.forEach(function(news) {

        html += createNewsCard(news);

    });


    document.getElementById("news").innerHTML = html;
}


// ===============================
// إنشاء كارت الخبر
// ===============================

function createNewsCard(news) {

    const title =
        escapeHTML(news.headline || "بدون عنوان");

    const description =
        escapeHTML(
            news.description ||
            "اضغط على اقرأ الخبر لمعرفة التفاصيل."
        );

    const image =
        news.image_url ||
        "https://picsum.photos/800/400";

    const source =
        escapeHTML(
            news.source ||
            "مصدر الأخبار"
        );

    const date =
        news.published_at
            ? new Date(news.published_at)
                .toLocaleDateString("ar-EG")
            : "";


    return `
        <div class="news-card">

            <img
                src="${image}"
                alt="${title}"
                onerror="this.src='https://picsum.photos/800/400'"
            >

            <h3>
                ${title}
            </h3>

            <p>
                ${description}
            </p>

            <small>
                المصدر: ${source}
                ${date ? " | " + date : ""}
            </small>

            <br><br>

            ${
                news.url
                ? `
                <a
                    href="${news.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button>
                        اقرأ الخبر الأصلي
                    </button>
                </a>
                `
                : ""
            }

        </div>
    `;
}


// ===============================
// البحث
// ===============================

function searchNews() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();


    if (!searchText) {

        showHome();

        return;
    }


    const results =
        newsData.filter(function(news) {

            const title =
                (news.headline || "")
                .toLowerCase();

            const description =
                (news.description || "")
                .toLowerCase();


            return title.includes(searchText) ||
                   description.includes(searchText);

        });


    let html =
        `<h2>نتائج البحث عن: ${escapeHTML(searchText)}</h2>`;


    if (results.length === 0) {

        html += `
            <div class="news-card">

                <p>
                    لم يتم العثور على أخبار مطابقة.
                </p>

                <button onclick="showHome()">
                    عرض كل الأخبار
                </button>

            </div>
        `;

    } else {

        results.forEach(function(news) {

            html += createNewsCard(news);

        });

    }


    document.getElementById("news").innerHTML = html;
}


// ===============================
// الأخبار العامة
// ===============================

function showGeneral() {

    loadCategory(
        "world",
        "الأخبار العامة"
    );

}


// ===============================
// أخبار الرياضة
// ===============================

function showSports() {

    loadCategory(
        "sports",
        "أخبار الرياضة"
    );

}


// ===============================
// أخبار السياسة
// ===============================

function showPolitics() {

    loadCategory(
        "world",
        "أخبار السياسة والعالم"
    );

}


// ===============================
// تحميل القسم
// ===============================

async function loadCategory(category, title) {

    const newsContainer =
        document.getElementById("news");


    newsContainer.innerHTML = `
        <div class="news-card">

            <h2>
                جاري تحميل ${title}...
            </h2>

        </div>
    `;


    try {

        const response =
            await fetch(
                `https://noozra.com/api/articles?category=${category}&limit=20`
            );


        if (!response.ok) {

            throw new Error(
                "فشل تحميل الأخبار"
            );

        }


        const data =
            await response.json();


        newsData =
            (data.articles || [])
            .filter(isArabicNews);


        showCategory(
            title,
            category
        );


    } catch (error) {

        newsContainer.innerHTML = `
            <div class="news-card">

                <h2>
                    حدث خطأ
                </h2>

                <p>
                    تعذر تحميل الأخبار حاليًا.
                </p>

                <button
                    onclick="loadCategory('${category}', '${title}')"
                >
                    إعادة المحاولة
                </button>

            </div>
        `;


        console.error(error);

    }
}


// ===============================
// عرض القسم
// ===============================

function showCategory(title, category) {

    let html =
        `<h2>${title}</h2>`;


    // إضافة خبر مباريات اليوم لقسم الرياضة
    if (category === "sports") {

        html += `

            <div class="news-card">

                <img
                    src="${matchesNews.image_url}"
                    alt="أهم مباريات اليوم"
                >

                <h3>
                    ${matchesNews.headline}
                </h3>

                <small>
                    رياضة | 9 سبتمبر 2026
                </small>

                <p>
                    ${matchesNews.description}
                </p>

                <h3>
                    أبرز مباريات اليوم
                </h3>

                <ul>

                    <li>
                        برشلونة × فينورد — 7:45 مساءً
                    </li>

                    <li>
                        شتوتجارت × فيكينج — 7:45 مساءً
                    </li>

                    <li>
                        ليفربول × أتلتيكو مدريد — 10:00 مساءً
                    </li>

                    <li>
                        باريس سان جيرمان × سلوفان براتيسلافا — 10:00 مساءً
                    </li>

                    <li>
                        سبورتنج لشبونة × جالاتا سراي — 10:00 مساءً
                    </li>

                    <li>
                        نابولي × أرسنال — 10:00 مساءً
                    </li>

                </ul>

            </div>
        `;
    }


    if (newsData.length === 0) {

        html += `
            <div class="news-card">

                <p>
                    لا توجد أخبار عربية متاحة حاليًا.
                </p>

            </div>
        `;

    }


    newsData.forEach(function(news) {

        html += createNewsCard(news);

    });


    document.getElementById("news").innerHTML = html;
}


// ===============================
// حماية النصوص
// ===============================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ===============================
// تشغيل الموقع
// ===============================

window.onload = function() {

    loadNews();

};
