import { useEffect, useState } from 'react';

import { cn } from '@/lib/util';

import Api from '@/api';
import { ProblemDetailResponse, SchemaResponse } from '@/api/dto';
import SqlTable from '@/component/sql-table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/component/ui/accordion';
import { Badge } from '@/component/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/component/ui/table';
import { Check } from 'lucide-react';

interface Props {
  problem?: ProblemDetailResponse;
}

export default function LeftPanel({ problem }: Props) {
  const [schema, setSchema] = useState<SchemaResponse>();

  useEffect(() => {
    (async () => {
      const response = await Api.Domain.Schema.getSchema();
      setSchema(response);
    })();
  }, []);

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      {problem && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
              <h1 className="text-xl font-semibold">{problem?.id}번 문제</h1>
              {problem?.solved && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  <Check />
                  성공
                </Badge>
              )}
            </div>
            <p className="whitespace-pre-line">{problem?.description}</p>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">예시 결과 데이터</h2>
            <SqlTable data={problem?.example} />
          </div>
          <hr />
        </>
      )}
      {schema && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">스키마</h2>
          <Accordion type="multiple">
            {Object.entries(schema.schema).map(([tableName, columns]) =>
              renderTableSchema(tableName, columns as TableColumn[], schema),
            )}
          </Accordion>
        </div>
      )}
    </section>
  );
}

interface TableColumn {
  column_name: string;
  data_type: string;
}

export function renderTableSchema(
  tableName: string,
  columns: TableColumn[],
  schema: SchemaResponse,
) {
  const outgoingRelations = schema?.relations.filter((rel) => rel.table_name === tableName) ?? [];

  const pkList = schema?.primary_keys?.[tableName] ?? [];

  function isPK(col: TableColumn) {
    return pkList.includes(col.column_name);
  }

  function isFK(col: TableColumn) {
    return outgoingRelations.some((r) => r.column_name === col.column_name);
  }

  function getColumnType(col: TableColumn) {
    const rel = outgoingRelations.find((r) => r.column_name === col.column_name);
    if (rel) {
      return `${col.data_type} (${rel.referenced_table_name}.${rel.referenced_column_name})`;
    }
    return col.data_type;
  }

  return (
    <AccordionItem key={tableName} value={tableName}>
      <AccordionTrigger>{tableName}</AccordionTrigger>
      <AccordionContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>컬럼명</TableHead>
              <TableHead>타입</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {columns.map((col) => (
              <TableRow key={col.column_name}>
                <TableCell className={cn(isPK(col) && 'font-bold', isFK(col) && 'underline')}>
                  {col.column_name}
                </TableCell>
                <TableCell>{getColumnType(col)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
}
