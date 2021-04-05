import { Analyze, AnalyzeResult } from './text-analyzer.types';

export abstract class TextAnalyzerService {
  abstract analyze(text: Analyze): Promise<AnalyzeResult>;
}
