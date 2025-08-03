import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeywordSet } from "@/types/tender";
import { Plus, Search, Edit, Trash2, TestTube, Copy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Используем предоставленные ключевые слова
const mockKeywordSets: KeywordSet[] = [
  {
    id: "1",
    name: "Насосное оборудование",
    include: ["компрессор", "насос", "торцевое уплотнение", "электродвигатель", "ротор", "картридж насоса"],
    exclude: ["ремонт", "монтаж", "строительство"],
    brands: ["Grundfos", "KSB", "Wilo", "FLOWSERVE", "ITT GOULDS PUMPS", "Sulzer"],
    okpd2: ["28.13", "28.12"],
    industry_ids: ["ind1"],
    match: {
      mode: "boolean",
      lemmatize: true,
      phrase_support: true,
      regex: false
    },
    weights: {
      title: 2.0,
      description: 1.0,
      attachments: 0.5
    },
    version: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2", 
    name: "Сервис и ТО",
    include: ["сервисное обслуживание", "техническая инспекция", "обратный инжиниринг", "разработка РКД", "3D сканирование", "технический аудит", "техническое обслуживание", "ШМР", "ПНР", "запасные части", "ЗИП", "вибромониторинг"],
    exclude: ["строительство", "демонтаж"],
    brands: ["JOHN CRANE", "BURGMANN", "Eagle Burgmann", "A&Seal"],
    okpd2: ["33.12", "33.13"],
    industry_ids: ["ind2"],
    match: {
      mode: "boolean",
      lemmatize: true,
      phrase_support: true,
      regex: false
    },
    weights: {
      title: 2.0,
      description: 1.0,
      attachments: 0.5
    },
    version: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-16T14:30:00Z"
  },
  {
    id: "3",
    name: "Комплексная поставка",
    include: ["пропановая установка", "пропиленования установка", "станция топливного газа", "холодильная установка", "дожимная станция", "сетевой насос", "гидромодуль", "установка подготовки газа", "аммиакохранилище"],
    exclude: ["ремонт", "обслуживание"],
    brands: ["MAN", "Siemens", "ABB", "Schneider Electric"],
    okpd2: ["28.11", "28.21"],
    industry_ids: ["ind3"],
    match: {
      mode: "boolean",
      lemmatize: true,
      phrase_support: true,
      regex: false
    },
    weights: {
      title: 2.0,
      description: 1.0,
      attachments: 0.5
    },
    version: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-17T09:45:00Z"
  }
];

export default function KeywordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [keywordSets] = useState<KeywordSet[]>(mockKeywordSets);

  const filteredKeywordSets = keywordSets.filter(set =>
    set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.include.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
    set.brands.some(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTestCorpus = (keywordSet: KeywordSet) => {
    console.log("Testing corpus for keyword set:", keywordSet.name);
    // Implement corpus testing logic
  };

  const handleEdit = (keywordSet: KeywordSet) => {
    console.log("Editing keyword set:", keywordSet.name);
    // Navigate to edit form
  };

  const handleDuplicate = (keywordSet: KeywordSet) => {
    console.log("Duplicating keyword set:", keywordSet.name);
    // Implement duplicate logic
  };

  const handleDelete = (keywordSet: KeywordSet) => {
    console.log("Deleting keyword set:", keywordSet.name);
    // Implement delete logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ключевые слова</h1>
          <p className="text-muted-foreground">
            Управление наборами ключевых слов для фильтрации тендеров
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить набор
        </Button>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего наборов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keywordSets.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ключевых слов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {keywordSets.reduce((acc, set) => acc + set.include.length, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Брендов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {keywordSets.reduce((acc, set) => acc + set.brands.length, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Исключений
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {keywordSets.reduce((acc, set) => acc + set.exclude.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию, словам или брендам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Keyword sets table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название набора</TableHead>
              <TableHead>Ключевые слова</TableHead>
              <TableHead>Бренды</TableHead>
              <TableHead>Исключения</TableHead>
              <TableHead>ОКПД2</TableHead>
              <TableHead>Версия</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKeywordSets.map((keywordSet) => (
              <TableRow key={keywordSet.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{keywordSet.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {keywordSet.match.mode} | 
                      {keywordSet.match.lemmatize ? " лемматизация" : ""} |
                      {keywordSet.match.phrase_support ? " фразы" : ""}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-md">
                    {keywordSet.include.slice(0, 3).map((keyword, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {keywordSet.include.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{keywordSet.include.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-md">
                    {keywordSet.brands.slice(0, 2).map((brand, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {brand}
                      </Badge>
                    ))}
                    {keywordSet.brands.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{keywordSet.brands.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-md">
                    {keywordSet.exclude.slice(0, 2).map((keyword, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {keywordSet.exclude.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{keywordSet.exclude.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {keywordSet.okpd2.map((code, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {code}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">v{keywordSet.version}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestCorpus(keywordSet)}
                      title="Проверить на корпусе"
                    >
                      <TestTube className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicate(keywordSet)}
                      title="Дублировать"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(keywordSet)}
                      title="Редактировать"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(keywordSet)}
                      title="Удалить"
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

      {filteredKeywordSets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Наборы ключевых слов не найдены
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Попробуйте изменить критерии поиска
          </p>
        </div>
      )}
    </div>
  );
}