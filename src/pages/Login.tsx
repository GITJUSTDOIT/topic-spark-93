import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Asterisk } from "lucide-react";

export default function Login() {
  return (
    <main className="w-full h-screen items-center justify-center flex p-6 gap-6 bg-background">
      <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            로그인
          </h4>
          <p className="text-muted-foreground">구글 로그인으로 바로 시작하기</p>
        </div>
        <div className="grid gap-3">
          {/* 소셜 로그인 */}
          <Button type="button" variant="secondary" className="gap-2">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            구글 로그인
          </Button>
          {/* 이용자 약관동의 형식 */}
          <div className="grid gap-2">
            <div className="grid gap-2">
              <div className="flex items-center gap-1">
                <Asterisk size={14} className="text-[#F96859]" />
                필수 동의항목
              </div>
              <div className="flex flex-col">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox className="w-[18px] h-[18px]" />
                    <span className="text-sm">서비스 이용약관 동의</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
