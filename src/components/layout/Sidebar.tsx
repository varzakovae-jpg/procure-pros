import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Settings, 
  Database, 
  Search, 
  Building2, 
  TrendingUp,
  FileText,
  BarChart3,
  List,
  Crown
} from "lucide-react";

const navigation = [
  { name: "Входящая лента", href: "/", icon: List },
  { name: "Дашборд KPI", href: "/dashboard", icon: BarChart3 },
  { name: "Генерация КП", href: "/proposals", icon: FileText },
  { name: "Аналитика", href: "/analytics", icon: TrendingUp },
];

const adminNavigation = [
  { name: "Площадки", href: "/admin/platforms", icon: Database },
  { name: "Ключевые слова", href: "/admin/keywords", icon: Search },
  { name: "Отрасли", href: "/admin/industries", icon: Building2 },
  { name: "Пресеты поиска", href: "/admin/presets", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2">
          <Crown className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Tender Platform</h1>
            <p className="text-xs text-muted-foreground">Система управления тендерами</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="pt-4">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Администрирование
            </h3>
          </div>
          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}