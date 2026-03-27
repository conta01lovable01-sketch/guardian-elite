import { useState } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, RotateCcw, Circle, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const LiveStreamPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraFront, setCameraFront] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [screenRecording, setScreenRecording] = useState(false);

  const handleCapture = (type: string) => {
    toast({ title: `📸 ${type}`, description: 'Comando enviado ao dispositivo. Aguarde...' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <MonitorPlay className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Live Stream & Captura Remota</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-premium rounded-xl overflow-hidden">
            <div className="relative aspect-video bg-secondary flex items-center justify-center">
              {cameraActive ? (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="h-16 w-16 mx-auto rounded-full border-2 border-primary/40 flex items-center justify-center animate-pulse">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-foreground">Câmera {cameraFront ? 'Frontal' : 'Traseira'} — Stream Ativo</p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-red-400">AO VIVO</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-card/80 px-2 py-1 rounded-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] text-foreground font-mono">REC 00:42:15</span>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <VideoOff className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Câmera desativada</p>
                  <p className="text-xs text-muted-foreground">Ative a câmera para iniciar visualização</p>
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={cameraActive ? 'default' : 'outline'}
                  onClick={() => { setCameraActive(!cameraActive); toast({ title: cameraActive ? '📷 Câmera desativada' : '📷 Câmera ativada' }); }}
                >
                  {cameraActive ? <Video className="h-4 w-4 mr-1" /> : <VideoOff className="h-4 w-4 mr-1" />}
                  {cameraActive ? 'Desativar' : 'Ativar Câmera'}
                </Button>
                {cameraActive && (
                  <Button size="sm" variant="outline" onClick={() => setCameraFront(!cameraFront)}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    {cameraFront ? 'Traseira' : 'Frontal'}
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleCapture('Foto Remota')}>
                  <Camera className="h-4 w-4 mr-1" /> Capturar Foto
                </Button>
              </div>
            </div>
          </div>

          {/* Audio Stream */}
          <div className="card-premium rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {audioActive ? <Mic className="h-5 w-5 text-primary" /> : <MicOff className="h-5 w-5 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-semibold text-foreground">Escuta Ambiental</p>
                  <p className="text-xs text-muted-foreground">{audioActive ? 'Microfone ativo — capturando áudio' : 'Microfone desativado'}</p>
                </div>
              </div>
              <Button size="sm" variant={audioActive ? 'default' : 'outline'} onClick={() => { setAudioActive(!audioActive); toast({ title: audioActive ? '🔇 Áudio desativado' : '🎙️ Escuta ativada' }); }}>
                {audioActive ? 'Desativar' : 'Ativar Escuta'}
              </Button>
            </div>
            {audioActive && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary/60 rounded-full"
                    animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <div className="card-premium rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Captura de Evidências</h3>
            
            <Button className="w-full justify-start" variant="outline" onClick={() => handleCapture('Foto Frontal')}>
              <Camera className="h-4 w-4 mr-2" /> Foto — Câmera Frontal
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => handleCapture('Foto Traseira')}>
              <Camera className="h-4 w-4 mr-2" /> Foto — Câmera Traseira
            </Button>
            <Button
              className="w-full justify-start"
              variant={screenRecording ? 'default' : 'outline'}
              onClick={() => { setScreenRecording(!screenRecording); toast({ title: screenRecording ? '⏹️ Gravação de tela parada' : '⏺️ Gravação de tela iniciada' }); }}
            >
              <Circle className={`h-4 w-4 mr-2 ${screenRecording ? 'text-red-400' : ''}`} />
              {screenRecording ? 'Parar Gravação de Tela' : 'Gravar Tela'}
            </Button>
          </div>

          <div className="card-premium rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Status do Stream</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Câmera</span>
                <span className={cameraActive ? 'text-green-400' : 'text-muted-foreground'}>{cameraActive ? '● Ativa' : '○ Inativa'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Áudio</span>
                <span className={audioActive ? 'text-green-400' : 'text-muted-foreground'}>{audioActive ? '● Ativo' : '○ Inativo'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Gravação Tela</span>
                <span className={screenRecording ? 'text-red-400' : 'text-muted-foreground'}>{screenRecording ? '⏺ Gravando' : '○ Parada'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Latência</span>
                <span className="text-foreground">~120ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Qualidade</span>
                <span className="text-foreground">720p</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamPage;
