#2. 알림톡 보는 화면에서 따로 추가되야할것, jwt제외 확인하는 방법 추가 >> 이건 jwt 없애고 우선 base64 3회 하는것으로 




할것
1. 알림톡 세팅 화면 
2. 예약조회 화면에서 테이블별로도 조회 가능하도록 체크박스혹은 토글? 만들기
3. 재로그인 하는 부분은 그냥 코드 중복되는거 보기 싫으니까 수정이 필요 할듯, reservationstate.참고 
4. 포트 번호도 prd버전은 다르게 보일 수 있도록 >> serve -s build -p 80
5. 플랜트 세팅 화면도 자동로그인 가능하도록 수정들어가야 함 지금은 그냥 기능만 되도록 만드는 중 


******
1.Mysql 에서 트리거로 암호화 하는거 만들어야 함 

**********

nssm 


추가했을때ㅑ 입장이 0번째 전까지 이미 나온 상태라면 더이상 추가 안되도록




****
코드 수정을 해야 할듯 한데,
우선 자바스크립트에서 사용할 변수값 지정해 두고, 재로그인 부분이 필요한 내용에서 사용.
하나의 함수에서는 하나의 기능만을 해야 함.
코드 대대적인 수정이 필요한 부분 
view 단과 controll단에서 수정을 같이 해야 함.
****


***
0906

프린터로 입장한 사람들의 경우 
예약 데이터 수정불가하도록 버튼 비활성화 시켜야함.
***



***
0908

알림톡 중복 생각
예약데이터 화면 라디오 버튼 추가 

***


***
0910

알림톡 중복 + 추가막 했다가 0까지 보고 나서 알림톡 값 변경하려 하면 정렬도 안되고 이상해짐.
커스터머 화면에서 전화번호 누르면 전화거는 것 확인

***



***
0913

알림톡 화면 피자몰 사진 변경,
로그인 후 화면  로그인 view 수정필요

***

********
0914

어드민 화면에서 고객테이블 수정시 사용체크 확인하기 (커스터머랑 동일)
입장처리 했으면 무조건 커스터머 화면에서는 입장되었다 하고 수정되지 않도록 수정
앞에 대기 없을땐 세팅시간이 무조건 최초에는 나와야 정상
커스터머 화면 리프레시 아이콘 크게
커스터머 같은 인석은 선택 안되게 막기
문구 변경 필요
어드민 페이지 리프레쉬 버튼 
(해결) 최신 정보 수신 시간 표시
(해결)어드민페이지 대기번호 표시를 4자리만 하도록
템플릿 부득이하게변경


테블릿 화면이 세팅의 대기인수 대기시간 

암호화 적정수준

슈어엠 데이터 삭제할 수 있는지 문의 
********