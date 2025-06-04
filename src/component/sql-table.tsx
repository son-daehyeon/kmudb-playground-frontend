import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/ui/table';

interface SqlTableProps {
  data?: {
    columns: string[];
    result: never[][];
  };
}

export default function SqlTable({ data }: SqlTableProps) {
  if (!data || !data.result || data.result.length === 0)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-neutral-400">데이터가 없습니다.</p>
      </div>
    );

  const { columns, result } = data;

  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((header, idx) => (
              <TableHead
                key={`${header}-${idx}`}
                className="bg-neutral-100 px-4 py-2 text-center font-semibold text-neutral-700"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((row, rowIdx) => (
            <TableRow key={rowIdx} className="odd:bg-white even:bg-neutral-50 hover:bg-neutral-100">
              {row.map((cell, cellIdx) => (
                <TableCell
                  key={`${rowIdx}-${cellIdx}`}
                  className="max-w-[400px] overflow-hidden px-4 py-2 text-center text-ellipsis text-neutral-600"
                >
                  {cell === null || cell === undefined ? (
                    <span className="text-neutral-400 italic">NULL</span>
                  ) : (
                    <span>{String(cell)}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}