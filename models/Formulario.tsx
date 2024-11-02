export interface CampoFormulario {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
  }

export interface FormularioProps {
    campos: CampoFormulario[];
  }
  