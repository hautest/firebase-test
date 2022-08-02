import { useNavigate } from "react-router-dom";

export function Login() {
  const nav = useNavigate();
  return (
    <main>
      <div>Login</div>
      <form>
        <input placeholder="이메일" />
        <input placeholder="비밀번호" />
        <button>로그인</button>
      </form>
      <div>
        계정이 없다면 ?
        <button
          onClick={() => {
            nav("/signUp");
          }}
        >
          회원가입하기
        </button>
      </div>
    </main>
  );
}
