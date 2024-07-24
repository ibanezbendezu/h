import { CodeViewer } from "@/components/code-viewer";
import { Skeleton } from "@/components/ui/skeleton";

export const Code = (fileData: any, language: any) => {    
    return (
        <div className="w-full">
            <CodeViewer
                code={fileData.content}
                highlightRange={{
                    start: fileData.startRow,
                    end: fileData.endRow
                }}
                language={language} color="bg-muted-foreground"/>
        </div>
    );
}

Code.Skeleton = function CodeSkeleton() {
    return <Skeleton className="w-full" />;
};