import { QueryResponse } from '@/api/dto';
import { Spinner } from '@/component/loading';
import SqlTable from '@/component/sql-table';

interface Props {
  isQueryExecuting: boolean;
  queryResponse?: QueryResponse;
  queryError?: string;
}

export default function BottomPannel({ isQueryExecuting, queryError, queryResponse }: Props) {
  if (isQueryExecuting)
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <Spinner />
      </div>
    );

  if (queryError && queryError === '정답입니다!')
    return <p className="p-4 text-green-500">{queryError}</p>;

  if (queryError) return <p className="p-4 text-red-500">{queryError}</p>;

  return (
    <section className="h-full overflow-y-auto p-4">
      <SqlTable data={queryResponse} />
    </section>
  );
}
