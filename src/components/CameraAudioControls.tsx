import { Camera, Mic, MicOff, CameraOff, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const CameraAudioControls = () => {
  const [listening, setListening] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraMode, setCameraMode] = useState<'front' | 'rear'>('front');

  const toggleListening = () => {
    setListening(!listening);
    toast({
      title: listening ? 'Escuta Ambiente Desativada' : 'Escuta Ambiente Ativada',
      description: listening ? 'O microfone remoto foi desligado.' : 'Capturando áudio ambiente em tempo real.',
    });
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    toast({
      title: cameraActive ? 'Câmera Desativada' : 'Câmera Ativada',
      description: cameraActive ? 'A câmera remota foi desligada.' : `Câmera ${cameraMode === 'front' ? 'frontal' : 'traseira'} ativada.`,
    });
  };

  return (
    <div className="card-premium rounded-xl p-4 space-y-4">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Camera className="h-4 w-4 text-primary" />
        Controles Remotos
      </h3>

      <div className="space-y-3">
        <button
          onClick={toggleListening}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ${
            listening
              ? 'border-primary bg-primary/10 glow-gold'
              : 'border-border hover:border-primary/40 hover:bg-secondary'
          }`}
        >
          {listening ? <Mic className="h-5 w-5 text-primary animate-pulse-gold" /> : <MicOff className="h-5 w-5 text-muted-foreground" />}
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-foreground">Escuta Ambiente</p>
            <p className="text-xs text-muted-foreground">{listening ? 'Capturando áudio...' : 'Desativado'}</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${listening ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {listening ? 'ATIVO' : 'OFF'}
          </span>
        </button>

        <button
          onClick={toggleCamera}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ${
            cameraActive
              ? 'border-primary bg-primary/10 glow-gold'
              : 'border-border hover:border-primary/40 hover:bg-secondary'
          }`}
        >
          {cameraActive ? <Camera className="h-5 w-5 text-primary animate-pulse-gold" /> : <CameraOff className="h-5 w-5 text-muted-foreground" />}
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-foreground">Live Camera</p>
            <p className="text-xs text-muted-foreground">
              {cameraActive ? `Câmera ${cameraMode === 'front' ? 'Frontal' : 'Traseira'}` : 'Desativado'}
            </p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cameraActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {cameraActive ? 'ATIVO' : 'OFF'}
          </span>
        </button>

        {cameraActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCameraMode(cameraMode === 'front' ? 'rear' : 'front')}
            className="w-full border-border hover:border-primary/40"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-2" />
            Alternar para {cameraMode === 'front' ? 'Traseira' : 'Frontal'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraAudioControls;
