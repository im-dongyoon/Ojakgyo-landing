# 0001. 웨이팅리스트 저장 방식

## 결정

- 랜딩 모달의 폼은 **Server Action**(`joinWaitlist`)으로 제출하고, 서버에서 Supabase `public.waitlist`에 insert한다.
- 서버는 **publishable(anon) 키**를 쓴다. 테이블은 RLS를 켜고 `anon`에게 `email` 컬럼 **insert만** 허용한다. select · update · delete 정책은 없다.
- 이메일은 `trim` + 소문자로 정규화해 저장하고, `email`에 unique 인덱스를 건다.
- 이미 등록된 이메일(unique 위반, `23505`)도 **성공으로 응답**한다.
- 봇 차단은 우선 숨김 필드(honeypot) 하나로 한다. 채워져 오면 저장하지 않고 성공으로 응답한다.

## 이유

- 랜딩에는 로그인이 없다. secret 키를 쓰면 RLS를 우회하므로, 키가 새도 "insert만 가능"하도록 publishable 키 + RLS로 권한을 좁혔다.
- insert 후 `select`(returning)를 하지 않으므로 anon에 select 권한이 필요 없다. 목록은 대시보드나 secret 키로만 본다.
- 중복을 에러로 알려 주면 "이 이메일이 등록돼 있는지"를 밖에서 확인할 수 있다. 사용자 입장에서도 "이미 신청함"과 "신청 완료"를 구분할 이유가 없다.

## 나중에 볼 것

- 트래픽이 붙으면 rate limit(Vercel Firewall 또는 IP 기준 제한)을 추가한다.
- 유입 경로(utm 등)가 필요해지면 `source` 컬럼을 추가하고 insert 권한 컬럼에 넣는다.
