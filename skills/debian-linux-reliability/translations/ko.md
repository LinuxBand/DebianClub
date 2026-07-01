# Debian Linux Reliability Skill 한국어 설명

이 파일은 유지보수자와 한국어 사용자를 위한 설명입니다. 실제 `SKILL.md` 는 AI agent 가 더 안정적으로 감지하고 실행할 수 있도록 영어로 유지합니다.

## 목적

`debian-linux-reliability` 는 Debian/Linux 개발, 운영, 문제 해결을 위한 신뢰성 skill 입니다. AI 에게 더 많은 지식을 외우게 하는 것이 아니라, 먼저 시스템 사실을 수집하고 모듈화된 절차에 따라 제안하도록 만드는 것이 목적입니다.

## 기본 경계

- 기본적으로 읽기 전용 진단만 수행한다.
- 기본적으로 패키지를 설치하지 않고, 파일을 삭제하지 않고, 시스템 설정을 수정하지 않고, 서비스를 재시작하지 않고, 방화벽이나 디스크 파티션을 변경하지 않는다.
- 사용자가 명시적으로 변경 실행을 요청하면, 실행 전에 위험, 영향 범위, 검증 방법, 롤백 방법을 설명해야 한다.

## 하위 기능

- 환경 감지: 배포판, 릴리스, 아키텍처, WSL, 컨테이너, systemd, 권한.
- APT 안전성: 패키지 이름 검증, 저장소 확인, backports, 서드파티 저장소 위험.
- 명령 안전성: `rm -rf`, `dd`, `mkfs`, `curl | sh` 같은 고위험 명령 감지.
- systemd 문제 해결: 서비스 상태, unit 파일, journal 로그, 시작 실패.
- 네트워크 진단: DNS, 라우팅, 포트, 방화벽, NetworkManager, systemd-networkd.
- 개발 환경: Node, Python, Rust, Go, C/C++, Git, 빌드 의존성.
- GPU 드라이버: NVIDIA, AMD, Intel, Mesa, Wayland/X11, Secure Boot, DKMS.
- 컨테이너: Podman, Docker, rootless, Compose, volume 권한, cgroup v2.
- Debian 패키징: `debian/control`, `sbuild`, `lintian`, backports 패키징.
- 보안 감사: Lynis 사용 가능 여부, 감사 출력 해석, 단계별 hardening 계획.

## DebianClub 연동

DebianClub 에 관련 내용이 있으면 AI 는 먼저 저장소 안의 DebianClub 문서를 읽고, 사용자의 머신에서 얻은 읽기 전용 진단 결과와 결합해 답변해야 합니다. DebianClub 문서는 설명과 학습에 사용하고, 실시간 패키지 이름, 버전, 서비스 상태는 사용자 환경에서 확인한 결과를 기준으로 삼아야 합니다.
