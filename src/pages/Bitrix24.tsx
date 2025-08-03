import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  Download, 
  ExternalLink,
  RefreshCw,
  FileText,
  User,
  Calendar
} from "lucide-react";

const integrationStats = {
  totalSent: 156,
  processed: 149,
  pending: 4,
  failed: 3,
  successRate: 95.5,
  avgProcessingTime: 3.2
};

const recentTransfers = [
  {
    id: "TND-2024-001",
    tenderTitle: "Поставка насосного оборудования Grundfos",
    bitrixId: "CRM-45231",
    status: "processed",
    sentAt: "2024-01-15 14:30",
    processedAt: "2024-01-15 14:33",
    responsible: "Иванов А.В.",
    amount: "2,450,000 ₽"
  },
  {
    id: "TND-2024-002", 
    tenderTitle: "Техническое обслуживание компрессоров Borsig",
    bitrixId: "CRM-45232",
    status: "pending",
    sentAt: "2024-01-15 15:45",
    processedAt: null,
    responsible: "Петров В.И.",
    amount: "890,000 ₽"
  },
  {
    id: "TND-2024-003",
    tenderTitle: "Поставка торцевых уплотнений BURGMANN",
    bitrixId: "CRM-45233", 
    status: "processed",
    sentAt: "2024-01-15 16:20",
    processedAt: "2024-01-15 16:22",
    responsible: "Сидорова М.П.",
    amount: "1,200,000 ₽"
  },
  {
    id: "TND-2024-004",
    tenderTitle: "Ремонт электродвигателей Siemens",
    bitrixId: null,
    status: "failed",
    sentAt: "2024-01-15 17:10",
    processedAt: null,
    responsible: "Козлов Д.А.",
    amount: "450,000 ₽"
  }
];

export default function Bitrix24() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processed':
        return 'Обработано';
      case 'pending':
        return 'В обработке';
      case 'failed':
        return 'Ошибка';
      default:
        return 'Неизвестно';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'processed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Интеграция Bitrix24</h1>
        <p className="text-muted-foreground">
          Мониторинг передачи данных и статус обработки в CRM
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отправлено всего</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrationStats.totalSent}</div>
            <p className="text-xs text-muted-foreground">
              За последние 30 дней
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Обработано</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{integrationStats.processed}</div>
            <p className="text-xs text-muted-foreground">
              Успешно в CRM
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">В очереди</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{integrationStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Ожидают обработки
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Успешность</CardTitle>
            <RefreshCw className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrationStats.successRate}%</div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={integrationStats.successRate} className="flex-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transfers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Последние передачи</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Обновить
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransfers.map((transfer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(transfer.status)}
                  <div className="space-y-1">
                    <div className="font-medium">{transfer.tenderTitle}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {transfer.id}
                      </span>
                      {transfer.bitrixId && (
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          {transfer.bitrixId}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {transfer.responsible}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{transfer.amount}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {transfer.sentAt}
                    </div>
                  </div>
                  
                  <Badge variant={getStatusVariant(transfer.status)}>
                    {getStatusText(transfer.status)}
                  </Badge>

                  {transfer.status === 'processed' && transfer.bitrixId && (
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Производительность интеграции</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Среднее время обработки</span>
              <span className="font-bold">{integrationStats.avgProcessingTime} мин</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Доступность API</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="font-bold">99.8%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Последняя синхронизация</span>
              <span className="text-sm text-muted-foreground">2 минуты назад</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки интеграции</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Автоматическая отправка</span>
              <Badge variant="default">Включено</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Retry при ошибках</span>
              <Badge variant="default">3 попытки</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Webhook уведомления</span>
              <Badge variant="default">Активны</Badge>
            </div>
            
            <Button variant="outline" className="w-full">
              Настроить интеграцию
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}