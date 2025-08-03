import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tender } from "@/types/tender";
import { Calendar, MapPin, DollarSign, Building, ExternalLink, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface TenderCardProps {
  tender: Tender;
  onViewDetails: (tender: Tender) => void;
  onGenerateProposal: (tender: Tender) => void;
}

const statusConfig = {
  new: { label: "Новый", variant: "secondary" as const },
  analyzing: { label: "Анализ", variant: "outline" as const },
  fits: { label: "Подходит", variant: "default" as const },
  rejected: { label: "Отклонен", variant: "destructive" as const },
  in_work: { label: "В работе", variant: "secondary" as const },
  completed: { label: "Завершен", variant: "outline" as const },
};

export function TenderCard({ tender, onViewDetails, onGenerateProposal }: TenderCardProps) {
  const statusInfo = statusConfig[tender.status];
  
  const formatBudget = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency === 'RUB' ? 'RUB' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const deadlineDistance = formatDistanceToNow(new Date(tender.deadline), {
    addSuffix: true,
    locale: ru
  });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2 line-clamp-2">
              {tender.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{tender.source_name}</span>
              {tender.ai_score && (
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{(tender.ai_score * 100).toFixed(0)}%</span>
                </div>
              )}
            </div>
          </div>
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {formatBudget(tender.budget.amount, tender.budget.currency)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{deadlineDistance}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{tender.region}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <a 
              href={tender.raw_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Источник
            </a>
          </div>
        </div>

        {tender.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tender.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tender.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tender.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {tender.description}
        </p>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(tender)}
            className="flex-1"
          >
            Подробнее
          </Button>
          {tender.status === 'fits' && (
            <Button 
              size="sm" 
              onClick={() => onGenerateProposal(tender)}
              className="flex-1"
            >
              Создать КП
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}