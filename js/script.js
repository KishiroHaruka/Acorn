// DOM要素の取得
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// モバイルメニューの切り替え
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// メニューリンクをクリックした時にモバイルメニューを閉じる
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    });
});

// スクロール時のナビゲーション背景変更
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ページ読み込み時のアニメーション
window.addEventListener('load', () => {
    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// インターセクションオブザーバーによる要素のフェードイン
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素の初期化と監視開始
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.concept-item, .quick-nav-item, .news-item, .menu-item, .food-item, .shisha-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// カーソル追従エフェクト（デスクトップのみ）
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);
    
    // カーソルエフェクトのスタイル
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // ホバー効果でカーソルを大きく
    document.querySelectorAll('a, button, .concept-item, .quick-nav-item, .menu-item, .food-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// バックグラウンドパーティクル効果
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(76, 175, 80, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

// パーティクルアニメーションのCSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// パーティクル効果を開始
createParticles();

// フォーム送信処理（将来の拡張用）
function handleFormSubmit(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォーム送信処理をここに追加
        const formData = new FormData(form);
        
        // 成功メッセージの表示
        showNotification('送信が完了しました', 'success');
    });
}

// 通知表示機能
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `};