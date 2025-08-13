# Smilegate Interactive Landing Page 🎮

스마일게이트 공식 웹사이트 리뉴얼해보기 프로젝트입니다.  
순수 Vanilla JS를 사용하여 제작했습니다.
Desktop과 Mobile 환경 모두 대응합니다.

---

## 🔹 주요 기능

### 공통 기능
- **Section2 탭**: 버튼 클릭 시 활성화(`active`) 토글, 관련 정보 표시
- **반응형 대응**: 화면 크기 >1024px (Desktop), ≤1024px (Mobile) 분기 처리

### Desktop 전용
- **GNB 메뉴 호버**: 서브 메뉴 표시 및 스타일 변경
  - 메뉴 텍스트 색상/폰트 크기 조정
  - 로고 이미지 동적 변경
- **Section3 게임 이벤트 클릭**: 상세 정보 레이어 표시 및 닫기 기능

### Mobile 전용
- **메뉴 토글 버튼**: GNB 메뉴 열기/닫기
- **하위 메뉴 토글**: 버튼 클릭 시 서브 메뉴 펼치기
- **게임 정보 토글**: 버튼 클릭 시 상세 정보 표시/닫기

### 반응형 처리
- 윈도우 리사이즈 감지
- Desktop ↔ Mobile 전환 시 이벤트/DOM 상태 초기화 (`window.location.reload()`)

---

## ⚙️ 기술적 이슈 & 해결 과정

1. **메뉴/탭 이벤트 충돌**
   - Desktop GNB hover와 Mobile 메뉴 토글 이벤트 충돌
   - **해결**: `isDesktop` 상태로 이벤트 분리, 각 환경별 초기화 함수 분리

2. **Section2 버튼 활성화 중복**
   - 여러 버튼 클릭 시 class 중복 문제 발생
   - **해결**: 클릭 시 모든 li에서 `active` 제거 후 클릭한 버튼만 적용

3. **Section3 게임 정보 토글**
   - 이벤트 열고 닫기 로직 복잡
   - **해결**: `once: true` 옵션 사용, Desktop/Mobile 이벤트 분리

4. **반응형 전환 시 이벤트 초기화**
   - 화면 리사이즈 후 기존 이벤트 충돌 문제
   - **해결**: resize 이벤트 감지 후 `window.location.reload()` 또는 이벤트 재실행

5. **동적 스타일 변경**
   - 메뉴 활성화 상태에 따른 로고 및 텍스트 색상 변경 필요
   - **해결**: class toggle과 inline style 적용

---
