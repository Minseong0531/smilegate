const headerGnb = document.querySelector('#main_header');
const subBg = document.querySelector('.sub_bg');
const gnbText = document.querySelectorAll('.gnb>ul>li>a');
const subText = document.querySelectorAll('.gnb>ul>li>.sub');
const logo = document.querySelector('h1');

let currentMode = null; // 'desktop' 또는 'mobile'

function initDesktopEvents() {
    function gnbOpen() {
        headerGnb.classList.add('gnb_on');
        subBg.classList.add('active');
        gnbText.forEach((text) => {
            text.style.color = '#111';
            text.style.fontSize = '20px';
        });
        subText.forEach((text) => {
            text.style.display = 'block';
        });
        logo.style.backgroundImage = "url('./images/logo_black.svg')";
    }

    function gnbLeave() {
        headerGnb.classList.remove('gnb_on');
        subBg.classList.remove('active');
        gnbText.forEach((btn) => {
            btn.style.color = '#fff';
        });
        subText.forEach((text) => {
            text.style.display = 'none';
        });
        logo.style.backgroundImage = "url('./images/logo_white.svg')";
    }

    headerGnb.addEventListener('mouseover', gnbOpen);
    headerGnb.addEventListener('mouseout', gnbLeave);

    // Section2
    const sect2Btns = document.querySelectorAll('.sect2>.container>ul>li>a');
    const info = document.querySelectorAll('.sect2>.container>ul>li');
    sect2Btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            info.forEach((li) => li.classList.remove('active'));
            e.currentTarget.parentNode.classList.add('active');
        });
    });

    // Section3
    const gameEvent = document.querySelectorAll('.sect3>ul>li>a');
    const eventList = document.querySelectorAll('.sect3>ul>li');
    gameEvent.forEach((g) => {
        g.addEventListener('click', (e) => {
            e.preventDefault();
            let li = e.currentTarget.parentNode;
            eventList.forEach((list) => {
                list.style.display = 'none';
            });
            li.style.display = 'block';
            li.classList.add('on');

            const gameBtn = li.querySelector('button');
            const gameInfo = li.querySelector('.info_container');
            gameBtn.classList.add('btn_on');
            gameInfo.classList.add('active');

            gameBtn.addEventListener('click', () => {
                gameBtn.classList.remove('btn_on');
                gameInfo.classList.remove('active');
                li.classList.remove('on');
                eventList.forEach((list) => {
                    list.style.display = 'block';
                });
            }, { once: true }); // 중복 방지
        });
    });
}

function initMobileEvents() {
    // Section2
    const sect2Btns = document.querySelectorAll('.sect2>.container>ul>li>a');
    const info = document.querySelectorAll('.sect2>.container>ul>li');
    sect2Btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            info.forEach((li) => li.classList.remove('active'));
            e.currentTarget.parentNode.classList.add('active');
        });
    });

    // Section3
    const gameBtns = document.querySelectorAll('.game_menu>li>button');
    const gameInfo = document.querySelectorAll('.info_container');
    gameBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            gameInfo.forEach((g, i) => {
                g.classList.toggle('active', i === index ? !g.classList.contains('active') : false);
            });
        });
    });

    // GNB Toggle
    const gnbToggle = document.querySelector('.toggle_btn');
    const gnb = document.querySelector('.gnb');
    const subBtns = gnb.querySelectorAll('ul>li>button');
    const subList = gnb.querySelectorAll('ul>li');
    const sub = document.querySelectorAll('.sub');

    gnbToggle.addEventListener('click', () => {
        gnbToggle.classList.toggle('on');
        gnb.classList.toggle('active');
        subBg.classList.toggle('active');
        logo.style.backgroundImage = "url('./images/logo_black.svg')";
    });

    subBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const isActive = btn.classList.contains('on');
            subList.forEach((li) => li.classList.remove('active'));
            subBtns.forEach((b) => b.classList.remove('on'));
            sub.forEach((s) => s.classList.remove('active'));

            if (!isActive) {
                btn.classList.add('on');
                btn.parentNode.classList.add('active');
                btn.nextElementSibling.classList.add('active');
            }
        });
    });
}

function wResize() {
    const bodyWidth = document.body.clientWidth;
    const newMode = bodyWidth > 1024 ? 'desktop' : 'mobile';

    if (newMode !== currentMode) {
        // 상태가 바뀔 때만 이벤트 초기화
        currentMode = newMode;
        cleanupEvents(); // 이전 이벤트 제거 (필요한 경우 구현 가능)

        if (newMode === 'desktop') {
            initDesktopEvents();
        } else {
            initMobileEvents();
        }
    }
}

function cleanupEvents() {
    // 필요하다면 기존 이벤트를 제거하는 로직을 여기에 추가
    // ex) removeEventListener, 상태 초기화 등
}

window.addEventListener('resize', wResize);
wResize();