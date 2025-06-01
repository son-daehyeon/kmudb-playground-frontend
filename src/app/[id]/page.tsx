'use client';

import { use, useCallback, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import BottomPannel from '@/app/[id]/_component/BottomPannel';
import LeftPanel from '@/app/[id]/_component/LeftPanel';
import RightPanel from '@/app/[id]/_component/RightPanel';

import Api from '@/api';
import { ProblemDetailResponse, QueryResponse } from '@/api/dto';
import { LoadingPage } from '@/component/loading';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/component/ui/resizable';
import { useApi } from '@/hook/use-api';
import { useProblemsStore } from '@/store/problems.store';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id: problemId } = use(params);

  const pathname = usePathname();

  const { problems, setProblems } = useProblemsStore();

  const [isProblemFetching, startProblemFetching] = useApi();
  const [isQueryExecuting, startQueryExecuting] = useApi();
  const [isQuerySubmitting, startQuerySubmitting] = useApi();

  const [problem, setProblem] = useState<ProblemDetailResponse>();
  const [queryResponse, setQueryResponse] = useState<QueryResponse>();
  const [queryError, setQueryError] = useState<string>();

  const handleExecuteQuery = useCallback((query: string) => {
    setQueryResponse(undefined);
    setQueryError(undefined);
    startQueryExecuting(async () => {
      try {
        const response = await Api.Domain.Execute.executeQuery({ query });
        setQueryResponse(response);
      } catch (error) {
        setQueryError((error as Error).message);
      }
    }, false);
  }, []);

  const handleSubmitQuery = useCallback(
    (query: string) => {
      if (!problem) return;

      setQueryResponse(undefined);
      setQueryError(undefined);

      startQuerySubmitting(async () => {
        try {
          const { correct } = await Api.Domain.Problem.submit(problem.id, { query });
          if (!correct) {
            setQueryError('틀렸습니다.');
            return;
          }

          setQueryError('정답입니다!');

          setProblem({
            ...problem,
            solved: true,
          });

          setProblems({
            problems: problems!.problems.map((p) =>
              p.id === problem.id ? { ...p, solved: true } : p,
            ),
          });
        } catch (error) {
          setQueryError((error as Error).message);
        }
      }, false);
    },
    [problem, problems, setProblems],
  );

  useEffect(() => {
    if (pathname === '/playground') return;
    startProblemFetching(async () => {
      const response = await Api.Domain.Problem.getProblem(problemId);
      setProblem(response);
    });
  }, [pathname]);

  if (isProblemFetching)
    return (
      <div className="w-full">
        <LoadingPage />
      </div>
    );

  return (
    <ResizablePanelGroup direction="horizontal" className="max-h-screen">
      <ResizablePanel defaultSize={35}>
        <LeftPanel problem={problem} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <RightPanel
              problem={problem}
              handleExecuteQuery={handleExecuteQuery}
              handleSubmitQuery={handleSubmitQuery}
              isQueryExecuting={isQueryExecuting}
              isQuerySubmitting={isQuerySubmitting}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <BottomPannel
              isQueryExecuting={isQueryExecuting}
              queryResponse={queryResponse}
              queryError={queryError}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
