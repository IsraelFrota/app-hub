"use client";

import { useState, useEffect } from "react";

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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare } from "lucide-react";

type Comment = {
  _id: string;
  author: string;
  text: string;
  date: string;
};

type FeedbackData = {
  _id: string;
  date: string;
  name: string;
  suggestion: string;
  type: "suggestion" | "feedback";
  vote: number;
  comments: Comment[];
};

function hasVoted(id: string) {
  const voted = JSON.parse(localStorage.getItem("votedSuggestions") || "[]");
  return voted.includes(id);
}

function markAsVoted(id: string) {
  const voted = JSON.parse(localStorage.getItem("votedSuggestions") || "[]");
  localStorage.setItem("votedSuggestions", JSON.stringify([...voted, id]));
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackData | null>(null);

  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  async function fetchAllData() {
    try {
      setLoading(true);
      const response = await fetch("/api/mongo");
      if (!response.ok) {
        toast.error("Erro ao buscar os dados");
        return;
      }

      const { data } = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar os dados");
    } finally {
      setLoading(false);
    }
  }

  async function vote(id: string) {
    if (hasVoted(id)) return;

    try {
      const response = await fetch("/api/suggestion", {
        method: "PATCH",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        toast.error("Erro ao registrar voto");
        return;
      }

      setFeedbacks((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, vote: item.vote + 1 } : item
        )
      );

      markAsVoted(id);
      toast.success("Voto computado com sucesso!");
    } catch {
      toast.error("Erro ao registrar voto");
    }
  }

  async function addComment(id: string) {
    if (!newComment.trim()) return;
    console.log(selectedFeedback);
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestionId: id,
          text: newComment,
          author: author,
        }),
      });

      if (!response.ok) {
        toast.error("Erro ao adicionar comentário");
        return;
      }

      const { comment } = await response.json();

      setFeedbacks((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, comments: [...item.comments, comment] }
            : item
        )
      );

      setSelectedFeedback((prev) =>
        prev ? { ...prev, comments: [...prev.comments, comment] } : prev
      );

      setNewComment("");
      toast.success("Comentário adicionado!");
    } catch {
      toast.error("Erro ao adicionar comentário");
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
          {!loading && (
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
                  <TableHead className="w-[160px] text-center">
                    Votação / Comentários
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow
                    key={feedback._id}
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

                    <TableCell className="max-w-[400px] break-words whitespace-normal">
                      {feedback.suggestion}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant={
                          feedback.type === "suggestion"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {feedback.type === "suggestion"
                          ? "Sugestão"
                          : "Feedback"}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        disabled={hasVoted(feedback._id)}
                        onClick={() => vote(feedback._id)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp size={16} />
                        {feedback.vote}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedFeedback(feedback)}
                        className="flex items-center gap-1"
                      >
                        <MessageSquare size={16} />
                        {feedback.comments.length}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedFeedback}
        onOpenChange={() => {setAuthor(""); setSelectedFeedback(null)}}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Comentários da Sugestão</DialogTitle>
          </DialogHeader>

          {selectedFeedback && (
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-muted text-sm">
                {selectedFeedback.suggestion}
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {selectedFeedback.comments.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nenhum comentário ainda.
                  </p>
                )}

                {selectedFeedback.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-3 rounded-md border text-sm"
                  >
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{comment.author || "Anônimo"}</span>
                      <span>
                        {new Date(comment.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t">
                <div className="flex flex-col gap-2">
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    placeholder="Seu nome (opcional)"
                  />
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    placeholder="Escreva um comentário..."
                  />
                </div>
                <Button
                  size="sm"
                  onClick={() => addComment(selectedFeedback._id)}
                >
                  Comentar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
