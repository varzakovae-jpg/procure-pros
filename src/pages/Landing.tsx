import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Zap, 
  Shield, 
  TrendingUp,
  Bot,
  FileText,
  Clock,
  BarChart3
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Target,
      title: "Точная фильтрация",
      description: "ИИ анализирует тендеры с точностью >70%",
      metric: "73%",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Быстрая обработка",
      description: "Первичная обработка за 25 минут",
      metric: "25 мин",
      color: "text-warning"
    },
    {
      icon: Bot,
      title: "Автогенерация КП",
      description: "87% предложений создается автоматически",
      metric: "87%",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Надежность",
      description: "SLA uptime 99.8%",
      metric: "99.8%",
      color: "text-destructive"
    }
  ];

  const platforms = [
    "ЭТП ГПБ", "Сбербанк АСТ", "РТС-Тендер", "B2B-Center", 
    "Росэлторг", "Газпром", "Роснефть", "ЛУКОЙЛ"
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/lovable-uploads/5192a20b-0839-451b-a9c4-4876f373ddfe.png" 
              alt="ITR Solutions" 
              className="h-16 w-16" 
            />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Tender Platform ITR Solutions
              </h1>
              <p className="text-xl text-muted-foreground">
                Автоматизация тендерных процессов с использованием ИИ
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge variant="default" className="text-sm px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Увеличение эффективности на 300%
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Экономия 40+ часов в неделю
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <BarChart3 className="h-4 w-4 mr-2" />
              ROI 250% за первый год
            </Badge>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Начать работу
            </Button>
            <Button variant="outline" size="lg">
              Демо версия
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                <div className={`text-2xl font-bold ${feature.color}`}>
                  {feature.metric}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Интеграции и площадки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Поддерживаемые площадки</h3>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform, index) => (
                  <Badge key={index} variant="secondary" className="justify-center">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Готовые интеграции</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span>Bitrix24 CRM</span>
                  <Badge variant="outline" className="text-xs">99.5% uptime</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span>Email уведомления</span>
                  <Badge variant="outline" className="text-xs">SMTP/IMAP</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span>Telegram боты</span>
                  <Badge variant="outline" className="text-xs">Real-time</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span>API для внешних систем</span>
                  <Badge variant="outline" className="text-xs">OpenAPI 3.0</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">1,247</div>
            <p className="text-muted-foreground">Тендеров обработано за неделю</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-success mb-2">186</div>
            <p className="text-muted-foreground">Релевантных отобрано ИИ</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-warning mb-2">23</div>
            <p className="text-muted-foreground">Коммерческих предложений создано</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}