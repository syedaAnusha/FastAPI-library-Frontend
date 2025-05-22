import BookDetails from "@/components/BookDetails";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <ErrorBoundary fallback={<p>Error while fetching book details</p>}>
      <BookDetails id={id} />
    </ErrorBoundary>
  );
}
