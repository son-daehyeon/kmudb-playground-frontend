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
            <h2 className="text-lg font-semibold">예시 결과 데이터 <span className="text-sm font-normal text-neutral-500">({problem?.example.columns.length}개 컬럼)</span></h2>
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
  column_type: string;
  is_nullable: boolean;
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

  function getRelationInfo(col: TableColumn) {
    const rel = outgoingRelations.find((r) => r.column_name === col.column_name);
    if (rel) {
      return `${rel.referenced_table_name}.${rel.referenced_column_name}`;
    }
    return null;
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
              <TableHead>관계</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {columns.map((col) => {
              const relationInfo = getRelationInfo(col);

              return (
                <TableRow key={col.column_name}>
                  <TableCell
                    className={cn(
                      isPK(col) && 'font-bold text-blue-600',
                      isFK(col) && 'text-green-600 underline',
                    )}
                  >
                    {col.column_name}
                    {isPK(col) && <span className="ml-1 text-xs text-blue-500">PK</span>}
                    {isFK(col) && <span className="ml-1 text-xs text-green-500">FK</span>}
                  </TableCell>
                  <TableCell>
                    <span className={cn(col.is_nullable && 'text-gray-500')}>
                      {col.column_type}
                    </span>
                    {col.is_nullable && (
                      <span className="ml-2 rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-400">
                        nullable
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {relationInfo && (
                      <span className="text-sm text-purple-600 italic">→ {relationInfo}</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
}
