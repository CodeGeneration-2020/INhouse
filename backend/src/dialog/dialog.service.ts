import { GetAnswerDto } from './dto/get-answer.dto';

export abstract class DialogService {
  abstract getAnswer(getAnswerDto: GetAnswerDto): Promise<string>;
}
