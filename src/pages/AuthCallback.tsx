import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleGoogleCallback } from "@/services/api";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get("code");
      
      if (!code) {
        toast.error("인증 코드가 없습니다");
        navigate("/login");
        return;
      }

      try {
        // 🔗 백엔드 연결: OAuth2 콜백 처리
        const data = await handleGoogleCallback(code);
        
        // 🔒 보안: Zustand store에 토큰 저장 (localStorage 대신)
        setAuth(data.accessToken, data.user);
        
        toast.success("로그인 성공!");
        navigate("/");
      } catch (error) {
        console.error("Authentication failed:", error);
        toast.error("로그인 실패");
        navigate("/login");
      }
    };

    processCallback();
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">로그인 처리중...</p>
      </div>
    </div>
  );
}
