"use client";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockFeedback = [
  { id: "1", date: "2026-01-01", name: "Heitor", suggestion: "Eu quero fazer um pacto com você.", type: "suggestion" },
  { id: "2", date: "2026-01-02", name: "Aquiles", suggestion: "Não há pactos entre leões e homens.", type: "feedback" },
  { id: "3", date: "2026-01-03", name: "", suggestion: "No meio do caminho tinha uma pedra", type: "feedback" },
];

export default function FeedbackPage() {
  return (
    <main className="min-h-screen flex justify-center items-start bg-muted/40 py-10 px-4">
      <Card className="w-full max-w-5xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Feedbacks e Sugestões
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>
              Lista de feedbacks e sugestões enviados pelos colaboradores
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Data</TableHead>
                <TableHead className="w-[180px]">Nome</TableHead>
                <TableHead>Conteúdo</TableHead>
                <TableHead className="w-[120px] text-center">Tipo</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockFeedback.map((feedback) => (
                <TableRow
                  key={feedback.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(feedback.date).toLocaleDateString("pt-BR")}
                  </TableCell>

                  <TableCell>
                    {feedback.name ? (
                      feedback.name
                    ) : (
                      <span className="italic text-muted-foreground">
                        Anônimo
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="max-w-[400px] truncate">
                    {feedback.suggestion}
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      variant={
                        feedback.type === "suggestion" ? "default" : "secondary"
                      }
                    >
                      {feedback.type === "suggestion" ? "Sugestão" : "Feedback"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
