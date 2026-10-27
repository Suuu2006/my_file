/* =====================================================================
   你的網站內容都在這一個檔案裡，要新增或修改只要改這裡就好。
   ---------------------------------------------------------------------
   新增一筆：複製其中一個 { ... }, 整段貼在同一個清單裡，改內容即可。
   ・id       ：不能重複（用英文，例如 'c-hackathon'）
   ・date     ：'2026-10' 或 '2026-10-05'（網站會自動依時間排序、自動算出大幾）
   ・image    ：照片路徑（放在 images 資料夾）；沒有照片可留空 ''
   ・summary  ：卡片上顯示的短說明（1～2 句）
   ・detail   ：點開卡片後顯示的完整說明（想分段就用 \n 換行）
   ・link     ：相關連結，沒有就寫 null
  標有「✎」的地方是我先暫時填的內容，請改成你自己的說法或實際日期。
===================================================================== */

// 入學年份（西元）：用來自動判斷 大一／大二／大三
const ENTRY_YEAR = 2024;

// 時間軸排序：'asc' = 舊→新、'desc' = 新→舊
const SORT_ORDER = 'asc';

// 首頁「重要經歷」只顯示最新的幾個（想顯示全部就改成 99）
const HOME_COMPETITIONS_LIMIT = 3;


/* ===================== 重要經歷（競賽與獲獎） ===================== */
const COMPETITIONS = [
  {
    id: 'c-3on11',
    date: '2024-11',
    kind: '運動競賽',
    title: '校慶運動會・十人十一腳',
    badge: '亞軍',
    role: '',
    summary: '參加校慶運動會十人十一腳項目，獲得亞軍。',
    detail: '大一時，我參加校慶運動會的「十人十一腳」項目，與同學們共同練習、培養默契，並在比賽過程中學習團隊合作與溝通協調的重要性。透過彼此配合與共同努力，我們最終榮獲亞軍，這個過程讓我更加體會到團隊合作在達成共同目標中的重要性', // ✎ 可補充心得
    image: 'images/十人十一腳.png',
    tags: ['團隊合作', '運動'],
    link: null
  },
  {
    id: 'c-sdg',
    date: '2024-12',
    kind: '競賽',
    title: '113年度全國人文社會永續行動創新應用競賽',
    badge: '',
    role: '擔任隊長',
    summary: '首次擔任隊長，帶領團隊參加校外競賽',
    detail: '大一時，我首次擔任隊長，學習如何整合團隊資源、規劃專案進度，並透過有效溝通帶領團隊朝共同目標前進。雖然最終未能入圍，但這段經歷讓我學會如何組織團隊、引導成員共同討論，並透過明確分工與相互合作，在有限的時間內完成一份完整的提案企劃書。此外，從前期的構想到後續的討論與準備，我也累積了團隊協作、溝通協調及專案規劃等方面的經驗，讓我對團隊合作與專案執行有了更深刻的體會。', // ✎ 可補充心得
    image: 'images/比賽1.png',
    tags: ['永續', '創新', '專案管理'],
    link: { label: '查看提案企劃書', url: 'https://drive.google.com/file/d/1yCX1BIkw8oxrBULTagnaRhQSCjGeKZsn/view?usp=drive_link' }
  },
  {
    id: 'c-califfication',
    date: '2026-05',
    kind: '證照',
    title: 'MATLAB初級證照',
    badge: '',
    role: '',
    summary: '利用空閒時間學習額外技能',
    detail: '在課業之餘，利用課餘時間自主學習 MATLAB 基礎語法，並完成相關線上課程，取得初級證照，藉此提升程式應用能力也累積實作經驗。',
    image: 'images/matlab證明.png',
    tags: ['自主學習'],
    link: null
  },
  {
    id: 'c-impact',
    date: '2026-05',
    kind: '競賽',
    title: 'Impact Star 青年影響力競賽',
    badge: '',
    role: '',
    summary: '參加校外競賽「Impact Star 青年影響力競賽」',
    detail: '大二時，我與同學共同參加校外競賽「Impact Star 青年影響力競賽」。雖然最終未能入圍決賽，但在主題發想、提案撰寫及簡報製作的過程中，我學習到如何清楚表達自己的想法、傾聽並整合他人的意見，也進一步培養了團隊合作與溝通協調的能力。', // ✎ 可補充題目與你負責的部分
    image: 'images/S__118587399.jpg',
    tags: ['校外競賽'],
    link: null
  },
  {
    id: 'c-hackathon',
    date: '2026-10',
    kind: '競賽',
    title: '苗栗青年創想家・黑客松競賽',
    badge: '最佳潛力新星獎',
    role: '',
    summary: '參加苗青創想家黑客松，榮獲最佳潛力新星獎。',
    detail: '大三時，我與團隊共同參加校外競賽「苗青創想家黑客松」，以協助農民進行決策評估的系統作為提案主題，最終榮獲「最佳潛力新星獎」。在參賽過程中，我學習傾聽並整合團隊成員的意見，從不同觀點中檢視自身的不足並持續修正，也藉此累積提案簡報與上台發表的經驗，提升溝通表達及臨場應對的能力。',
    image: 'images/苗青黑客松.jpg',
    tags: ['黑客松', 'LINE Bot'],
    link: { label: '查看提案作品', url: 'https://drive.google.com/file/d/1nlUWepuPW8alHQOBT8DBGg15wMJRMbcl/view?usp=sharing' }
  }
];


