interface CodeViewerProps {
    content: string | null;
  }
  
  export function CodeViewer({ content }: CodeViewerProps) {
    if (!content) return null;
  
    return (
      <div className="mt-6">
        <h3 className="font-semibold mb-2">File Content:</h3>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          {content}
        </pre>
      </div>
    );
  }