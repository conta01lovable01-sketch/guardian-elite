import { useState } from 'react';
import { FolderOpen, File, Image, Film, Music, FileText, ChevronRight, ChevronDown, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { remoteFiles, RemoteFile } from '@/data/newMockData';

const typeIcons: Record<string, React.ReactNode> = {
  folder: <FolderOpen className="h-4 w-4 text-primary" />,
  image: <Image className="h-4 w-4 text-blue-400" />,
  video: <Film className="h-4 w-4 text-purple-400" />,
  audio: <Music className="h-4 w-4 text-green-400" />,
  document: <FileText className="h-4 w-4 text-yellow-400" />,
};

const FileNode = ({ file, depth = 0 }: { file: RemoteFile; depth?: number }) => {
  const [expanded, setExpanded] = useState(depth === 0);

  return (
    <div>
      <motion.button
        whileHover={{ backgroundColor: 'hsl(213 60% 18% / 0.5)' }}
        onClick={() => file.type === 'folder' && setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {file.type === 'folder' ? (
          expanded ? <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" /> : <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
        ) : (
          <span className="w-3" />
        )}
        {typeIcons[file.type]}
        <span className="text-sm text-foreground flex-1 truncate">{file.name}</span>
        {file.size && <span className="text-xs text-muted-foreground shrink-0">{file.size}</span>}
        <span className="text-xs text-muted-foreground shrink-0 ml-2">{file.modified}</span>
      </motion.button>
      <AnimatePresence>
        {expanded && file.children && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {file.children.map((child) => (
              <FileNode key={child.id} file={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FileExplorerPage = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <HardDrive className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Explorador de Arquivos Remoto</h1>
      </div>
      <p className="text-sm text-muted-foreground">Navegação remota nos diretórios do dispositivo monitorado</p>

      <div className="card-premium rounded-xl p-2">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border text-xs text-muted-foreground">
          <File className="h-3 w-3" />
          <span>/storage/emulated/0</span>
        </div>
        <ScrollArea className="h-[calc(100vh-280px)]">
          {remoteFiles.map((file) => (
            <FileNode key={file.id} file={file} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default FileExplorerPage;
