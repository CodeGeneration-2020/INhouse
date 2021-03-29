import { Dialog } from '../types';

import { AnalyzeOptions } from './text-analyzer.types';

export abstract class TextAnalyzerService {
  abstract analyze(options: AnalyzeOptions): Promise<Dialog[]>;
}
