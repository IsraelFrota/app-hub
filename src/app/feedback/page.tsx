"use client";

import {
	useState,
	useEffect,
} from "react";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";

import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
} from "@/components/ui/card";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type FeedbackData = {
	id: string;
	date: string;
	name: string;
	suggestion: string;
	type: "suggestion" | "feedback";
}

export default function FeedbackPage() {
	const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
	const [loading, setLoading] = useState(false);

	async function fetchAllData() {
		try {
			setLoading(true);
			const response = await fetch("/api/mongo", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				toast.error("Erro ao buscar os dados");
				return;
			}

			const { data } = await response.json();

			setFeedbacks(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchAllData();
	}, []);

  return (
    <main className="min-h-screen flex justify-center items-start bg-muted/40 py-10 px-4">
      <Card className="w-full max-w-5xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Feedbacks e Sugestões
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!loading && <Table>
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
              {feedbacks.map((feedback) => (
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
          </Table>}
        </CardContent>
      </Card>
    </main>
  );
}
