DROP TABLE IF EXISTS guestbook;

CREATE TABLE guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 초기 데이터 (선택 사항)
INSERT INTO guestbook (name, content) VALUES ('관리자', '방명록에 오신 것을 환영합니다!');
