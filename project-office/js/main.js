// =========================
// 活動資料
// =========================

const activities = [

    {
        id: "autumn",

        title: "2026 秋季交流活動",

        date: "2026-8-15",

        location: "台北",

        description:
            "這是一場專案交流活動，歡迎大家一起參與。",

        images: [
            "images/activities/autumn.png",
            "images/activities/autumn-2.png",
            "images/activities/autumn-3.png"  
            ]                      
    },


    {
        id: "winter",    

        title: "2026 冬季成果分享會",

        date: "2026-11-20",

        location: "台中",

        description:
            "分享專案執行成果，並與參與者進行交流。",

        images: [
            "images/activities/winter.png"
            ]
    },


    {
        id: "spring",

        title: "2027 春季活動",

        date: "2027-03-15",

        location: "高雄",

        description:
            "新年度的第一場專案活動。",

        images: [
            "images/activities/spring.png"
            ]
    }

];


// =========================
// 判斷活動是否已完成
// =========================

function isCompleted(activity) {

    const today = new Date();

    const activityDate =
        new Date(activity.date);


    return activityDate < today;

}


// =========================
// 取得即將舉辦的活動
// =========================

function getUpcomingActivities() {

    return activities
        .filter(function(activity) {

            return !isCompleted(activity);

        })
        .sort(function(a, b) {

            return new Date(a.date)
                - new Date(b.date);

        });

}


// =========================
// 取得已完成的活動
// =========================

function getCompletedActivities() {

    return activities
        .filter(function(activity) {

            return isCompleted(activity);

        })
        .sort(function(a, b) {

            return new Date(b.date)
                - new Date(a.date);

        });

}


// =========================
// 首頁：最新活動
// =========================

const latestActivities =
    document.querySelector(
        "#latest-activities"
    );


function displayLatestActivities() {

    if (!latestActivities) {
        return;
    }


    const upcomingActivities =
        getUpcomingActivities();


    latestActivities.innerHTML = "";


    if (upcomingActivities.length === 0) {

        latestActivities.innerHTML = `
            <p>
                目前沒有即將舉辦的活動。
            </p>
        `;

        return;

    }


    upcomingActivities.forEach(
        function(activity) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "activity-card";


            card.innerHTML = `

                <div class="activity-date">
                    ${activity.date}
                </div>

                <h3>
                    ${activity.title}
                </h3>

                <div class="activity-location">
                    ${activity.location}
                </div>

                <p class="activity-description">
                    ${activity.description}
                </p>

            `;


            latestActivities.appendChild(card);

        }
    );

}


displayLatestActivities();

// =========================
// 活動訊息頁
// =========================

const upcomingActivities =
    document.querySelector(
        "#upcoming-activities"
    );


const completedActivities =
    document.querySelector(
        "#completed-activities"
    );


// 建立活動卡片
function createActivityCard(activity) {

    const card =
        document.createElement("article");


    card.className =
        "activity-card";


    card.innerHTML = `

        <a
            href="activity-detail.html?activity=${activity.id}"
            class="activity-card-link"
        >

            <div class="activity-date">
                ${activity.date}
            </div>

            <h3>
                ${activity.title}
            </h3>

            <div class="activity-location">
                ${activity.location}
            </div>

            <p class="activity-description">
                ${activity.description}
            </p>

            <div class="activity-detail-link">
                查看活動詳細內容 →
            </div>

        </a>

    `;


    return card;

}




// 顯示活動訊息
function displayActivitiesPage() {

    // 如果目前不是活動訊息頁
    // 就不執行
    if (
        !upcomingActivities &&
        !completedActivities
    ) {
        return;
    }


    // 即將舉辦
    if (upcomingActivities) {

        const upcoming =
            getUpcomingActivities();


        upcomingActivities.innerHTML = "";


        if (upcoming.length === 0) {

            upcomingActivities.innerHTML = `
                <p>
                    目前沒有即將舉辦的活動。
                </p>
            `;

        }
        else {

            upcoming.forEach(
                function(activity) {

                    const card =
                        createActivityCard(
                            activity
                        );


                    upcomingActivities
                        .appendChild(card);

                }
            );

        }

    }


    // 已完成
    if (completedActivities) {

        const completed =
            getCompletedActivities();


        completedActivities.innerHTML = "";


        if (completed.length === 0) {

            completedActivities.innerHTML = `
                <p>
                    目前還沒有已完成的活動。
                </p>
            `;

        }
        else {

            completed.forEach(
                function(activity) {

                    const card =
                        createActivityCard(
                            activity
                        );


                    completedActivities
                        .appendChild(card);

                }
            );

        }

    }

}


