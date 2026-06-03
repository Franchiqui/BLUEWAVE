import ToolPage from '@/components/ide/ToolPage';

export default function DynamicToolPage({ params }: { params: { tool: string } }) {
  return <ToolPage tool={params.tool} />;
}