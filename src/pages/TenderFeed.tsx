import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TenderCard } from "@/components/tender/TenderCard";
import { Tender } from "@/types/tender";
import { Search, Filter, RefreshCw, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockTenders: Tender[] = [
  {
    id: "1",
    external_id: "EX001",
    source_name: "ЭТП ГПБ",
    title: "Поставка насосного оборудования для нефтеперерабатывающего завода",
    description: "Требуется поставка центробежных насосов производительностью 100-500 м³/ч для технологических процессов НПЗ. Оборудование должно соответствовать требованиям промышленной безопасности и иметь необходимые сертификаты.",
    publish_date: "2024-01-15",
    deadline: "2024-02-15T23:59:00",
    budget: { amount: 5500000, currency: "RUB" },
    region: "Московская область",
    cpv_okpd: ["28.13.13"],
    attachments: [
      { name: "Техническое задание.pdf", url: "#" },
      { name: "Спецификация.xlsx", url: "#" }
    ],
    raw_url: "https://etpgpb.ru/tender/123456",
    hash: "abc123",
    status: "fits",
    ai_score: 0.87,
    tags: ["насос", "центробежный", "НПЗ"],
    created_at: "2024-01-15T10:00:00",
    updated_at: "2024-01-15T10:00:00"
  },
  {
    id: "2",
    external_id: "EX002",
    source_name: "Сбербанк АСТ",
    title: "Техническое обслуживание компрессорного оборудования",
    description: "Проведение планового технического обслуживания винтовых компрессоров Atlas Copco мощностью 200 кВт. Включает замену фильтров, масла, контроль параметров работы.",
    publish_date: "2024-01-16",
    deadline: "2024-02-20T18:00:00",
    budget: { amount: 850000, currency: "RUB" },
    region: "Санкт-Петербург",
    cpv_okpd: ["28.12.21"],
    attachments: [
      { name: "Регламент ТО.pdf", url: "#" }
    ],
    raw_url: "https://utp.sberbank-ast.ru/tender/789012",
    hash: "def456",
    status: "analyzing",
    ai_score: 0.72,
    tags: ["компрессор", "техобслуживание", "Atlas Copco"],
    created_at: "2024-01-16T09:30:00",
    updated_at: "2024-01-16T09:30:00"
  },
  {
    id: "3",
    external_id: "EX003",
    source_name: "РТС-Тендер",
    title: "Поставка торцевых уплотнений для промышленных насосов",
    description: "Требуется поставка торцевых уплотнений типа BURGMANN M74-D для центробежных насосов KSB. Уплотнения должны быть рассчитаны на давление до 16 бар и температуру до 120°C.",
    publish_date: "2024-01-17",
    deadline: "2024-03-01T12:00:00",
    budget: { amount: 2300000, currency: "RUB" },
    region: "Республика Татарстан",
    cpv_okpd: ["28.14.11"],
    attachments: [
      { name: "Спецификация уплотнений.pdf", url: "#" },
      { name: "Чертежи.dwg", url: "#" }
    ],
    raw_url: "https://rts-tender.ru/tender/345678",
    hash: "ghi789",
    status: "fits",
    ai_score: 0.95,
    tags: ["торцевое уплотнение", "BURGMANN", "KSB"],
    created_at: "2024-01-17T14:15:00",
    updated_at: "2024-01-17T14:15:00"
  }
];

export default function TenderFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  const filteredTenders = mockTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === "all" || tender.status === selectedStatus;
    const matchesSource = selectedSource === "all" || tender.source_name === selectedSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleViewDetails = (tender: Tender) => {
    console.log("Viewing details for tender:", tender.id);
    // Navigate to tender details page
  };

  const handleGenerateProposal = (tender: Tender) => {
    console.log("Generating proposal for tender:", tender.id);
    // Navigate to proposal generation
  };

  const statusCounts = {
    all: mockTenders.length,
    new: mockTenders.filter(t => t.status === 'new').length,
    fits: mockTenders.filter(t => t.status === 'fits').length,
    analyzing: mockTenders.filter(t => t.status === 'analyzing').length,
    rejected: mockTenders.filter(t => t.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Входящая лента тендеров</h1>
          <p className="text-muted-foreground">
            Найдено {filteredTenders.length} тендеров из {mockTenders.length}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Badge 
            key={status}
            variant={selectedStatus === status ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedStatus(status)}
          >
            {status === 'all' ? 'Все' : 
             status === 'new' ? 'Новые' :
             status === 'fits' ? 'Подходят' :
             status === 'analyzing' ? 'Анализ' : 'Отклонены'}: {count}
          </Badge>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию, описанию или тегам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Источник" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все источники</SelectItem>
            <SelectItem value="ЭТП ГПБ">ЭТП ГПБ</SelectItem>
            <SelectItem value="Сбербанк АСТ">Сбербанк АСТ</SelectItem>
            <SelectItem value="РТС-Тендер">РТС-Тендер</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
      </div>

      {/* Tender cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTenders.map((tender) => (
          <TenderCard
            key={tender.id}
            tender={tender}
            onViewDetails={handleViewDetails}
            onGenerateProposal={handleGenerateProposal}
          />
        ))}
      </div>

      {filteredTenders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Тендеры не найдены
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Попробуйте изменить критерии поиска или фильтры
          </p>
        </div>
      )}
    </div>
  );
}