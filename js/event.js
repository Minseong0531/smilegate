document.addEventListener('DOMContentLoaded', () => {
    let isDesktop = window.innerWidth > 1024;
    let resizeTimer;
  
    function commonSection2() {
      const sect2Btns = document.querySelectorAll('.sect2>.container>ul>li>a');
      const info = document.querySelectorAll('.sect2>.container>ul>li');
  
      sect2Btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          info.forEach((li) => li.classList.remove('active'));
          btn.parentNode.classList.add('active');
        });
      });
    }
  
    function initDesktop() {
      const headerGnb = document.querySelector('#main_header');
      const subBg = document.querySelector('.sub_bg');
      const gnbText = document.querySelectorAll('.gnb>ul>li>a');
      const subText = document.querySelectorAll('.gnb>ul>li>.sub');
      const logo = document.querySelector('h1');
  
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
          btn.style.fontSize = ''; // 기본값 복원
        });
        subText.forEach((text) => {
          text.style.display = 'none';
        });
        logo.style.backgroundImage = "url('./images/logo_white.svg')";
      }
  
      headerGnb.addEventListener('mouseover', gnbOpen);
      headerGnb.addEventListener('mouseout', gnbLeave);
  
      // section3
      const gameEvent = document.querySelectorAll('.sect3>ul>li>a');
      const eventList = document.querySelectorAll('.sect3>ul>li');
  
      gameEvent.forEach((g) => {
        g.addEventListener('click', (e) => {
          e.preventDefault();
          const li = e.currentTarget.parentNode;
  
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
          }, { once: true });
        });
      });
    }
  
    function initMobile() {
      const logo = document.querySelector('h1');
      const subBg = document.querySelector('.sub_bg');
      const gnbToggle = document.querySelector('.toggle_btn');
      const gnb = document.querySelector('.gnb');
      const gameBtns = document.querySelectorAll('.game_menu>li>button');
      const gameInfo = document.querySelectorAll('.info_container');
  
      // 모바일 메뉴 토글
      gnbToggle.addEventListener('click', () => {
        gnbToggle.classList.toggle('on');
        gnb.classList.toggle('active');
        subBg.classList.toggle('active');
        logo.style.backgroundImage = gnb.classList.contains('active')
          ? "url('./images/logo_black.svg')"
          : "url('./images/logo_white.svg')";
      });
  
      // 모바일 하위 메뉴 펼치기
      const subBtns = gnb.querySelectorAll('ul>li>button');
      const subList = gnb.querySelectorAll('ul>li');
      const sub = document.querySelectorAll('.sub');
  
      subBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const isOpen = btn.classList.contains('on');
  
          subList.forEach((list) => list.classList.remove('active'));
          subBtns.forEach((b) => b.classList.remove('on'));
          sub.forEach((s) => s.classList.remove('active'));
  
          if (!isOpen) {
            btn.classList.add('on');
            btn.parentNode.classList.add('active');
            btn.nextElementSibling.classList.add('active');
          }
        });
      });
  
      // 모바일 게임 정보 토글
      gameBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const infoPanel = btn.nextElementSibling;
          const isActive = btn.classList.contains('on');
  
          gameBtns.forEach((gBtn) => gBtn.classList.remove('on'));
          gameInfo.forEach((info) => info.classList.remove('active'));
  
          if (!isActive) {
            btn.classList.add('on');
            infoPanel.classList.add('active');
          }
        });
      });
    }
  
    function setup() {
      // 공통
      commonSection2();
  
      // 환경 분기
      if (isDesktop) {
        initDesktop();
      } else {
        initMobile();
      }
    }
  
    setup(); // 최초 실행
  
    // 화면 크기 변경 감지
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const current = window.innerWidth > 1024;
        if (current !== isDesktop) {
          isDesktop = current;
          window.location.reload(); // 또는 기존 이벤트 remove 후 setup() 재실행
        }
      }, 200);
    });
  });