displayActivitiesPage();




// =========================
// 活動訊息詳細頁
// =========================

const activityDetail =
document.querySelector(
"#activity-detail"
);

function displayActivityDetail() {

// 如果不是活動訊息詳細頁
// 就不執行

if (!activityDetail) {
    return;
}


// 取得網址中的 activity

const params =
    new URLSearchParams(
        window.location.search
    );


const activityId =
    params.get("activity");


// 沒有指定活動

if (!activityId) {

    activityDetail.innerHTML = `
        <p>
            找不到活動資料。
        </p>
    `;

    return;

}


// 找到指定活動

const activity =
    activities.find(
        function(item) {

            return item.id ===
                activityId;

        }
    );


// 找不到活動

if (!activity) {

    activityDetail.innerHTML = `
        <p>
            找不到這場活動。
        </p>
    `;

    return;

}


// 顯示活動詳細資料

activityDetail.innerHTML = `

    <article class="activity-detail">

        <div class="activity-date">
            ${activity.date}
        </div>


        <h1>
            ${activity.title}
        </h1>


        <div class="activity-location">
            ${activity.location}
        </div>


        <div class="activity-detail-description">

            <h2>
                活動介紹
            </h2>

            <p>
                ${activity.description}
            </p>

        </div>


        <div class="activity-detail-info">

            <h2>
                活動資訊
            </h2>

            <p>
                <strong>活動日期：</strong>
                ${activity.date}
            </p>

            <p>
                <strong>活動地點：</strong>
                ${activity.location}
            </p>

        </div>


        <div class="section-more">

            <a
                href="activities.html"
                class="text-link"
            >
                ← 返回活動訊息
            </a>

        </div>

    </article>

`;


}

// 執行活動訊息詳細頁
displayActivityDetail();

// =========================
// 活動成果頁
// =========================

const resultsList =
    document.querySelector(
        "#results-list"
    );


// =========================
// 活動成果列表卡片
// =========================

function createResultCard(activity) {

    const card =
        document.createElement("article");


    card.className =
        "result-card";


    card.innerHTML = `

        <a
            class="result-card-link"
            href="result-detail.html?activity=${activity.id}"
        >

            <div class="result-image">

                <img
                    src="${activity.images[0]}"
                    alt="${activity.title}"
                >

            </div>


            <div class="result-content">

                <div class="activity-date">
                    ${activity.date}
                </div>


                <h2>
                    ${activity.title}
                </h2>

            </div>

        </a>

    `;


    return card;

}



// =========================
// 活動成果詳細頁
// =========================

function createResultDetail(activity) {

    const detail =
        document.createElement("article");


    detail.className =
        "result-detail";


    // 建立所有活動照片
    const imagesHTML =
        activity.images.map(
            function(image, index) {

                return `

                    <div class="detail-photo">

                        <img
                            src="${image}"
                            alt="${activity.title} 第 ${index + 1} 張照片"
                        >

                    </div>

                `;

            }
        ).join("");


    detail.innerHTML = `

        <div class="detail-content">

            <div class="activity-date">
                ${activity.date}
            </div>


            <h1>
                ${activity.title}
            </h1>


            <div class="activity-location">
                ${activity.location}
            </div>


            <p>
                ${activity.description}
            </p>

        </div>


        <div class="detail-gallery">

            ${imagesHTML}

        </div>

    `;


    return detail;

}


// =========================
// 顯示成果
// =========================

function displayResultsPage() {

    if (!resultsList) {
        return;
    }


    // 取得已完成活動

    const completed =
        getCompletedActivities();


    // 清空原本內容

    resultsList.innerHTML = "";


    // 沒有活動

    if (completed.length === 0) {

        resultsList.innerHTML = `
            <p>
                目前還沒有已完成的活動。
            </p>
        `;

        return;

    }


    // 顯示所有已完成活動

    completed.forEach(
        function(activity) {

            const card =
                createResultCard(activity);


            resultsList.appendChild(card);

        }
    );

}


// 執行

displayResultsPage();


// =========================
// 活動成果詳細頁
// =========================

const resultDetail =
    document.querySelector(
        "#result-detail"
    );


