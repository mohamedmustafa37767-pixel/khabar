const newsData = [
    {
        title: "تطورات جديدة في عالم التكنولوجيا",
        description: "أحدث التقنيات والأجهزة تستمر في التطور، مع ظهور حلول جديدة في مجالات الذكاء الاصطناعي والتقنية.",
        image: "https://picsum.photos/800/400?random=70"
    },
    {
        title: "أهم أخبار الرياضة اليوم",
        description: "متابعة لأبرز الأحداث الرياضية ونتائج المباريات وآخر أخبار الفرق واللاعبين.",
        image: "https://picsum.photos/800/400?random=71"
    },
    {
        title: "أخبار عالمية متنوعة",
        description: "أبرز التطورات والأحداث العالمية في مجالات مختلفة.",
        image: "https://picsum.photos/800/400?random=72"
    },
    {
        title: "أسواق واقتصاد",
        description: "متابعة لأهم الأخبار الاقتصادية وحركة الأسواق والتطورات المالية.",
        image: "https://picsum.photos/800/400?random=73"
    }
];

function showHome() {
    let html = "<h2>أحدث الأخبار</h2>";

    newsData.forEach(function(news) {
        html += `
            <div class="news-card">
                <img src="${news.image}">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <button onclick="readNews('${news.title}', '${news.description}')">
                    اقرأ الخبر
                </button>
            </div>
        `;
    });

    document.getElementById("news").innerHTML = html;
}

function readNews(title, description) {
    document.getElementById("news").innerHTML = `
        <div class="news-card">
            <h2>${title}</h2>
            <p>${description}</p>
            <p>هذه صفحة تفاصيل الخبر.</p>
            <button onclick="showHome()">العودة للأخبار</button>
        </div>
    `;
}

window.onload = function() {
    showHome();
};