/* ===================== 專案作品 =====================
  featured: true 的會顯示在首頁（目前設定為最新的三個），
   想換首頁要放哪三個，只要改 featured 就好。 */
const PROJECTS = [
  {
    id: 'p-sdg',
    date: '2024-12',
    kind: '企劃書',
    title: '人文社會永續行動創新應用競賽提案',
    summary: '以節能減碳為題，提出一套行動方案用以解決氣候變遷下的碳排放問題。',
    detail: '參加「全國人文社會永續行動創新應用競賽」，以節能減碳為主題，針對氣候變遷所帶來的碳排放問題，提出結合科技應用的行動方案，期望透過創新構想回應環境議題，為永續發展盡一份心力。',
    image: 'images/人社競賽提案.png',
    tags: ['永續', '創新'],
    link: { label: '查看專案', url: 'https://drive.google.com/file/d/1yCX1BIkw8oxrBULTagnaRhQSCjGeKZsn/view?usp=drive_link' },
    featured: false
  },
  {
    id: 'p-interview',
    date: '2025-11', // ✎ 請改成實際日期
    kind: '報告',
    title: '企業訪談報告',
    summary: '透過企業訪談實際了解管理在組織當中的運作。',
    detail: '參訪添御股份有限公司，並採訪董事長林文新先生，深入了解其創業歷程中面臨的挑戰、解決問題的方式與心路歷程。同時，透過企業參訪，認識半導體先進製程的管理模式與營運流程，進一步了解企業如何透過有效的管理與資源整合，維持營運效率。',
    image: 'images/企業訪談.jpg',
    tags: ['管理學', '組織'],
    link: { label: '查看專案', url: 'https://drive.google.com/file/d/1TQL6m68m3Qy2YesgpZ3QglzMdlnFXVuP/view?usp=sharing' },
    featured: false
  },
  {
    id: 'p-sweet',
    date: '2026-06', // ✎ 請改成實際日期
    kind: '網站',
    title: '甜心小舖',
    summary: '資料庫程式設計期末專案，練習打造的甜點店網站。',
    detail: '大二時，於資料庫程式設計課程的期末專案中，設計並開發一個甜點店購物網站，包含首頁、商品展示、購物車及訂單管理等功能。透過這次專案，我學習運用 PHP 與 MySQL 進行後端開發，並結合 HTML、CSS 及 Bootstrap 設計前端介面，將課程所學應用於實際開發，累積完整的網站建置與資料庫應用經驗。',
    image: 'images/甜心小舖.png',
    tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
    link: { label: '查看專案', url: 'https://github.com/Suuu2006/114-2_PHP_finalProject.git' },
    featured: false
  },
  {
    id: 'p-website',
    date: '2026-06', // ✎ 請改成實際日期
    kind: '網站',
    title: '第一個個人網站',
    summary: '練習打造的個人網站，包含首頁、關於我、作品集等頁面。',
    detail: '大二時，為了練習網頁設計與前端開發，打造了第一個個人網站，包含首頁、關於我、作品集等頁面。透過這次專案，我學習運用 HTML、CSS 與 JavaScript 設計前端介面，並將課程所學應用於實際開發，累積網站建置經驗。', // ✎ 可補充心得
    image: 'images/個人網站.png',
    tags: ['JavaScript', 'HTML', 'CSS'],
    // ⚠ 127.0.0.1 是你自己電腦的位置，網站上線後請換成正式網址
    link: { label: '查看專案', url: 'https://suuu2006.github.io/HTML_final_project/' },
    featured: false
  },
  {
    id: 'p-androidapp',
    date: '2026-06', // ✎ 請改成實際日期
    kind: 'APP',
    title: 'Android APP開發',
    summary: '學習 Android 應用程式開發',
    detail: '大二時，學習使用 Android Studio 進行 Android 應用程式開發，並透過實作完成多個基礎 APP 專案，例如成績管理系統、點餐系統等。在開發過程中，熟悉基本的程式設計與介面操作，並累積應用程式開發的實作經驗。目前尚未上線，仍在持續學習與改進中。',
    image: 'images/Androidapp.jpg',
    tags: ['Android', 'App','Java'],
    featured: true
  },
  {
    id: 'p-farm',
    date: '2026-10',
    kind: '系統',
    title: '苗青創想家提案作品',
    summary: '一個輔助農民做種植決策評估的系統。',
    detail: '苗青創想家黑客松的提案作品，是一個輔助農民做種植決策評估的系統。', // ✎ 可補充系統功能
    image: 'images/客庄作田.png',
    tags: ['JEV', 'LINE Bot'],
    link: { label: '查看專案', url: 'https://drive.google.com/file/d/1nlUWepuPW8alHQOBT8DBGg15wMJRMbcl/view?usp=sharing' },
    featured: true
  },
  {
    id: 'p-T',
    date: '現階段',
    kind: '系統',
    title: '醫療影像辨識系統',
    summary: '一個輔助醫生做脊椎側彎的智慧診斷系統。',
    detail: '目前正參與開發一套醫療影像辨識系統，旨在運用人工智慧技術輔助醫師評估脊椎側彎角度，透過影像辨識與自動化量測，減少人工標註及測量所需的時間，提升診斷流程的效率。目前系統仍處於開發階段，持續進行模型訓練與功能優化，尚未正式上線。', // ✎ 可補充系統功能
    image: 'images/醫療影像辨識系統.png',
    tags: ['醫療', 'AI'],
    featured: true
  }
];