function displayResultDetail() {

    if (!resultDetail) {
        return;
    }


    // 取得網址中的活動 ID

    const params =
        new URLSearchParams(
            window.location.search
        );


    const activityId =
        params.get("activity");


    // 沒有指定活動

    if (!activityId) {

        resultDetail.innerHTML = `
            <p>
                找不到活動資料。
            </p>
        `;

        return;

    }


    // 找到指定活動

    const activity =
        activities.find(
            function(item) {

                return item.id ===
                    activityId;

            }
        );


    // 找不到活動

    if (!activity) {

        resultDetail.innerHTML = `
            <p>
                找不到這場活動。
            </p>
        `;

        return;

    }


    // 建立所有照片

    const imagesHTML =
        activity.images.map(
            function(image, index) {

                return `

                    <div class="detail-photo">

                        <img
                            src="${image}"
                            alt="${activity.title} 第 ${index + 1} 張照片"
                        >

                    </div>

                `;

            }
        ).join("");


    // 建立活動詳細內容

    resultDetail.innerHTML = `

        <div class="detail-content">

            <div class="activity-date">
                ${activity.date}
            </div>


            <h1>
                ${activity.title}
            </h1>


            <div class="activity-location">
                ${activity.location}
            </div>


            <p>
                ${activity.description}
            </p>

        </div>


        <div class="detail-gallery">

            ${imagesHTML}

        </div>

    `;

}


displayResultDetail();



// =========================
// 首頁活動成果照片輪播
// =========================

const resultImage =
    document.querySelector(
        "#result-image"
    );

const resultLink =
    document.querySelector(
        "#result-link"
    );


const resultTitle =
    document.querySelector(
        "#result-title"
    );


const prevButton =
    document.querySelector(
        "#prev-button"
    );


const nextButton =
    document.querySelector(
        "#next-button"
    );


const sliderDots =
    document.querySelector(
        "#slider-dots"
    );


// 取得已完成活動
const completedForSlider =
    getCompletedActivities();


// 所有輪播照片
let sliderItems = [];


completedForSlider.forEach(
    function(activity) {

        activity.images.forEach(
            function(image) {

                sliderItems.push({

                    image: image,

                    title: activity.title,

                    activityId: activity.id

                });

            }
        );

    }
);



// 目前照片位置
let currentSlide = 0;


// 顯示照片
function showSlide(index) {

    if (!resultImage) {
        return;
    }


    if (sliderItems.length === 0) {

        resultImage.style.display =
            "none";

        resultTitle.textContent =
            "目前還沒有活動成果";

        return;

    }


    // 防止超過範圍
    if (index < 0) {

        currentSlide =
            sliderItems.length - 1;

    }
    else if (
        index >= sliderItems.length
    ) {

        currentSlide = 0;

    }
    else {

        currentSlide = index;

    }


const item =
    sliderItems[currentSlide];


resultImage.src =
    item.image;


resultImage.alt =
    item.title;


resultTitle.textContent =
    item.title;


// 點擊照片時前往成果頁
if (resultLink) {

    resultLink.href =
        "results.html?activity="
        + item.activityId;

}




    updateDots();

}


// 建立圓點
function createDots() {

    if (!sliderDots) {
        return;
    }


    sliderDots.innerHTML = "";


    sliderItems.forEach(
        function(item, index) {

            const dot =
                document.createElement(
                    "button"
                );


            dot.className =
                "slider-dot";


            dot.type =
                "button";


dot.addEventListener(
    "click",
    function() {

        stopSlider();

        showSlide(index);

        startSlider();

    }
);



            sliderDots.appendChild(dot);

        }
    );

}


// 更新圓點
function updateDots() {

    if (!sliderDots) {
        return;
    }


    const dots =
        sliderDots.querySelectorAll(
            ".slider-dot"
        );


    dots.forEach(
        function(dot, index) {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        }
    );

}


// 上一張
if (prevButton) {

    prevButton.addEventListener(
        "click",
        function() {

            stopSlider();

            showSlide(
                currentSlide - 1
            );

            startSlider();

        }
    );

}



// 下一張
if (nextButton) {

    nextButton.addEventListener(
        "click",
        function() {

            stopSlider();

            showSlide(
                currentSlide + 1
            );

            startSlider();

        }
    );

}



// 啟動輪播
if (resultImage) {

    createDots();

    showSlide(0);

}

// =========================
// 自動播放
// =========================

let sliderTimer = null;


function startSlider() {

    if (
        !resultImage ||
        sliderItems.length <= 1
    ) {
        return;
    }


    sliderTimer =
        setInterval(
            function() {

                showSlide(
                    currentSlide + 1
                );

            },
            5000
        );

}


function stopSlider() {

    if (sliderTimer) {

        clearInterval(
            sliderTimer
        );

        sliderTimer = null;

    }

}


startSlider();
