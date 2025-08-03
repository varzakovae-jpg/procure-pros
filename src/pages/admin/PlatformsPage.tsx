import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlatformConfig } from "@/types/tender";
import { Plus, Search, Settings, Play, Edit, Trash2, Globe, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockPlatforms: PlatformConfig[] = [
  {
    id: "1",
    name: "ЭТП ГПБ",
    slug: "etpgpb",
    base_url: "https://etpgpb.ru",
    country: "RU",
    enabled: true,
    auth: { required: false, type: "form" },
    anti_bot: {
      strategy_order: ["stealth", "ocr"],
      rate_limit_rps: 0.5,
      retry_policy: { max: 3, backoff: "exponential", jitter: true }
    },
    schedule: { cron: "*/30 * * * *" },
    search_mapping: {},
    request: {
      method: "GET",
      pagination: { param: "page", start: 1, step: 1, max: 100 },
      headers: {},
      cookies: {},
      timeout_sec: 30
    },
    result_selectors: {
      item: ".tender-item",
      title: ".title",
      url: ".title a @href",
      publish_date: ".date",
      deadline: ".deadline",
      budget_amount: ".budget",
      region: ".region",
      buyer: ".buyer",
      attachments: []
    },
    export_support: {
      excel: { enabled: true, download_url: "/export.xls", needs_clicks: true },
      rss: { enabled: false }
    },
    qa: { shadow_check: true },
    version: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Сбербанк АСТ",
    slug: "sberbank-ast",
    base_url: "https://utp.sberbank-ast.ru",
    country: "RU",
    enabled: true,
    auth: { required: true, type: "oauth" },
    anti_bot: {
      strategy_order: ["stealth"],
      rate_limit_rps: 1.0,
      retry_policy: { max: 5, backoff: "exponential", jitter: true }
    },
    schedule: { cron: "0 */2 * * *" },
    search_mapping: {},
    request: {
      method: "POST",
      pagination: { param: "page", start: 0, step: 1, max: 50 },
      headers: {},
      cookies: {},
      timeout_sec: 45
    },
    result_selectors: {
      item: ".purchase-item",
      title: "h3",
      url: "a @href",
      publish_date: ".pub-date",
      deadline: ".end-date",
      budget_amount: ".price",
      region: ".region",
      buyer: ".customer",
      attachments: []
    },
    export_support: {
      excel: { enabled: false, download_url: "", needs_clicks: false },
      rss: { enabled: true }
    },
    qa: { shadow_check: false },
    version: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-16T14:30:00Z"
  }
];

export default function PlatformsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [platforms] = useState<PlatformConfig[]>(mockPlatforms);

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.base_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestRun = (platform: PlatformConfig) => {
    console.log("Running test for platform:", platform.name);
    // Implement test run logic
  };

  const handleEdit = (platform: PlatformConfig) => {
    console.log("Editing platform:", platform.name);
    // Navigate to edit form
  };

  const handleDelete = (platform: PlatformConfig) => {
    console.log("Deleting platform:", platform.name);
    // Implement delete logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Площадки для парсинга</h1>
          <p className="text-muted-foreground">
            Управление конфигурацией тендерных площадок
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить площадку
        </Button>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего площадок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Активных
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {platforms.filter(p => p.enabled).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Требуют авторизации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {platforms.filter(p => p.auth.required).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              С экспортом Excel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {platforms.filter(p => p.export_support.excel.enabled).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск площадок..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Platforms table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Площадка</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Авторизация</TableHead>
              <TableHead>Расписание</TableHead>
              <TableHead>Экспорт</TableHead>
              <TableHead>Версия</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlatforms.map((platform) => (
              <TableRow key={platform.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {platform.base_url}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={platform.enabled ? "default" : "secondary"}>
                    {platform.enabled ? "Активна" : "Отключена"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={platform.auth.required ? "destructive" : "secondary"}
                  >
                    {platform.auth.required ? platform.auth.type : "Не требуется"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3" />
                    {platform.schedule.cron}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {platform.export_support.excel.enabled && (
                      <Badge variant="outline" className="text-xs">Excel</Badge>
                    )}
                    {platform.export_support.rss.enabled && (
                      <Badge variant="outline" className="text-xs">RSS</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">v{platform.version}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestRun(platform)}
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(platform)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(platform)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Площадки не найдены
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Попробуйте изменить критерии поиска
          </p>
        </div>
      )}
    </div>
  );
}