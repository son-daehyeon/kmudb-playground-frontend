import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/ui/table';

interface SqlTableProps {
  data?: Record<string, unknown>[];
}

export default function SqlTable({ data }: SqlTableProps) {
  if (!data || data.length === 0)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-neutral-400">데이터가 없습니다.</p>
      </div>
    );

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className="bg-neutral-100 px-4 py-2 text-center font-semibold text-neutral-700"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx} className="odd:bg-white even:bg-neutral-50 hover:bg-neutral-100">
              {headers.map((header) => (
                <TableCell
                  key={header}
                  className="max-w-[400px] overflow-hidden px-4 py-2 text-center text-ellipsis text-neutral-600"
                >
                  {row[header] === null || row[header] === undefined ? (
                    <span className="text-neutral-400 italic">NULL</span>
                  ) : (
                    <span>{row[header] as string}</span>
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
