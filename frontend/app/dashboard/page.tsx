"use client"

import Link from "next/link"
import { 
  Wallet, 
  FileText, 
  ShoppingBag, 
  TrendingUp,
  ArrowRight,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import {
  currentUser,
  userMaterials,
  userOrders,
  userEarnings,
  formatPrice,
  formatDate,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const totalEarnings = userEarnings.reduce((sum, e) => sum + e.netAmount, 0)
  const recentEarnings = userEarnings.slice(0, 5)
  const recentOrders = userOrders.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">欢迎回来，{currentUser.name}</h1>
          <p className="text-muted-foreground">这是你的账户概览</p>
        </div>
        <Button asChild className="self-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Link href="/upload" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            上传新资料
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="账户余额"
          value={formatPrice(currentUser.balance)}
          description="可提现金额"
          icon={Wallet}
          gradient="from-purple-500 to-pink-500"
        />
        <StatsCard
          title="累计收益"
          value={formatPrice(currentUser.totalEarnings)}
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
          gradient="from-green-500 to-teal-500"
        />
        <StatsCard
          title="我的资料"
          value={`${userMaterials.length} 份`}
          description={`总销量 ${userMaterials.reduce((sum, m) => sum + m.salesCount, 0)} 份`}
          icon={FileText}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="购买订单"
          value={`${userOrders.length} 笔`}
          description="已完成订单"
          icon={ShoppingBag}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Earnings */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">最近收益</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/earnings" className="flex items-center gap-1 text-muted-foreground">
                查看全部
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentEarnings.length > 0 ? (
              <div className="space-y-4">
                {recentEarnings.map((earning) => (
                  <div key={earning.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{earning.materialTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {earning.buyerName} 购买 · {formatDate(earning.createdAt)}
                      </p>
                    </div>
                    <span className="font-semibold text-green-600 shrink-0 ml-4">
                      +{formatPrice(earning.netAmount)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无收益记录
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">最近订单</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/orders" className="flex items-center gap-1 text-muted-foreground">
                查看全部
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{order.materialTitle}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className="font-semibold shrink-0">{formatPrice(order.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无订单记录
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">快捷操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/upload">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors text-center">
                <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">上传资料</span>
              </div>
            </Link>
            <Link href="/dashboard/earnings">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-colors text-center">
                <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-2">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">申请提现</span>
              </div>
            </Link>
            <Link href="/materials">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors text-center">
                <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">浏览资料</span>
              </div>
            </Link>
            <Link href="/dashboard/settings">
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors text-center">
                <div className="h-10 w-10 mx-auto rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">数据统计</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