/* ===================== 課外活動經歷 ===================== */
const ACTIVITIES = [
  {
    id: 'a-xueban',
    date: '2025-03',
    kind: '服務學習',
    title: '教育部數位學伴計劃・大學伴',
    role: '擔任大學伴',
    summary: '協助偏鄉學校的學生，提供課後的學業輔導。',
    detail: '透過一對一課業輔導，協助學生克服學習上的困難，並提供適當的學習資源與支持。在教學過程中，我學會依據學生的個別需求調整教學方式，培養耐心、同理心與溝通能力，也從中體會到陪伴與鼓勵的重要性。這段經驗不僅提升了我的表達與應變能力，也讓我更懂得站在他人的角度思考，並從學生的進步中獲得成就感。',// ✎ 可補充心得
    image: 'images/與校長合照.jpg',
    tags: ['教學', '偏鄉服務'],
    link: null
  },
  {
    id: 'a-xueban-lead',
    date: '2025-09',
    kind: '服務學習',
    title: '教育部數位學伴計劃・帶班',
    role: '擔任帶班老師',
    summary: '作為大學伴與國小端的橋樑，協助課程順利進行。',
    detail: '大二開始擔任帶班老師，協助課程日常運作與活動安排，確保教學順利進行，並作為大學伴與國小端之間的溝通橋樑，協助大學伴解決教學過程中遇到的問題。此外，也參與期初、期中及期末研習的籌備與執行，協助活動順利進行。透過這段經歷，我培養了溝通協調、問題處理及活動規劃能力，也學習如何在團隊中承擔責任、協助他人。',
    image: 'images/5AAA拷貝.JPEG',
    tags: ['團隊合作', '解決問題', '人際關係'],
    link: null
  },
  {
    id: 'a-volunteer',
    date: '2025-12-13',
    kind: '志工服務',
    title: '系上資訊志工',
    role: '志工 → 副隊長',
    summary: '在活動中從旁協助小學伴，現任資訊志工副隊長。',
    detail: '大二時，我參與系上資訊志工，協助小學伴學習，並在互動過程中學習如何與不同年齡層的學生溝通，培養耐心與表達能力。隨著服務經驗的累積，大三時進一步接任副隊長，協助隊長管理志工團隊、規劃活動流程及協調各項事務。透過這段經歷，我不僅提升了組織規劃、溝通協調與團隊管理能力，也更加體會到服務他人的價值，以及身為團隊一員所應承擔的責任。',
    image: 'images/資訊志工.jpg',
    tags: ['志工', '活動籌備'],
    link: null
  }
];


/* ===================== 亮點技能 =====================
   直接條列重點技能即可，想增減就改下面的清單。 */
const SKILLS = {
  // 硬實力：程式語言、技術
  hard: ['HTML / CSS', 'JavaScript', 'PHP', 'SQL / MySQL', 'Java（Android）', 'MATLAB'],
  // 工具
  tools: ['Bootstrap', 'Figma', 'Notion', 'Excel / Google Sheets', 'Canva', 'LINE Bot'],
  // 軟實力
  soft: ['團隊合作', '溝通協調', '解決問題', '專案規劃', '領導與分工'],
  // 證照
  certs: ['CEPT', 'MATLAB 初級證照']
};
