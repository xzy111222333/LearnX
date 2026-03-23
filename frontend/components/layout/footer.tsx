import Link from "next/link"
import { BookOpen, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <span className="text-lg font-bold text-white">研</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                研料库
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              专注考研资料共享，助力每一位考研学子圆梦上岸。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">快速链接</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/materials?category=politics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                政治资料
              </Link>
              <Link href="/materials?category=english" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                英语资料
              </Link>
              <Link href="/materials?category=math" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                数学资料
              </Link>
              <Link href="/materials?category=professional" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                专业课资料
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="font-semibold">帮助支持</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                使用指南
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                常见问题
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                卖家入驻
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                投诉建议
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">联系我们</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@yanliaobank.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>工作日 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 研料库. 保留所有权利.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                用户协议
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                隐私政策
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                版权声明
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
