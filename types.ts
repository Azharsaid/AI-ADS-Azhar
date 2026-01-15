
export interface AdStyle {
  id: string;
  name: string;
  description: string;
  promptSuffix: string;
  previewUrl: string;
}

export interface AdGenerationState {
  isGenerating: boolean;
  error: string | null;
  resultImage: string | null;
}

export interface ProductData {
  image: string | null;
  prompt: string;
  styleId: string;
}
